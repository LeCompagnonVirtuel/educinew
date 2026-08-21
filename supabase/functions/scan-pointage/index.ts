import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, handleCors } from "../_shared/cors.ts";
import { checkRateLimit } from "../_shared/rate-limit.ts";

const DUPLICATE_WINDOW_SECONDS = 30;

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

    const rateLimit = await checkRateLimit(user.id, 30, 60_000);
    if (!rateLimit.allowed) {
      return new Response(JSON.stringify({ error: "Trop de requêtes" }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: profile } = await supabase
      .from("users")
      .select("role, school_id")
      .eq("id", user.id)
      .single();

    const schoolId = profile?.school_id;
    if (!schoolId) {
      return new Response(JSON.stringify({ error: "Établissement non trouvé" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { qr_code, scan_type = "ARRIVAL", device_info, operator_name } = body;

    if (!qr_code || typeof qr_code !== "string") {
      return new Response(JSON.stringify({ error: "QR code requis" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const today = new Date().toISOString().split("T")[0];
    const now = new Date();
    const timeStr = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    // =============================================================
    // STEP 1: Try to find in qr_codes table (PRIMARY PATH)
    // This is the unified system — all QR codes should be here
    // =============================================================

    // Verify HMAC signature on signed tokens
    let verifiedUserId: string | null = null;
    let verifiedUserType: string | null = null;

    if (qr_code.includes(".") && qr_code.split(".").length === 3) {
      const qrSecret = Deno.env.get("QR_SIGNING_SECRET");
      if (!qrSecret) {
        return new Response(JSON.stringify({ error: "Configuration serveur manquante" }), {
          status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const parts = qr_code.split(".");
      const key = await crypto.subtle.importKey(
        "raw", new TextEncoder().encode(qrSecret),
        { name: "HMAC", hash: "SHA-256" }, false, ["verify"]
      );
      const sigHex = parts[2];
      const sigBytes = new Uint8Array(sigHex.match(/.{2}/g)!.map(b => parseInt(b, 16)));
      const valid = await crypto.subtle.verify(
        "HMAC", key, sigBytes, new TextEncoder().encode(`${parts[0]}.${parts[1]}`)
      );

      if (!valid) {
        return new Response(JSON.stringify({
          success: false, error: "Signature QR invalide", code: "INVALID_SIGNATURE",
        }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      // Decode and validate payload
      try {
        const payload = JSON.parse(atob(parts[1]));
        if (payload.exp && Date.now() > payload.exp) {
          return new Response(JSON.stringify({
            success: false, error: "QR code expiré", code: "EXPIRED",
          }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        if (payload.school_id && payload.school_id !== schoolId) {
          return new Response(JSON.stringify({
            success: false, error: "Ce QR Code appartient à un autre établissement", code: "WRONG_SCHOOL",
          }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        verifiedUserId = payload.user_id;
        verifiedUserType = payload.type?.toUpperCase() || "STUDENT";
      } catch {
        return new Response(JSON.stringify({
          success: false, error: "Payload QR invalide", code: "INVALID_PAYLOAD",
        }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    const { data: qrRecord } = await supabase
      .from("qr_codes")
      .select("id, user_id, user_type, school_id, is_active, expires_at, qr_data")
      .eq("qr_data", qr_code)
      .eq("school_id", schoolId)
      .single();

    if (qrRecord) {
      // Validate QR code
      if (!qrRecord.is_active) {
        return new Response(JSON.stringify({
          success: false,
          error: "QR code révoqué",
          code: "REVOKED",
        }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (qrRecord.expires_at && new Date(qrRecord.expires_at) < now) {
        return new Response(JSON.stringify({
          success: false,
          error: "QR code expiré",
          code: "EXPIRED",
        }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Update scan count (proper increment)
      await supabase.rpc("increment_scan_count", { p_qr_id: qrRecord.id });

      // Verify the user account is active
      const { data: targetUser } = await supabase
        .from("users")
        .select("is_active")
        .eq("id", qrRecord.user_id)
        .single();

      if (targetUser && targetUser.is_active === false) {
        return new Response(JSON.stringify({
          success: false,
          error: "Compte utilisateur désactivé",
          code: "ACCOUNT_DISABLED",
        }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Route based on user_type (use verified type if available)
      const effectiveType = verifiedUserType || qrRecord.user_type;

      if (effectiveType === "STUDENT") {
        const { data: student } = await supabase
          .from("students")
          .select("*, user:users!students_user_id_fkey(*)")
          .eq("user_id", qrRecord.user_id)
          .eq("school_id", schoolId)
          .single();

        if (student) {
          // Duplicate check
          const cutoffTime = new Date(Date.now() - DUPLICATE_WINDOW_SECONDS * 1000).toISOString();
          const { data: existing } = await supabase
            .from("attendance")
            .select("id, created_at")
            .eq("student_id", student.id)
            .eq("date", today)
            .gte("created_at", cutoffTime)
            .limit(1);

          if (existing && existing.length > 0 && scan_type === "ARRIVAL") {
            return new Response(JSON.stringify({
              success: false,
              error: "Doublon détecté — déjà pointé récemment",
              code: "DUPLICATE",
            }), {
              status: 409,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }

          const status = scan_type === "LATE" ? "LATE" : "PRESENT";
          const remark = scan_type === "DEPARTURE" ? `Départ: ${timeStr}` : `Arrivée: ${timeStr}`;

          await supabase.from("attendance").upsert({
            student_id: student.id,
            school_id: schoolId,
            date: today,
            status,
            remark,
            method: "QR",
            device: device_info || "Mobile",
            operator: operator_name || user.email,
          }, { onConflict: "student_id,date" });

          try {
            await supabase.from("attendance_events").insert({
              school_id: schoolId,
              student_id: student.id,
              user_id: student.user_id,
              event_type: scan_type,
              scan_time: now.toISOString(),
              scanned_by: user.id,
              qr_code_id: qrRecord.id,
            });
          } catch { /* best effort */ }

          if (student.user?.parent_id) {
            try {
              await supabase.from("notifications").insert({
                user_id: student.user.parent_id,
                title: scan_type === "DEPARTURE" ? "Départ de votre enfant" : "Arrivée de votre enfant",
                body: `${student.user?.name || "Votre enfant"} est ${scan_type === "DEPARTURE" ? "parti(e)" : "arrivé(e)"} à ${timeStr}.`,
                type: "ATTENDANCE",
              });
            } catch { /* best effort */ }
          }

          return new Response(JSON.stringify({
            success: true,
            person: {
              id: student.id,
              name: student.user?.name || `${student.first_name || ""} ${student.last_name || ""}`.trim(),
              photo: student.user?.photo_url,
              role: "Élève",
              matricule: student.matricule,
            },
            scan: { type: scan_type, status, time: timeStr, date: today, method: "QR" },
            message: `✅ Présence enregistrée — ${student.user?.name || "Élève"}`,
          }), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      }

      if (effectiveType === "TEACHER") {
        const { data: teacher } = await supabase
          .from("teachers")
          .select("*, user:users!teachers_user_id_fkey(*)")
          .eq("user_id", qrRecord.user_id)
          .eq("school_id", schoolId)
          .single();

        if (teacher) {
          const checkIn = scan_type !== "DEPARTURE";
          await supabase.from("teacher_attendance").upsert({
            teacher_id: teacher.id,
            school_id: schoolId,
            date: today,
            status: scan_type === "LATE" ? "LATE" : "PRESENT",
            check_in_time: checkIn ? now.toISOString() : undefined,
            check_out_time: !checkIn ? now.toISOString() : undefined,
            method: "QR",
            qr_verified: true,
          }, { onConflict: "teacher_id,date" });

          // Record attendance event with qr_code_id
          try {
            await supabase.from("attendance_events").insert({
              school_id: schoolId,
              user_id: teacher.user_id,
              event_type: scan_type,
              scan_time: now.toISOString(),
              scanned_by: user.id,
              qr_code_id: qrRecord.id,
            });
          } catch { /* best effort */ }

          return new Response(JSON.stringify({
            success: true,
            person: { id: teacher.id, name: teacher.user?.name || "Enseignant", photo: teacher.user?.photo_url, role: "Enseignant" },
            scan: { type: checkIn ? "ARRIVAL" : "DEPARTURE", time: timeStr, date: today, method: "QR" },
            message: `✅ ${checkIn ? "Arrivée" : "Départ"} enregistré — ${teacher.user?.name || "Enseignant"}`,
          }), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      }

      if (effectiveType === "STAFF" || effectiveType === "PARENT" ||
          effectiveType === "ADMIN" || effectiveType === "COMPTABLE" ||
          effectiveType === "SECRETAIRE" || effectiveType === "CENSEUR" ||
          effectiveType === "SURVEILLANT" || effectiveType === "CHAUFFEUR") {
        const { data: staff } = await supabase
          .from("staff")
          .select("*, user:users(*)")
          .eq("user_id", qrRecord.user_id)
          .eq("school_id", schoolId)
          .single();

        if (staff) {
          const checkIn = scan_type !== "DEPARTURE";
          await supabase.from("staff_attendance").upsert({
            staff_id: staff.id,
            user_id: staff.user_id,
            school_id: schoolId,
            date: today,
            check_in_time: checkIn ? now.toISOString() : undefined,
            check_out_time: !checkIn ? now.toISOString() : undefined,
            status: scan_type === "DEPARTURE" ? "DEPARTED" : "PRESENT",
            method: "QR",
            recorded_by_type: "QR_SCAN",
          }, { onConflict: "staff_id,date" });

          // Record attendance event with qr_code_id
          try {
            await supabase.from("attendance_events").insert({
              school_id: schoolId,
              user_id: staff.user_id,
              event_type: scan_type,
              scan_time: now.toISOString(),
              scanned_by: user.id,
              qr_code_id: qrRecord.id,
            });
          } catch { /* best effort */ }

          return new Response(JSON.stringify({
            success: true,
            person: { id: staff.id, name: staff.user?.name || "Personnel", photo: staff.user?.photo_url, role: staff.position || "Personnel" },
            scan: { type: checkIn ? "ARRIVAL" : "DEPARTURE", time: timeStr, date: today, method: "QR" },
            message: `✅ ${checkIn ? "Arrivée" : "Départ"} enregistré — ${staff.user?.name || "Personnel"}`,
          }), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      }
    }

    // =============================================================
    // STEP 2: If we have a verified token but no qrRecord, use the verified data
    // =============================================================
    if (verifiedUserId) {
      // Look up user directly from verified token
      const { data: targetUser } = await supabase
        .from("users")
        .select("id, is_active, school_id")
        .eq("id", verifiedUserId)
        .eq("school_id", schoolId)
        .single();

      if (!targetUser) {
        return new Response(JSON.stringify({
          success: false, error: "Utilisateur introuvable dans cet établissement", code: "USER_NOT_FOUND",
        }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (targetUser.is_active === false) {
        return new Response(JSON.stringify({
          success: false, error: "Compte utilisateur désactivé", code: "ACCOUNT_DISABLED",
        }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      // Route to correct attendance table
      if (verifiedUserType === "STUDENT") {
        const { data: student } = await supabase
          .from("students").select("*, user:users!students_user_id_fkey(*)")
          .eq("user_id", verifiedUserId).eq("school_id", schoolId).single();
        if (student) {
          const cutoffTime = new Date(Date.now() - DUPLICATE_WINDOW_SECONDS * 1000).toISOString();
          const { data: existing } = await supabase.from("attendance").select("id")
            .eq("student_id", student.id).eq("date", today).gte("created_at", cutoffTime).limit(1);
          if (existing && existing.length > 0 && scan_type === "ARRIVAL") {
            return new Response(JSON.stringify({ success: false, error: "Doublon détecté", code: "DUPLICATE" }),
              { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } });
          }
          const status = scan_type === "LATE" ? "LATE" : "PRESENT";
          await supabase.from("attendance").upsert({
            student_id: student.id, school_id: schoolId, date: today, status,
            remark: `${scan_type === "DEPARTURE" ? "Départ" : "Arrivée"}: ${timeStr}`,
            method: "QR", device: device_info || "Mobile", operator: operator_name || user.email,
          }, { onConflict: "student_id,date" });
          return new Response(JSON.stringify({
            success: true,
            person: { id: student.id, name: student.user?.name || "Élève", role: "Élève", matricule: student.matricule },
            scan: { type: scan_type, status, time: timeStr, date: today, method: "QR" },
            message: `✅ Présence enregistrée — ${student.user?.name || "Élève"}`,
          }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
      }

      // For non-student types, try teacher_attendance or staff_attendance
      const { data: teacher } = await supabase.from("teachers")
        .select("*, user:users!teachers_user_id_fkey(*)").eq("user_id", verifiedUserId).eq("school_id", schoolId).single();
      if (teacher) {
        const checkIn = scan_type !== "DEPARTURE";
        await supabase.from("teacher_attendance").upsert({
          teacher_id: teacher.id, school_id: schoolId, date: today,
          status: scan_type === "LATE" ? "LATE" : "PRESENT",
          check_in_time: checkIn ? now.toISOString() : undefined,
          check_out_time: !checkIn ? now.toISOString() : undefined,
          method: "QR", qr_verified: true,
        }, { onConflict: "teacher_id,date" });
        return new Response(JSON.stringify({
          success: true,
          person: { id: teacher.id, name: teacher.user?.name || "Enseignant", role: "Enseignant" },
          scan: { type: checkIn ? "ARRIVAL" : "DEPARTURE", time: timeStr, date: today, method: "QR" },
          message: `✅ ${checkIn ? "Arrivée" : "Départ"} enregistré — ${teacher.user?.name || "Enseignant"}`,
        }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const { data: staff } = await supabase.from("staff")
        .select("*, user:users(*)").eq("user_id", verifiedUserId).eq("school_id", schoolId).single();
      if (staff) {
        const checkIn = scan_type !== "DEPARTURE";
        await supabase.from("staff_attendance").upsert({
          staff_id: staff.id, user_id: staff.user_id, school_id: schoolId, date: today,
          check_in_time: checkIn ? now.toISOString() : undefined,
          check_out_time: !checkIn ? now.toISOString() : undefined,
          status: scan_type === "DEPARTURE" ? "DEPARTED" : "PRESENT",
          method: "QR", recorded_by_type: "QR_SCAN",
        }, { onConflict: "staff_id,date" });
        return new Response(JSON.stringify({
          success: true,
          person: { id: staff.id, name: staff.user?.name || "Personnel", role: staff.position || "Personnel" },
          scan: { type: checkIn ? "ARRIVAL" : "DEPARTURE", time: timeStr, date: today, method: "QR" },
          message: `✅ ${checkIn ? "Arrivée" : "Départ"} enregistré — ${staff.user?.name || "Personnel"}`,
        }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    // =============================================================
    // STEP 3: Unknown QR — reject
    // =============================================================
    return new Response(JSON.stringify({
      success: false,
      error: "QR Code non reconnu. Veuillez utiliser un QR code signé valide.",
      code: "NOT_FOUND",
    }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[scan-pointage] Fatal error:", error);
    return new Response(JSON.stringify({ error: "Erreur interne" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
