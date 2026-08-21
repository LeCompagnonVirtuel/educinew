export type ExportFormat = 'csv' | 'excel' | 'pdf';

export interface ExportColumn {
  header: string;
  key: string;
  width?: number;
}

export interface PDFOptions {
  title?: string;
  subtitle?: string;
  orientation?: 'portrait' | 'landscape';
}

export interface BrandingOptions {
  primaryColor?: string;
  secondaryColor?: string;
  schoolName?: string;
  logoUrl?: string;
}

export function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [79, 70, 229]; // default indigo
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ];
}

/**
 * Export data to CSV, Excel, or PDF file and trigger download
 */
export async function exportToFile(
  data: Record<string, any>[],
  columns: ExportColumn[],
  filename: string,
  format: ExportFormat = 'csv',
  pdfOptions?: PDFOptions,
  brandingOptions?: BrandingOptions
) {
  if (format === 'excel') {
    await exportToExcel(data, columns, filename);
  } else if (format === 'pdf') {
    await exportToPDF(data, columns, filename, pdfOptions, brandingOptions);
  } else {
    exportToCSV(data, columns, filename);
  }
}

function exportToCSV(
  data: Record<string, any>[],
  columns: ExportColumn[],
  filename: string
) {
  const headers = columns.map(c => c.header);
  const rows = data.map(row =>
    columns.map(col => {
      const val = row[col.key] ?? '';
      const str = String(val);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    })
  );

  const csvContent = [headers, ...rows].map(r => r.join(',')).join('\n');
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  triggerDownload(blob, `${filename}.csv`);
}

async function exportToExcel(
  data: Record<string, any>[],
  columns: ExportColumn[],
  filename: string
) {
  const XLSX = await import('xlsx');
  const wsData = [
    columns.map(c => c.header),
    ...data.map(row =>
      columns.map(col => {
        const val = row[col.key] ?? '';
        const num = Number(val);
        if (!isNaN(num) && val !== '' && val !== null && val !== undefined) {
          return num;
        }
        return String(val);
      })
    ),
  ];

  const ws = XLSX.utils.aoa_to_sheet(wsData);
  ws['!cols'] = columns.map(c => ({ wch: c.width || Math.max(c.header.length, 16) }));

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Données');

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  triggerDownload(blob, `${filename}.xlsx`);
}

async function exportToPDF(
  data: Record<string, any>[],
  columns: ExportColumn[],
  filename: string,
  options?: PDFOptions,
  branding?: BrandingOptions
) {
  const [{ default: jsPDF }, { default: autoTable }] = await Promise.all([
    import('jspdf'),
    import('jspdf-autotable'),
  ]);
  const orientation = options?.orientation || (columns.length > 6 ? 'landscape' : 'portrait');
  const doc = new jsPDF({ orientation, unit: 'mm', format: 'a4' });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPos = 15;

  const primaryRgb: [number, number, number] = branding?.primaryColor ? hexToRgb(branding.primaryColor) : [79, 70, 229];

  // Title
  if (options?.title) {
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(options.title, pageWidth / 2, yPos, { align: 'center' });
    yPos += 8;

    if (options?.subtitle) {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text(options.subtitle, pageWidth / 2, yPos, { align: 'center' });
      yPos += 6;
      doc.setTextColor(0, 0, 0);
    }

    // Date
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    const dateStr = new Date().toLocaleDateString('fr-FR', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
    doc.text(`Généré le ${dateStr}`, pageWidth / 2, yPos, { align: 'center' });
    yPos += 4;
    doc.setTextColor(0, 0, 0);
  }

  // Table
  const head = [columns.map(c => c.header)];
  const body = data.map(row =>
    columns.map(col => {
      const val = row[col.key] ?? '';
      return String(val);
    })
  );

  autoTable(doc, {
    startY: yPos,
    head,
    body,
    styles: {
      fontSize: 9,
      cellPadding: 3,
      overflow: 'linebreak',
      font: 'helvetica',
    },
    headStyles: {
      fillColor: primaryRgb,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    columnStyles: columns.reduce((acc, col, i) => {
      if (col.width) {
        acc[i] = { cellWidth: col.width * 1.8 };
      }
      return acc;
    }, {} as Record<number, { cellWidth: number }>),
    margin: { top: yPos, left: 10, right: 10, bottom: 15 },
    didDrawPage: (data) => {
      // Footer
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      const pageCount = doc.getNumberOfPages();
      doc.text(
        `Page ${data.pageNumber} / ${pageCount}`,
        pageWidth / 2,
        pageHeight - 8,
        { align: 'center' }
      );
      doc.text(
        branding?.schoolName || 'EduCI',
        pageWidth - 15,
        pageHeight - 8,
        { align: 'right' }
      );
    },
  });

  doc.save(`${filename}.pdf`);
}

/**
 * Parse uploaded file (CSV or XLSX) into array of objects
 */
export async function parseImportFile(file: File): Promise<Record<string, string>[]> {
  const ext = file.name.split('.').pop()?.toLowerCase();

  if (ext === 'csv' || ext === 'tsv') {
    return parseCSV(file);
  } else if (ext === 'xlsx' || ext === 'xls') {
    return parseXLSX(file);
  } else {
    return parseCSV(file);
  }
}

async function parseCSV(file: File): Promise<Record<string, string>[]> {
  const text = await file.text();
  const lines = text.split('\n').filter(l => l.trim());
  if (lines.length < 2) return [];

  const delimiter = lines[0].includes('\t') ? '\t' : ',';
  const headers = parseCSVLine(lines[0], delimiter).map(h => h.trim().toLowerCase());

  return lines.slice(1).map(line => {
    const values = parseCSVLine(line, delimiter);
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => { row[h] = (values[idx] || '').trim(); });
    return row;
  });
}

function parseCSVLine(line: string, delimiter: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === delimiter) {
        result.push(current);
        current = '';
      } else {
        current += ch;
      }
    }
  }
  result.push(current);
  return result;
}

async function parseXLSX(file: File): Promise<Record<string, string>[]> {
  const XLSX = await import('xlsx');
  const buffer = await file.arrayBuffer();
  const wb = XLSX.read(buffer, { type: 'array' });

  const firstSheet = wb.Sheets[wb.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json<Record<string, any>>(firstSheet, { raw: false });

  return jsonData.map(row => {
    const normalized: Record<string, string> = {};
    Object.entries(row).forEach(([key, val]) => {
      normalized[key.trim().toLowerCase()] = String(val ?? '');
    });
    return normalized;
  });
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
