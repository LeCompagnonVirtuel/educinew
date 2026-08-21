import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, handleCors } from "../_shared/cors.ts";

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
    const supabase = createClient(supabaseUrl, supabaseKey);

    const rawBody = await req.text();
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    const reference = (body.reference || body.transaction_id || body.token || body.order_id) as string;
    if (!reference) {
      return new Response(JSON.stringify({ error: "Missing reference" }), {
        status: 400,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    const { data: transaction, error: txError } = await supabase
      .from("payment_transactions")
      .select("id, invoice_id, amount, status, school_id")
      .eq("reference", reference)
      .single();

    if (txError || !transaction) {
      return new Response(JSON.stringify({ error: "Transaction introuvable" }), {
        status: 404,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    await supabase.from("webhook_logs").insert({
      school_id: transaction.school_id,
      gateway: "MONEY_FUSION",
      payload: body,
      headers: Object.fromEntries(req.headers.entries()),
      status: "RECEIVED",
    });

    if (transaction.status === "COMPLETED") {
      return new Response(JSON.stringify({ message: "Déjà traité" }), {
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    const rawStatus = ((body.statut || body.status || "") as string).toUpperCase();
    let status: string;
    if (["SUCCESS", "COMPLETED", "ACCEPTED", "PAID"].includes(rawStatus)) {
      status = "COMPLETED";
    } else if (["FAILED", "REFUSED", "CANCELLED", "ERROR", "REJECTED", "ANNULE"].includes(rawStatus)) {
      status = "FAILED";
    } else {
      status = "PENDING";
    }

    const { data: updatedTx, error: updateError } = await supabase
      .from("payment_transactions")
      .update({
        status,
        gateway_response: body,
        provider_reference: (body.token || body.transaction_id || "") as string,
        completed_at: status === "COMPLETED" ? new Date().toISOString() : null,
      })
      .eq("id", transaction.id)
      .neq("status", "COMPLETED")
      .select("id")
      .single();

    if (updateError || !updatedTx) {
      return new Response(JSON.stringify({ message: "Déjà traité (concurrent)" }), {
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    await supabase.from("transaction_logs").insert({
      school_id: transaction.school_id,
      transaction_id: transaction.id,
      action: "WEBHOOK_RECEIVED",
      status,
      amount: transaction.amount,
      reference,
      gateway_response: body,
    });

    if (status === "COMPLETED" && transaction.invoice_id) {
      const { data: invoice } = await supabase
        .from("invoices")
        .select("id, amount, final_amount, student_id, school_id")
        .eq("id", transaction.invoice_id)
        .single();

      if (invoice) {
        const { data: payments } = await supabase
          .from("payment_transactions")
          .select("amount")
          .eq("invoice_id", invoice.id)
          .eq("status", "COMPLETED");

        const totalPaid = (payments || []).reduce((sum: number, p: any) => sum + (p.amount || 0), 0);
        const invoiceAmount = invoice.final_amount || invoice.amount;
        const invoiceStatus = totalPaid >= invoiceAmount ? "PAID" : "PARTIAL";

        await supabase
          .from("invoices")
          .update({ status: invoiceStatus, paid_amount: totalPaid })
          .eq("id", invoice.id);

        await supabase.from("payments").insert({
          school_id: invoice.school_id,
          student_id: invoice.student_id,
          amount: transaction.amount,
          payment_method: "MONEY_FUSION",
          status: "COMPLETED",
          reference,
          invoice_id: invoice.id,
        });

        if (invoice.student_id) {
          await supabase.from("notifications").insert({
            school_id: invoice.school_id,
            user_id: invoice.student_id,
            title: "Paiement confirmé",
            message: `Votre paiement de ${transaction.amount} FCFA a été confirmé. Référence: ${reference}`,
            type: "payment",
            read: false,
          });
        }
      }
    }

    return new Response(JSON.stringify({ status, message: "Webhook Money Fusion traité" }), {
      headers: { ...headers, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[payment-webhook] Fatal error:", error);
    return new Response(JSON.stringify({ error: "Erreur webhook" }), {
      status: 500,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }
});
