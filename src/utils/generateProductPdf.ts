import { jsPDF } from 'jspdf';
import { Product, Category } from '../types';

export const generateProductPdf = (product: Product, category?: Category) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  // 1. Corporate Header Banner (FKR Red #D20A11)
  doc.setFillColor(210, 10, 17);
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Brand Name
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('FKR SURL', margin, 13);

  // Subtitle
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('SOLUCIONES ENERGÉTICAS · LA HABANA, CUBA', margin, 20);

  // Document Type Banner (Right aligned)
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('FICHA TÉCNICA OFICIAL', pageWidth - margin, 14, { align: 'right' });
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('CATÁLOGO INDUSTRIAL', pageWidth - margin, 20, { align: 'right' });

  // 2. Category & Model Header
  let y = 38;
  const categoryName = category?.name?.es || 'Equipamiento Industrial';
  doc.setTextColor(210, 10, 17);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(categoryName.toUpperCase(), margin, y);

  // 3. Product Title
  y += 7;
  doc.setTextColor(16, 19, 23);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  const titleLines = doc.splitTextToSize(product.name.es, contentWidth - 45);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 6.5;

  // 4. Availability Badge & Reference
  const isAvailable = product.available;
  if (isAvailable) {
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(34, 197, 94);
    doc.rect(margin, y - 4, 62, 7, 'FD');
    doc.setTextColor(21, 128, 61);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('● DISPONIBLE EN LA HABANA', margin + 3, y + 1);
  } else {
    doc.setFillColor(254, 243, 199);
    doc.setDrawColor(245, 158, 11);
    doc.rect(margin, y - 4, 60, 7, 'FD');
    doc.setTextColor(180, 83, 9);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('● EQUIPO BAJO PEDIDO', margin + 3, y + 1);
  }

  // Ref Code
  doc.setTextColor(107, 114, 128);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`Ref: ${product.slug.toUpperCase()}`, margin + 68, y + 1);

  y += 10;

  // 5. Short Description
  doc.setTextColor(55, 65, 81);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  const descLines = doc.splitTextToSize(product.shortDescription.es, contentWidth);
  doc.text(descLines, margin, y);
  y += descLines.length * 5 + 4;

  // Separator Line
  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  // 6. Specifications Table
  if (product.specifications && product.specifications.length > 0) {
    doc.setTextColor(16, 19, 23);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('ESPECIFICACIONES TÉCNICAS', margin, y);
    y += 5;

    // Table Header
    doc.setFillColor(243, 244, 246);
    doc.rect(margin, y, contentWidth, 7, 'F');
    doc.setFontSize(8.5);
    doc.setTextColor(75, 85, 99);
    doc.text('PARÁMETRO', margin + 4, y + 4.8);
    doc.text('VALOR NOMINAL', margin + contentWidth * 0.45, y + 4.8);
    y += 7;

    // Table Rows
    product.specifications.forEach((spec, idx) => {
      // Row background
      if (idx % 2 === 1) {
        doc.setFillColor(249, 250, 251);
        doc.rect(margin, y, contentWidth, 6.5, 'F');
      }

      // Border line
      doc.setDrawColor(229, 231, 235);
      doc.line(margin, y + 6.5, margin + contentWidth, y + 6.5);

      // Key & Value
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(31, 41, 55);
      doc.text(spec.key, margin + 4, y + 4.5);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(17, 24, 39);
      doc.text(spec.value, margin + contentWidth * 0.45, y + 4.5);

      y += 6.5;
    });

    y += 6;
  }

  // 7. Full Description (if space permits)
  if (product.fullDescription?.es && y < pageHeight - 55) {
    doc.setTextColor(16, 19, 23);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('DETALLES OPERATIVOS Y APLICACIÓN', margin, y);
    y += 5;

    doc.setTextColor(75, 85, 99);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    const fullLines = doc.splitTextToSize(product.fullDescription.es, contentWidth);
    // Print lines that fit before guarantee box
    const maxLines = Math.floor((pageHeight - 50 - y) / 4.5);
    const safeLines = fullLines.slice(0, Math.max(2, maxLines));
    doc.text(safeLines, margin, y);
    y += safeLines.length * 4.5 + 4;
  }

  // 8. Operational Guarantee Box
  const guaranteeBoxY = Math.max(y, pageHeight - 48);
  doc.setFillColor(255, 240, 241);
  doc.setDrawColor(210, 10, 17);
  doc.setLineWidth(0.4);
  doc.rect(margin, guaranteeBoxY, contentWidth, 18, 'FD');

  doc.setTextColor(210, 10, 17);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('GARANTÍA Y RESPALDO TÉCNICO EN CUBA · FKR SURL', margin + 4, guaranteeBoxY + 5.5);

  doc.setTextColor(55, 65, 81);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  const guaranteeText = 'Todos los equipos cuentan con respaldo de puesta en marcha, calibración, pruebas de carga y piezas de repuesto en La Habana y territorio cubano por el equipo de ingeniería de FKR SURL.';
  const gLines = doc.splitTextToSize(guaranteeText, contentWidth - 8);
  doc.text(gLines, margin + 4, guaranteeBoxY + 10.5);

  // 9. Corporate Footer Banner
  doc.setFillColor(16, 19, 23);
  doc.rect(0, pageHeight - 16, pageWidth, 16, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('SEDE CENTRAL: 2GWX+Q5G, LA HABANA, CUBA', margin, pageHeight - 8.5);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(209, 213, 219);
  doc.text('WHATSAPP: +53 50998801  ·  EMAIL: CONTACTO@FKR.CU  ·  WEB: FKR.CU', pageWidth - margin, pageHeight - 8.5, { align: 'right' });

  // Save/Download PDF
  const filename = `FKR-${product.slug}-Ficha-Tecnica.pdf`;
  doc.save(filename);
};
