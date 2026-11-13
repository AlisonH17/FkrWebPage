import fs from 'fs';

fs.mkdirSync('public/assets/specs', { recursive: true });

function makeSimplePdf(title: string, specs: string[]): string {
  const content = [
    'BT',
    '/F1 18 Tf',
    '50 740 Td',
    `(${title}) Tj`,
    '/F1 11 Tf',
    '0 -26 Td',
    '(FKR SURL - Soluciones Energeticas | La Habana, Cuba) Tj',
    '0 -18 Td',
    '(WhatsApp: +53 50998801  |  Instagram: @fkr_energia_surl) Tj',
    '0 -32 Td',
    '(PARAMETROS TECNICOS Y ESPECIFICACIONES DE OPERACION:) Tj',
    ...specs.map(s => `0 -20 Td\n(${s.replace(/[()]/g, '')}) Tj`),
    '0 -35 Td',
    '(Servicios incluidos: Transporte, Montaje, Puesta en Marcha y Garantia Postventa.) Tj',
    'ET'
  ].join('\n');

  const streamLen = Buffer.byteLength(content, 'utf8');
  return `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length ${streamLen} >>
stream
${content}
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000060 00000 n 
0000000117 00000 n 
0000000244 00000 n 
0000000300 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
${400 + streamLen}
%%EOF`;
}

const files: Record<string, { title: string; specs: string[] }> = {
  'public/assets/specs/HIMOINSA-HSY25-Ficha-Tecnica.pdf': {
    title: 'FKR SURL - HIMOINSA HSY-25 Power Generator',
    specs: [
      '- Modelo: HIMOINSA HSY-25',
      '- Tipo: Insonorizado para intemperie',
      '- Combustible: Diesel industrial',
      '- Aplicacion: Respaldo continuo comercial e industrial',
      '- Refrigeracion: Liquida tropicalizada',
      '- Panel de Control: Digital con parada de emergencia'
    ]
  },
  'public/assets/specs/JET-JEX95D-Ficha-Tecnica.pdf': {
    title: 'FKR SURL - Bateria JET JEX95D Libre de Mantenimiento',
    specs: [
      '- Marca: JET BATERIAS (Industria Brasileira)',
      '- Modelo: JEX95D - Libre de Mantenimiento',
      '- Voltaje: 12V / Capacidad C20 (25 C): 95 Ah',
      '- Corriente de Arranque en Frio CCA (-18 C): 710 A',
      '- Reserva de Capacidad (25 C): 150 min',
      '- Regulador de Voltaje: 13.8V - 14.5V / Calidad ISO 9001'
    ]
  },
  'public/assets/specs/REPSOL-Giant-15W40-Ficha-Tecnica.pdf': {
    title: 'FKR SURL - Repsol Giant 7530 15W-40',
    specs: [
      '- Marca: REPSOL',
      '- Gama: Heavy Duty Diesel Oil 7530',
      '- Viscosidad: 15W-40',
      '- Presentacion: Garrafa de 5 Litros',
      '- Aplicacion: Servicio pesado en generadores HIMOINSA'
    ]
  },
  'public/assets/specs/REPSOL-Leader-Neo-5W30-Ficha-Tecnica.pdf': {
    title: 'FKR SURL - Repsol Leader Neo 5W-30',
    specs: [
      '- Marca: REPSOL',
      '- Grado: SAE 5W-30 Fully Synthetic',
      '- Capacidad: Garrafa de 4 Litros',
      '- Aplicacion: Motores modernos de alta eficiencia'
    ]
  }
};

for (const [filepath, data] of Object.entries(files)) {
  fs.writeFileSync(filepath, makeSimplePdf(data.title, data.specs));
  console.log('Generated PDF:', filepath);
}
