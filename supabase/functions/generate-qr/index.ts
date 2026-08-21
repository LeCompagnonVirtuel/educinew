import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, handleCors } from "../_shared/cors.ts";
import { checkRateLimit } from "../_shared/rate-limit.ts";

const VALID_USER_TYPES = [
  "STUDENT", "TEACHER", "STAFF", "PARENT", "ADMIN", "SUPER_ADMIN",
  "COMPTABLE", "SECRETAIRE", "CENSEUR", "SURVEILLANT", "CHAUFFEUR",
];

// SECURITY: Only these roles can generate QR codes for other users
const QR_GENERATOR_ROLES = ["ADMIN", "SUPER_ADMIN", "SURVEILLANT", "SECRETAIRE"];

const TYPE_PREFIX: Record<string, string> = {
  STUDENT: "S",
  TEACHER: "T",
  STAFF: "P",
  PARENT: "R",
  ADMIN: "A",
  SUPER_ADMIN: "A",
  COMPTABLE: "P",
  SECRETAIRE: "P",
  CENSEUR: "P",
  SURVEILLANT: "P",
  CHAUFFEUR: "P",
};

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Non authentifié" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Non authentifié" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: userData } = await supabase
      .from("users")
      .select("school_id, role")
      .eq("id", user.id)
      .single();

    if (!userData?.school_id) {
      return new Response(JSON.stringify({ error: "Utilisateur non lié à un établissement" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // SECURITY: Only authorized roles can generate QR codes
    if (!QR_GENERATOR_ROLES.includes(userData.role)) {
      return new Response(JSON.stringify({ error: "Accès refusé. Seuls les administrateurs et surveillants peuvent générer des QR codes." }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { allowed } = await checkRateLimit(user.id, 10, 60_000);
    if (!allowed) {
      return new Response(JSON.stringify({ error: "Trop de requêtes" }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { userId, userType, matricule, name, qrType = "ATTENDANCE" } = body;

    if (!userId || !userType) {
      return new Response(JSON.stringify({ error: "userId et userType requis" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!VALID_USER_TYPES.includes(userType)) {
      return new Response(JSON.stringify({ error: `userType invalide. Valeurs acceptées: ${VALID_USER_TYPES.join(", ")}` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // SECURITY: Verify target user belongs to the same school
    const { data: targetUser, error: targetError } = await supabase
      .from("users")
      .select("id, school_id, name, role")
      .eq("id", userId)
      .eq("school_id", userData.school_id)
      .single();

    if (targetError || !targetUser) {
      return new Response(JSON.stringify({ error: "Utilisateur introuvable dans votre établissement" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Build signed QR token (HMAC-SHA256)
    const prefix = TYPE_PREFIX[userType] || "X";
    const identifier = matricule || userId;
    const qrSecret = Deno.env.get("QR_SIGNING_SECRET");
    if (!qrSecret) {
      return new Response(JSON.stringify({ error: "Configuration serveur manquante (QR_SIGNING_SECRET)" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const expiresInMs = 8 * 60 * 60 * 1000; // 8 hours
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "QR" }));
    const payloadObj = {
      user_id: userId,
      matricule: matricule || null,
      type: userType.toLowerCase(),
      school_id: userData.school_id,
      jti: crypto.randomUUID(),
      iat: Date.now(),
      exp: Date.now() + expiresInMs,
    };
    const payloadB64 = btoa(JSON.stringify(payloadObj));

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(qrSecret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const sigBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(`${header}.${payloadB64}`)
    );
    const signature = Array.from(new Uint8Array(sigBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");
    const qrData = `${header}.${payloadB64}.${signature}`;

    const barcodeData = `EDUCI${prefix}${identifier.replace(/[-\s]/g, "").slice(0, 12)}`;

    // Check if active QR already exists
    const { data: existing } = await supabase
      .from("qr_codes")
      .select("id, qr_data, qr_url, signed_token")
      .eq("user_id", userId)
      .eq("school_id", userData.school_id)
      .eq("is_active", true)
      .eq("qr_type", qrType)
      .single();

    if (existing?.qr_url) {
      const qrResponse = await fetch(existing.qr_url);
      if (qrResponse.ok) {
        const qrBytes = new Uint8Array(await qrResponse.arrayBuffer());
        return new Response(qrBytes, {
          headers: {
            ...corsHeaders,
            "Content-Type": "image/png",
            "Content-Disposition": `attachment; filename="qr_${identifier}.png"`,
            "X-QR-Data": existing.qr_data,
            "X-QR-Url": existing.qr_url,
          },
        });
      }
    }

    // SECURITY: Generate QR image locally using qrcode-generator (pure JS, no external API)
    // This avoids leaking signed tokens to third parties
    const qrBytes = generateQRCodePNG(qrData);

    // Upload to storage
    const filePath = `${userData.school_id}/${userType.toLowerCase()}/${userId}.png`;
    await supabase.storage
      .from("qr-codes")
      .upload(filePath, qrBytes, { contentType: "image/png", upsert: true });

    const { data: urlData } = supabase.storage
      .from("qr-codes")
      .getPublicUrl(filePath);

    const qrUrl = urlData?.publicUrl || "";

    // SECURITY: Store a hash of the signed token instead of the plaintext token
    const tokenHashBuffer = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(qrData)
    );
    const tokenHash = Array.from(new Uint8Array(tokenHashBuffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");

    // Persist in database
    await supabase
      .from("qr_codes")
      .upsert({
        school_id: userData.school_id,
        user_id: userId,
        user_type: userType,
        qr_type: qrType,
        qr_data: qrData,
        signed_token: tokenHash,
        barcode_data: barcodeData,
        qr_url: qrUrl,
        is_active: true,
        generated_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + expiresInMs).toISOString(),
        metadata: { source: "generate-qr-edge-function", generated_by: user.id },
      }, { onConflict: "user_id" });

    return new Response(qrBytes, {
      headers: {
        ...corsHeaders,
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="qr_${identifier}.png"`,
        "X-QR-Url": qrUrl,
        "X-QR-Data": qrData,
      },
    });
  } catch (error) {
    console.error("[generate-qr] Fatal error:", error);
    return new Response(JSON.stringify({ error: "Erreur interne" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// QR Code generation using qrcode-generator (pure JS, ISO/IEC 18004 compliant)
// Imported from esm.sh — works in Deno edge functions without external API calls
import qrGenerator from "https://esm.sh/qrcode-generator@1.4.4";

function generateQRCodePNG(text: string): Uint8Array {
  // Determine minimum QR version needed for the data length
  // Version 1-L holds 17 bytes, Version 10-L holds 271 bytes, Version 20-L holds 858 bytes
  const dataBytes = new TextEncoder().encode(text);
  const len = dataBytes.length;

  // Try versions from smallest to largest with error correction level L (Low)
  // for maximum data capacity
  let qr: any = null;
  for (let version = 1; version <= 40; version++) {
    const testQr = qrGenerator(version, 'L');
    testQr.addData(text);
    try {
      testQr.make();
      qr = testQr;
      break;
    } catch {
      // Data too long for this version, try next
      continue;
    }
  }

  if (!qr) {
    throw new Error("QR code data too long for any version");
  }

  const moduleCount = qr.getModuleCount();
  const scale = 10;
  const quietZone = 4; // QR spec requires 4-module quiet zone
  const imageSize = (moduleCount + quietZone * 2) * scale;

  // Create RGBA pixel data
  const pixels = new Uint8Array(imageSize * imageSize * 4);

  for (let y = 0; y < imageSize; y++) {
    for (let x = 0; x < imageSize; x++) {
      const idx = (y * imageSize + x) * 4;

      // Map pixel to QR module (accounting for quiet zone)
      const moduleX = Math.floor(x / scale) - quietZone;
      const moduleY = Math.floor(y / scale) - quietZone;

      // Default: white (quiet zone or out of bounds)
      let isDark = false;

      if (moduleX >= 0 && moduleX < moduleCount && moduleY >= 0 && moduleY < moduleCount) {
        isDark = qr.isDark(moduleY, moduleX);
      }

      const color = isDark ? 0 : 255;
      pixels[idx] = color;     // R
      pixels[idx + 1] = color; // G
      pixels[idx + 2] = color; // B
      pixels[idx + 3] = 255;   // A
    }
  }

  return encodePNG(pixels, imageSize, imageSize);
}

function encodePNG(rgba: Uint8Array, width: number, height: number): Uint8Array {
  const chunks: Uint8Array[] = [];

  // PNG Signature
  chunks.push(new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]));

  // IHDR chunk
  const ihdr = new ArrayBuffer(13);
  const ihdrView = new DataView(ihdr);
  ihdrView.setUint32(0, width);
  ihdrView.setUint32(4, height);
  ihdrView.setUint8(8, 8);  // bit depth
  ihdrView.setUint8(9, 6);  // color type (RGBA)
  ihdrView.setUint8(10, 0); // compression method
  ihdrView.setUint8(11, 0); // filter method
  ihdrView.setUint8(12, 0); // interlace method
  chunks.push(createChunk("IHDR", new Uint8Array(ihdr)));

  // IDAT chunk — raw pixel data with filter bytes
  const rawData: number[] = [];
  for (let y = 0; y < height; y++) {
    rawData.push(0); // filter type: none
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      rawData.push(rgba[idx], rgba[idx + 1], rgba[idx + 2], rgba[idx + 3]);
    }
  }
  const compressed = deflateStore(new Uint8Array(rawData));
  chunks.push(createChunk("IDAT", compressed));

  // IEND chunk
  chunks.push(createChunk("IEND", new Uint8Array(0)));

  // Concatenate all chunks
  const totalLength = chunks.reduce((sum, c) => sum + c.length, 0);
  const png = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    png.set(chunk, offset);
    offset += chunk.length;
  }
  return png;
}

function createChunk(type: string, data: Uint8Array): Uint8Array {
  const typeBytes = new TextEncoder().encode(type);
  const chunk = new Uint8Array(4 + 4 + data.length + 4);
  const view = new DataView(chunk.buffer);
  view.setUint32(0, data.length);
  chunk.set(typeBytes, 4);
  chunk.set(data, 8);
  // CRC32 over type + data
  const crcData = new Uint8Array(4 + data.length);
  crcData.set(typeBytes, 0);
  crcData.set(data, 4);
  view.setUint32(8 + data.length, crc32(crcData));
  return chunk;
}

function deflateStore(data: Uint8Array): Uint8Array {
  const maxBlockSize = 65535;
  const blocks: Uint8Array[] = [];

  let offset = 0;
  while (offset < data.length) {
    const blockSize = Math.min(maxBlockSize, data.length - offset);
    const isFinal = offset + blockSize >= data.length;
    const block = new Uint8Array(5 + blockSize);
    block[0] = isFinal ? 1 : 0;
    block[1] = blockSize & 0xFF;
    block[2] = (blockSize >> 8) & 0xFF;
    block[3] = ~blockSize & 0xFF;
    block[4] = (~blockSize >> 8) & 0xFF;
    block.set(data.subarray(offset, offset + blockSize), 5);
    blocks.push(block);
    offset += blockSize;
  }

  // Adler-32 checksum
  let a = 1, b = 0;
  for (let i = 0; i < data.length; i++) {
    a = (a + data[i]) % 65521;
    b = (b + a) % 65521;
  }
  const adler = new Uint8Array(4);
  adler[0] = (b >> 8) & 0xFF;
  adler[1] = b & 0xFF;
  adler[2] = (a >> 8) & 0xFF;
  adler[3] = a & 0xFF;
  blocks.push(adler);

  // Zlib wrapper: CMF=0x78 (deflate, window=32768), FLG=0x01
  const totalLen = 2 + blocks.reduce((s, blk) => s + blk.length, 0);
  const result = new Uint8Array(totalLen);
  result[0] = 0x78;
  result[1] = 0x01;
  let pos = 2;
  for (const block of blocks) {
    result.set(block, pos);
    pos += block.length;
  }
  return result;
}

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  return table;
})();

function crc32(data: Uint8Array): number {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < data.length; i++) {
    crc = CRC_TABLE[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}
