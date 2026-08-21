import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, handleCors } from "../_shared/cors.ts";
import { authenticateRequest } from "../_shared/auth.ts";
import { checkRateLimit } from "../_shared/rate-limit.ts";

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

async function getKeyBytes(keyInput: string): Promise<Uint8Array> {
  if (/^[0-9a-fA-F]{64}$/.test(keyInput)) {
    return hexToBytes(keyInput);
  }
  const encoder = new TextEncoder();
  const keyData = encoder.encode(keyInput);
  const hashBuffer = await crypto.subtle.digest("SHA-256", keyData);
  return new Uint8Array(hashBuffer);
}

async function decryptAes256Gcm(ciphertext: string, keyInput: string): Promise<string> {
  const parts = ciphertext.split(":");
  if (parts.length !== 3) throw new Error("Invalid ciphertext format");
  const [ivHex, tagHex, encryptedHex] = parts;

  const keyBytes = await getKeyBytes(keyInput);
  const iv = hexToBytes(ivHex);
  const tag = hexToBytes(tagHex);
  const encrypted = hexToBytes(encryptedHex);

  const combined = new Uint8Array(encrypted.length + tag.length);
  combined.set(encrypted);
  combined.set(tag, encrypted.length);

  const cryptoKey = await crypto.subtle.importKey(
    "raw", keyBytes, { name: "AES-GCM" }, false, ["decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv, tagLength: 128 },
    cryptoKey,
    combined
  );

  return new TextDecoder().decode(decrypted);
}

serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;
  const headers = getCorsHeaders(req);

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const authResult = await authenticateRequest(req);
    if (authResult instanceof Response) return authResult;
    const { user, schoolId, supabase } = authResult;

    const rateLimit = await checkRateLimit(user.id, 5, 60_000);
    if (!rateLimit.allowed) {
      return new Response(JSON.stringify({ error: "Trop de requêtes. Réessayez plus tard." }), {
        status: 429,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return new Response(JSON.stringify({ error: "Body JSON invalide" }), {
        status: 400,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    const { invoiceId, paymentMethod, method, amount } = body;
    const finalMethod = paymentMethod || method || "MOBILE_MONEY";

    if (!invoiceId || typeof invoiceId !== "string") {
      return new Response(JSON.stringify({ error: "invoiceId requis" }), {
        status: 400,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return new Response(JSON.stringify({ error: "Montant invalide" }), {
        status: 400,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    const { data: invoice, error: invoiceError } = await supabase
      .from("invoices")
      .select("id, amount, school_id, student_id, status")
      .eq("id", invoiceId)
      .single();

    if (invoiceError || !invoice) {
      return new Response(JSON.stringify({ error: "Facture introuvable" }), {
        status: 404,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    if (invoice.status === "PAID") {
      return new Response(JSON.stringify({ error: "Cette facture est déjà payée" }), {
        status: 400,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    const { data: existingTx } = await supabase
      .from("payment_transactions")
      .select("id, reference, status")
      .eq("invoice_id", invoiceId)
      .eq("status", "PENDING")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (existingTx) {
      return new Response(JSON.stringify({
        reference: existingTx.reference,
        transactionId: existingTx.id,
        message: "Paiement déjà en cours de traitement",
      }), {
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    if (Math.round(amount) < Math.round(invoice.amount)) {
      return new Response(JSON.stringify({ error: "Le montant est inférieur au total de la facture" }), {
        status: 400,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    const targetSchoolId = invoice.school_id || schoolId;

    if (schoolId && invoice.school_id && schoolId !== invoice.school_id) {
      return new Response(JSON.stringify({ error: "Accès non autorisé à cette facture" }), {
        status: 403,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    const reference = `EDUCI-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

    const { data: transaction, error: txError } = await supabase
      .from("payment_transactions")
      .insert({
        invoice_id: invoiceId,
        school_id: targetSchoolId,
        student_id: invoice.student_id,
        amount,
        payment_method: finalMethod,
        payment_type: "FULL",
        status: "PENDING",
        reference,
        currency: "XOF",
      })
      .select()
      .single();

    if (txError) throw txError;

    let paymentUrl = null;

    const adminSupabase = createClient(supabaseUrl, supabaseKey);
    const { data: gatewayConfig } = await adminSupabase
      .from("payment_gateway_configs")
      .select("config_encrypted, credentials")
      .eq("school_id", targetSchoolId)
      .eq("gateway", "MONEY_FUSION")
      .eq("is_active", true)
      .single();

    if (gatewayConfig) {
      const config = gatewayConfig.config_encrypted || gatewayConfig.credentials || {};
      const encryptedUrl = config.payment_url;

      if (encryptedUrl) {
        try {
          const encryptionKey = Deno.env.get("GATEWAY_ENCRYPTION_KEY") || "";
          const decryptedUrl = await decryptAes256Gcm(encryptedUrl, encryptionKey);
          const siteUrl = Deno.env.get("SITE_URL") || "https://educi.live";

          if (/^https:\/\/pay\.moneyfusion\.net\/[^/]+\/[^/]+\/pay\/?$/.test(decryptedUrl)) {
            const mfResponse = await fetch(decryptedUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                totalPrice: Math.round(amount),
                article: `Paiement EduCI - ${reference}`,
                devise: "XOF",
                reference,
                returnUrl: `${siteUrl}/payment-receipt?ref=${reference}`,
                cancelUrl: `${siteUrl}/parent/payments?cancelled=true`,
                notifyUrl: `${supabaseUrl}/functions/v1/payment-webhook`,
                customer_email: user.email || "",
                customer_name: user.user_metadata?.name || "Client",
                customer_phone: user.user_metadata?.phone || "",
              }),
            });

            if (mfResponse.ok) {
              const mfData = await mfResponse.json();
              if (mfData.statut === "success" || mfData.url || mfData.payment_url || mfData.link) {
                paymentUrl = mfData.url || mfData.payment_url || mfData.link;

                await adminSupabase
                  .from("payment_transactions")
                  .update({ payment_url: paymentUrl, provider_reference: mfData.token || "" })
                  .eq("id", transaction.id);
              }
            }
          }
        } catch (e) {
          console.error("[payment-initiate] Money Fusion error:", e);
        }
      }
    }

    await adminSupabase.from("transaction_logs").insert({
      school_id: targetSchoolId,
      transaction_id: transaction.id,
      action: "CREATED",
      status: paymentUrl ? "PENDING" : "INITIATED",
      amount,
      reference,
      gateway_response: { payment_url: paymentUrl ? "generated" : "none" },
    });

    return new Response(JSON.stringify({
      reference,
      transactionId: transaction.id,
      paymentUrl,
      message: paymentUrl ? "Redirection vers Money Fusion" : "Paiement initié",
    }), {
      headers: { ...headers, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[payment-initiate] Fatal error:", error);
    return new Response(JSON.stringify({ error: "Erreur lors de l'initiation du paiement" }), {
      status: 500,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }
});
