import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, handleCors } from "../_shared/cors.ts";
import { checkRateLimit } from "../_shared/rate-limit.ts";

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

    // Validate school_id
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

    const { allowed, remaining } = await checkRateLimit(user.id, 5, 60_000);
    if (!allowed) {
      return new Response(JSON.stringify({ error: "Trop de requêtes. Réessayez dans quelques instants." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { type, data } = await req.json();
    if (!type || !data) {
      return new Response(JSON.stringify({ error: "type et data requis" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Inject school_id into data for branding/isolation
    data.school_id = userData.school_id;

    const { PDFDocument, rgb, StandardFonts } = await import("https://esm.sh/pdf-lib@1.17.1");

    let pdfDoc: any;
    let filename = `${type}_${Date.now()}.pdf`;

    switch (type) {
      case "bulletin":
        pdfDoc = await generateBulletin(PDFDocument, rgb, StandardFonts, data);
        filename = `bulletin_${data.studentName || "eleve"}.pdf`;
        break;
      case "student_card":
        pdfDoc = await generateStudentCard(PDFDocument, rgb, StandardFonts, data);
        filename = `carte_${data.studentName || "eleve"}.pdf`;
        break;
      case "teacher_badge":
        pdfDoc = await generateBadge(PDFDocument, rgb, StandardFonts, data, "ENSEIGNANT");
        filename = `badge_${data.name || "enseignant"}.pdf`;
        break;
      case "staff_badge":
        pdfDoc = await generateBadge(PDFDocument, rgb, StandardFonts, data, "PERSONNEL");
        filename = `badge_${data.name || "personnel"}.pdf`;
        break;
      case "receipt":
        pdfDoc = await generateReceipt(PDFDocument, rgb, StandardFonts, data);
        filename = `recu_${data.reference || Date.now()}.pdf`;
        break;
      case "invoice":
        pdfDoc = await generateInvoice(PDFDocument, rgb, StandardFonts, data);
        filename = `facture_${data.reference || Date.now()}.pdf`;
        break;
      case "certificate":
        pdfDoc = await generateCertificate(PDFDocument, rgb, StandardFonts, data);
        filename = `certificat_${data.studentName || "eleve"}.pdf`;
        break;
      case "attestation":
        pdfDoc = await generateAttestation(PDFDocument, rgb, StandardFonts, data);
        filename = `attestation_${data.studentName || "eleve"}.pdf`;
        break;
      case "enrollment_form":
        pdfDoc = await generateEnrollmentForm(PDFDocument, rgb, StandardFonts, data);
        filename = `fiche_inscription_${data.studentName || "eleve"}.pdf`;
        break;
      default:
        return new Response(JSON.stringify({ error: `Type "${type}" non supporté. Types: bulletin, student_card, teacher_badge, staff_badge, receipt, invoice, certificate, attestation, enrollment_form` }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    const pdfBytes = await pdfDoc.save();

    return new Response(pdfBytes, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("[generate-pdf] Error:", error);
    return new Response(JSON.stringify({ error: "Erreur lors de la génération du PDF" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// ============================================================
// BULLETIN SCOLAIRE
// ============================================================
async function generateBulletin(PDFDocument: any, rgb: any, StandardFonts: any, data: any) {
  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();

  // Header
  page.drawRectangle({ x: 0, y: height - 80, width, height: 80, color: rgb(0.31, 0.27, 0.9) });
  page.drawText("BULLETIN SCOLAIRE", { x: 50, y: height - 35, size: 20, font: bold, color: rgb(1, 1, 1) });
  page.drawText(data.schoolName || "EduCI", { x: 50, y: height - 55, size: 11, font: helvetica, color: rgb(1, 1, 1) });
  page.drawText(data.period || "", { x: width - 200, y: height - 35, size: 11, font: helvetica, color: rgb(1, 1, 1) });

  let y = height - 110;
  page.drawText(`Élève: ${data.studentName || "N/A"}`, { x: 50, y, size: 12, font: bold });
  page.drawText(`Classe: ${data.className || "N/A"}`, { x: 300, y, size: 12, font: helvetica });
  y -= 20;
  page.drawText(`Matricule: ${data.matricule || "N/A"}`, { x: 50, y, size: 10, font: helvetica });
  page.drawText(`Année: ${data.academicYear || ""}`, { x: 300, y, size: 10, font: helvetica });

  // Grades table
  y -= 40;
  page.drawRectangle({ x: 40, y: y - 5, width: width - 80, height: 20, color: rgb(0.95, 0.95, 0.98) });
  page.drawText("Matière", { x: 50, y, size: 9, font: bold });
  page.drawText("Moy.", { x: 280, y, size: 9, font: bold });
  page.drawText("Coef.", { x: 340, y, size: 9, font: bold });
  page.drawText("Total", { x: 400, y, size: 9, font: bold });
  page.drawText("Rang", { x: 460, y, size: 9, font: bold });
  y -= 20;

  if (data.grades && Array.isArray(data.grades)) {
    for (const g of data.grades) {
      page.drawText(g.subject || "", { x: 50, y, size: 9, font: helvetica });
      page.drawText(String(g.average ?? g.score ?? ""), { x: 280, y, size: 9, font: helvetica });
      page.drawText(String(g.coefficient ?? ""), { x: 340, y, size: 9, font: helvetica });
      page.drawText(String(g.total ?? ""), { x: 400, y, size: 9, font: helvetica });
      page.drawText(String(g.rank ?? ""), { x: 460, y, size: 9, font: helvetica });
      y -= 15;
      if (y < 100) break;
    }
  }

  // Summary
  y -= 30;
  page.drawRectangle({ x: 40, y: y - 10, width: width - 80, height: 40, color: rgb(0.95, 0.97, 1) });
  page.drawText(`Moyenne Générale: ${data.generalAverage || "N/A"}/20`, { x: 50, y: y + 10, size: 12, font: bold });
  page.drawText(`Rang: ${data.rank || "N/A"}/${data.classSize || ""}`, { x: 300, y: y + 10, size: 12, font: bold });
  page.drawText(`Mention: ${data.mention || ""}`, { x: 50, y: y - 5, size: 10, font: helvetica });

  // Footer
  page.drawText("Document généré par EduCI — Éducation Côte d'Ivoire", { x: 50, y: 30, size: 8, font: helvetica, color: rgb(0.5, 0.5, 0.5) });

  return pdfDoc;
}

// ============================================================
// CARTE SCOLAIRE ÉLÈVE
// ============================================================
async function generateStudentCard(PDFDocument: any, rgb: any, StandardFonts: any, data: any) {
  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  // Card format: 85.6mm x 54mm (CR80) → in points: 242.6 x 153
  const page = pdfDoc.addPage([340, 215]);
  const { width, height } = page.getSize();

  // Background header
  page.drawRectangle({ x: 0, y: height - 50, width, height: 50, color: rgb(0.31, 0.27, 0.9) });
  page.drawText("CARTE SCOLAIRE", { x: 15, y: height - 25, size: 11, font: bold, color: rgb(1, 1, 1) });
  page.drawText(data.schoolName || "EduCI", { x: 15, y: height - 40, size: 8, font: helvetica, color: rgb(0.9, 0.9, 1) });
  page.drawText(data.academicYear || "", { x: width - 80, y: height - 25, size: 8, font: helvetica, color: rgb(1, 1, 1) });

  let y = height - 70;
  page.drawText(data.studentName || "N/A", { x: 15, y, size: 12, font: bold });
  y -= 16;
  page.drawText(`Matricule: ${data.matricule || "N/A"}`, { x: 15, y, size: 9, font: helvetica });
  y -= 14;
  page.drawText(`Classe: ${data.className || "N/A"}`, { x: 15, y, size: 9, font: helvetica });
  y -= 14;
  page.drawText(`Né(e) le: ${data.dateOfBirth || "N/A"}`, { x: 15, y, size: 9, font: helvetica });
  y -= 14;
  page.drawText(`Genre: ${data.gender || ""}`, { x: 15, y, size: 9, font: helvetica });

  // QR placeholder
  page.drawRectangle({ x: width - 80, y: 20, width: 65, height: 65, color: rgb(0.95, 0.95, 0.95) });
  page.drawText("QR", { x: width - 60, y: 50, size: 10, font: bold, color: rgb(0.5, 0.5, 0.5) });

  // Footer
  page.drawRectangle({ x: 0, y: 0, width, height: 15, color: rgb(1, 0.54, 0) });
  page.drawText("EduCI — Éducation Côte d'Ivoire", { x: 15, y: 3, size: 7, font: helvetica, color: rgb(1, 1, 1) });

  return pdfDoc;
}

// ============================================================
// BADGE (ENSEIGNANT / PERSONNEL)
// ============================================================
async function generateBadge(PDFDocument: any, rgb: any, StandardFonts: any, data: any, role: string) {
  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const page = pdfDoc.addPage([340, 215]);
  const { width, height } = page.getSize();

  page.drawRectangle({ x: 0, y: height - 50, width, height: 50, color: rgb(0.12, 0.23, 0.37) });
  page.drawText(role, { x: 15, y: height - 22, size: 10, font: bold, color: rgb(1, 0.54, 0) });
  page.drawText(data.schoolName || "EduCI", { x: 15, y: height - 38, size: 8, font: helvetica, color: rgb(0.8, 0.8, 0.8) });

  let y = height - 70;
  page.drawText(data.name || "N/A", { x: 15, y, size: 13, font: bold });
  y -= 18;
  page.drawText(data.position || data.subject || "", { x: 15, y, size: 9, font: helvetica });
  y -= 14;
  page.drawText(`Tél: ${data.phone || ""}`, { x: 15, y, size: 9, font: helvetica });
  y -= 14;
  page.drawText(`Email: ${data.email || ""}`, { x: 15, y, size: 9, font: helvetica });

  page.drawRectangle({ x: width - 80, y: 20, width: 65, height: 65, color: rgb(0.95, 0.95, 0.95) });
  page.drawText("QR", { x: width - 60, y: 50, size: 10, font: bold, color: rgb(0.5, 0.5, 0.5) });

  page.drawRectangle({ x: 0, y: 0, width, height: 12, color: rgb(0.31, 0.27, 0.9) });
  page.drawText("EduCI — Éducation Côte d'Ivoire", { x: 15, y: 2, size: 6, font: helvetica, color: rgb(1, 1, 1) });

  return pdfDoc;
}

// ============================================================
// REÇU DE PAIEMENT
// ============================================================
async function generateReceipt(PDFDocument: any, rgb: any, StandardFonts: any, data: any) {
  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const page = pdfDoc.addPage([595.28, 420]);
  const { width, height } = page.getSize();

  page.drawRectangle({ x: 0, y: height - 60, width, height: 60, color: rgb(0.13, 0.55, 0.13) });
  page.drawText("REÇU DE PAIEMENT", { x: 50, y: height - 30, size: 16, font: bold, color: rgb(1, 1, 1) });
  page.drawText(data.schoolName || "EduCI", { x: 50, y: height - 48, size: 10, font: helvetica, color: rgb(0.9, 1, 0.9) });
  page.drawText(`N° ${data.reference || ""}`, { x: width - 200, y: height - 30, size: 10, font: bold, color: rgb(1, 1, 1) });

  let y = height - 90;
  page.drawText(`Élève: ${data.studentName || "N/A"}`, { x: 50, y, size: 11, font: bold });
  y -= 18;
  page.drawText(`Classe: ${data.className || ""}`, { x: 50, y, size: 10, font: helvetica });
  page.drawText(`Date: ${data.paymentDate || new Date().toLocaleDateString('fr-FR')}`, { x: 300, y, size: 10, font: helvetica });
  y -= 25;
  page.drawText(`Montant: ${data.amount || "0"} ${data.currency || "FCFA"}`, { x: 50, y, size: 14, font: bold });
  y -= 18;
  page.drawText(`Mode: ${data.paymentMethod || ""}`, { x: 50, y, size: 10, font: helvetica });
  page.drawText(`Motif: ${data.description || "Frais de scolarité"}`, { x: 250, y, size: 10, font: helvetica });

  y -= 40;
  page.drawText("Ce reçu atteste du paiement effectué.", { x: 50, y, size: 9, font: helvetica, color: rgb(0.4, 0.4, 0.4) });

  page.drawText("Généré par EduCI", { x: 50, y: 20, size: 8, font: helvetica, color: rgb(0.5, 0.5, 0.5) });

  return pdfDoc;
}

// ============================================================
// FACTURE
// ============================================================
async function generateInvoice(PDFDocument: any, rgb: any, StandardFonts: any, data: any) {
  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();

  page.drawRectangle({ x: 0, y: height - 70, width, height: 70, color: rgb(0.31, 0.27, 0.9) });
  page.drawText("FACTURE", { x: 50, y: height - 35, size: 22, font: bold, color: rgb(1, 1, 1) });
  page.drawText(data.schoolName || "EduCI", { x: 50, y: height - 55, size: 10, font: helvetica, color: rgb(0.9, 0.9, 1) });
  page.drawText(`N° ${data.reference || ""}`, { x: width - 180, y: height - 35, size: 10, font: bold, color: rgb(1, 1, 1) });
  page.drawText(`Date: ${data.date || new Date().toLocaleDateString('fr-FR')}`, { x: width - 180, y: height - 50, size: 9, font: helvetica, color: rgb(0.9, 0.9, 1) });

  let y = height - 100;
  page.drawText(`Destinataire: ${data.studentName || "N/A"}`, { x: 50, y, size: 11, font: bold });
  y -= 16;
  page.drawText(`Classe: ${data.className || ""}`, { x: 50, y, size: 10, font: helvetica });
  y -= 16;
  page.drawText(`Matricule: ${data.matricule || ""}`, { x: 50, y, size: 10, font: helvetica });

  // Items
  y -= 35;
  page.drawRectangle({ x: 40, y: y - 5, width: width - 80, height: 20, color: rgb(0.95, 0.95, 0.98) });
  page.drawText("Description", { x: 50, y, size: 9, font: bold });
  page.drawText("Montant", { x: 450, y, size: 9, font: bold });
  y -= 20;

  if (data.items && Array.isArray(data.items)) {
    for (const item of data.items) {
      page.drawText(item.description || "", { x: 50, y, size: 9, font: helvetica });
      page.drawText(`${item.amount || "0"} FCFA`, { x: 450, y, size: 9, font: helvetica });
      y -= 15;
    }
  }

  y -= 20;
  page.drawText(`Total: ${data.totalAmount || data.amount || "0"} FCFA`, { x: 400, y, size: 13, font: bold });
  y -= 18;
  page.drawText(`Échéance: ${data.dueDate || ""}`, { x: 400, y, size: 9, font: helvetica, color: rgb(0.8, 0, 0) });

  page.drawText("Généré par EduCI — Éducation Côte d'Ivoire", { x: 50, y: 30, size: 8, font: helvetica, color: rgb(0.5, 0.5, 0.5) });

  return pdfDoc;
}

// ============================================================
// CERTIFICAT DE SCOLARITÉ
// ============================================================
async function generateCertificate(PDFDocument: any, rgb: any, StandardFonts: any, data: any) {
  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const page = pdfDoc.addPage([595.28, 420]);
  const { width, height } = page.getSize();

  // Border
  page.drawRectangle({ x: 10, y: 10, width: width - 20, height: height - 20, borderColor: rgb(0.31, 0.27, 0.9), borderWidth: 2, color: rgb(1, 1, 1) });

  page.drawText(data.schoolName || "EduCI", { x: 50, y: height - 50, size: 14, font: bold, color: rgb(0.31, 0.27, 0.9) });
  page.drawText("CERTIFICAT DE SCOLARITÉ", { x: 150, y: height - 90, size: 18, font: bold });

  let y = height - 130;
  page.drawText("Le Directeur de l'établissement certifie que :", { x: 50, y, size: 11, font: helvetica });
  y -= 30;
  page.drawText(`${data.studentName || "N/A"}`, { x: 50, y, size: 14, font: bold });
  y -= 22;
  page.drawText(`Né(e) le ${data.dateOfBirth || ""} à ${data.placeOfBirth || ""}`, { x: 50, y, size: 10, font: helvetica });
  y -= 18;
  page.drawText(`Matricule: ${data.matricule || ""}`, { x: 50, y, size: 10, font: helvetica });
  y -= 22;
  page.drawText(`est régulièrement inscrit(e) en classe de ${data.className || ""} pour l'année scolaire ${data.academicYear || ""}.`, { x: 50, y, size: 10, font: helvetica });

  y -= 40;
  page.drawText(`Fait à ${data.city || "Abidjan"}, le ${new Date().toLocaleDateString('fr-FR')}`, { x: 300, y, size: 10, font: helvetica });
  y -= 25;
  page.drawText("Le Directeur", { x: 380, y, size: 10, font: bold });

  return pdfDoc;
}

// ============================================================
// ATTESTATION
// ============================================================
async function generateAttestation(PDFDocument: any, rgb: any, StandardFonts: any, data: any) {
  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const page = pdfDoc.addPage([595.28, 420]);
  const { width, height } = page.getSize();

  page.drawRectangle({ x: 10, y: 10, width: width - 20, height: height - 20, borderColor: rgb(0.12, 0.23, 0.37), borderWidth: 2, color: rgb(1, 1, 1) });

  page.drawText(data.schoolName || "EduCI", { x: 50, y: height - 50, size: 14, font: bold, color: rgb(0.12, 0.23, 0.37) });
  page.drawText(`ATTESTATION ${(data.attestationType || "DE RÉUSSITE").toUpperCase()}`, { x: 140, y: height - 90, size: 16, font: bold });

  let y = height - 130;
  page.drawText("Nous attestons que :", { x: 50, y, size: 11, font: helvetica });
  y -= 28;
  page.drawText(`${data.studentName || "N/A"}`, { x: 50, y, size: 14, font: bold });
  y -= 20;
  page.drawText(`Matricule: ${data.matricule || ""}`, { x: 50, y, size: 10, font: helvetica });
  y -= 20;
  page.drawText(data.content || `a satisfait aux épreuves de l'année scolaire ${data.academicYear || ""}.`, { x: 50, y, size: 10, font: helvetica });

  y -= 50;
  page.drawText(`Fait à ${data.city || "Abidjan"}, le ${new Date().toLocaleDateString('fr-FR')}`, { x: 300, y, size: 10, font: helvetica });
  y -= 25;
  page.drawText("Le Directeur", { x: 380, y, size: 10, font: bold });

  return pdfDoc;
}

// ============================================================
// FICHE D'INSCRIPTION
// ============================================================
async function generateEnrollmentForm(PDFDocument: any, rgb: any, StandardFonts: any, data: any) {
  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();

  page.drawRectangle({ x: 0, y: height - 60, width, height: 60, color: rgb(0.31, 0.27, 0.9) });
  page.drawText("FICHE D'INSCRIPTION", { x: 50, y: height - 30, size: 18, font: bold, color: rgb(1, 1, 1) });
  page.drawText(data.schoolName || "EduCI", { x: 50, y: height - 48, size: 10, font: helvetica, color: rgb(0.9, 0.9, 1) });
  page.drawText(`Année: ${data.academicYear || ""}`, { x: width - 150, y: height - 30, size: 9, font: helvetica, color: rgb(1, 1, 1) });

  const fields = [
    ["Nom", data.lastName || ""],
    ["Prénom", data.firstName || ""],
    ["Matricule", data.matricule || ""],
    ["Date de naissance", data.dateOfBirth || ""],
    ["Lieu de naissance", data.placeOfBirth || ""],
    ["Nationalité", data.nationality || ""],
    ["Sexe", data.gender || ""],
    ["Classe", data.className || ""],
    ["Niveau", data.level || ""],
    ["Série", data.series || ""],
    ["Adresse", data.address || ""],
    ["Téléphone", data.phone || ""],
    ["Email", data.email || ""],
    ["Groupe sanguin", data.bloodGroup || ""],
    ["Allergies", data.allergies || ""],
    ["Contact urgence", data.emergencyContactName || ""],
    ["Tél. urgence", data.emergencyContactPhone || ""],
    ["Relation urgence", data.emergencyContactRelation || ""],
  ];

  let y = height - 90;
  for (const [label, value] of fields) {
    page.drawText(`${label}:`, { x: 50, y, size: 9, font: bold });
    page.drawText(String(value), { x: 200, y, size: 9, font: helvetica });
    y -= 16;
    if (y < 80) break;
  }

  y -= 30;
  page.drawText("Signature du parent/tuteur:", { x: 50, y, size: 9, font: bold });
  page.drawText("Date:", { x: 350, y, size: 9, font: bold });

  page.drawText("Généré par EduCI — Éducation Côte d'Ivoire", { x: 50, y: 25, size: 8, font: helvetica, color: rgb(0.5, 0.5, 0.5) });

  return pdfDoc;
}
