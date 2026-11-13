# Plan de Reorganización Visual y Estructural de FKR SURL

Reorganización de la arquitectura visual, navegación y jerarquía de contenidos de FKR SURL para brindar mayor cohesión corporativa, eliminar rupturas cromáticas y optimizar la legibilidad y el flujo de navegación en escritorio y dispositivos móviles.

---

### Decisiones Críticas y Preferencias Confirmadas

> [!IMPORTANT]
> **Decisiones confirmadas por el usuario:**
> 1. **Estilo de botones de contacto WhatsApp**: Se elimina el verde brillante y se adopta un **estilo outline minimalista en blanco y rojo corporativo FKR**, integrando iconografía monocromática armoniosa.
> 2. **Secuencia de la página de inicio**: Orden confirmado: **Hero → Líneas Principales de Solución (970x720) → Servicios Técnicos Especializados → Equipos Destacados → Evidencia Operativa en Cuba → Ubicación en La Lisa**.
> 3. **Sección activa en el menú superior**: Resaltado con **texto en rojo FKR (#D20A11) acompañado de una línea inferior roja sólida** de 3px y contraste semibold.

---

## 1. Visión General del Rediseño

El sitio web de FKR SURL representa una empresa líder en soluciones de generación diesel HIMOINSA, energía solar fotovoltaica ROSEN y suministro de repuestos con sede y tienda física en La Lisa, La Habana. 

Para resolver la sensación de dispersión y optimizar la experiencia de usuario:
- **Delimitación de la cabecera**: Se implementa una franja roja muy fina (2px) en el borde inferior del menú fijo para separarlo nítidamente del fondo blanco o gris del contenido al hacer scroll.
- **Identidad cromática unificada**: Se erradica por completo el verde estridente de WhatsApp, reemplazándolo por el estilo outline minimalista en blanco y rojo que mantiene la sobriedad industrial.
- **Narrativa visual lógica en la portada**: El usuario primero descubre qué soluciones ofrece FKR, luego cómo ejecuta cada etapa del servicio técnico (ciclo de ingeniería), después el catálogo de equipos disponibles, y finalmente la evidencia operativa y localización física en La Lisa.
- **Nuevo ratio fotográfico 970x720**: Las 4 tarjetas de soluciones adoptan una geometría horizontal calibrada que enmarca con precisión las máquinas sin cortes indeseados.

---

## 2. Experiencia de Usuario y Diseño Visual

### A. Cabecera y Navegación Superior
- **Franja inferior divisoria**: Línea roja corporativa (`#D20A11`) de 2px en el límite inferior del `<header>`, que actúa como ancla visual permanente mientras el usuario se desplaza.
- **Estado activo de sección**: La página en la que se encuentra el usuario se destaca con tipografía en rojo FKR y un indicador inferior horizontal sólido. En el menú desplegable móvil, se acompaña de un acento lateral izquierdo y fondo sutil atenuado.
- **Tipografía**: EurostileNextLTPro-Light a gran escala para asegurar máxima legibilidad a personas con debilidad visual o en pantallas reducidas.

### B. Armonización del Sistema de Contacto (WhatsApp sin Verde)
- **Eliminación del verde `#25D366`**: Sustitución en todos los botones y tarjetas por el estilo outline:
  - Sobre fondos claros: `border-2 border-[#D20A11] text-[#D20A11] bg-white hover:bg-[#D20A11] hover:text-white`.
  - Sobre paneles oscuros (`#2C353F`): `border-2 border-white text-white hover:bg-[#D20A11] hover:border-[#D20A11] hover:text-white`.
- **Iconografía**: Icono monocromático delineado que se adapta al color del texto del botón, eliminando logos chillones que fragmenten la estética.
- **Botón flotante lateral**: Botón sobrio con contorno rojo o fondo gris azulado oscuro y acento rojo.

### C. Formato 970x720 en las Líneas Principales de Solución
- Contenedores de imagen con ratio exacto `aspect-[970/720]` y fondo blanco de estudio.
- Centrado óptico de las máquinas (Grupos Electrógenos, Paneles e Inversores Solares, Baterías y Repuestos, Logística y Transporte).

---

## 3. Jerarquía y Secuencia de la Portada

```
┌────────────────────────────────────────────────────────┐
│  HEADER: Logo FKR ── Enlaces con activo rojo ── CTA   │
│  ══════════════════ [Franja roja 2px] ════════════════ │
├────────────────────────────────────────────────────────┤
│  1. HERO VIDEO: Video institucional + Botones acción   │
├────────────────────────────────────────────────────────┤
│  2. LÍNEAS DE SOLUCIÓN: 4 paneles horizontales 970x720 │
│     [Generadores] [Solar] [Baterías] [Transporte]      │
├────────────────────────────────────────────────────────┤
│  3. SERVICIOS TÉCNICOS: Banner con los 6 pasos y CTA   │
│     "Ver detalles ↗" hacia el mapa conceptual          │
├────────────────────────────────────────────────────────┤
│  4. EQUIPOS DESTACADOS: Catálogo con filtros limpios   │
├────────────────────────────────────────────────────────┤
│  5. EVIDENCIA OPERATIVA: Cuadrilla en azotea y flota   │
├────────────────────────────────────────────────────────┤
│  6. UBICACIÓN REAL: Mapa interactivo en La Lisa        │
├────────────────────────────────────────────────────────┤
│  7. PUENTE DE CONTACTO: Consulta directa en outline    │
├────────────────────────────────────────────────────────┤
│  FOOTER: Enlaces institucionales, sede y derechos     │
└────────────────────────────────────────────────────────┘
```

---

## 4. Reestructuración de la Información en Todo el Sitio

1. **Página de Inicio (`Home.tsx`)**:
   - Reordenación secuencial: Hero → Soluciones (970x720) → Servicios → Equipos Destacados → Evidencia → Ubicación → Contacto.
   - Espaciado rítmico estandarizado entre bloques para evitar saturación visual.
2. **Navegación (`Header.tsx`)**:
   - Franja roja inferior de 2px permanente.
   - Detección precisa de ruta activa con resaltado en rojo FKR y subrayado sólido.
3. **Botones de WhatsApp en todo el sitio**:
   - Actualización en `Footer.tsx`, `FloatingActions.tsx`, `ProductCard.tsx`, `ProductDetail.tsx`, `LocationMap.tsx`, `Services.tsx`, `Company.tsx`, `Contact.tsx` y `FAQ.tsx`.
   - Adopción uniforme del estilo outline minimalista blanco/rojo sin verde.
4. **Tarjetas de Soluciones (`SolutionsGrid.tsx`)**:
   - Aplicación del nuevo ratio `aspect-[970/720]` en las imágenes de los cuatro paneles.
   - Ajuste de paddings y tipografía para visualización equilibrada en móvil, tablet y pantallas anchas (1440px).

---

## 5. Verificación y Control de Calidad

- **Verificación estética**: Comprobar que la franja roja del menú define claramente el corte con la página sin resultar invasiva.
- **Inspección de contraste y color**: Confirmar que no queden remanentes del verde `#25D366` en ninguna pantalla.
- **Comportamiento responsive**: Probar la fluidez del formato 970x720 en móvil (375px–414px), tablet (768px–1024px) y desktop (1440px).
- **Compilación y linting**: Ejecución simultánea de `compile_applet` y `lint_applet` sin advertencias.
