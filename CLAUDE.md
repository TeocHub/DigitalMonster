# Digital Monster · sitio oficial (digitalmonster.cl)

Empresa de Teoc (TeocHub) y Skynook, Chile (no tiene relación con Digimon). Responder y escribir en español.

## Cómo funciona
- `sitio/` es exactamente lo que se ve en digitalmonster.cl.
- **Hoy se publica a mano** desde cPanel → Control de versiones Git (repositorio en `repositories/DigitalMonster`): "Actualizar desde remoto" y luego "Implementar el commit HEAD", que corre `.cpanel.yml` y copia `sitio/` a `public_html`. Después de cada cambio, recordarle a Teoc que toque esos dos botones.
- También está `.github/workflows/publicar.yml` (FTPS automático a una cuenta FTP limitada a `public_html`), pero GitHub Actions está bloqueado en la cuenta por la facturación (tarjeta rechazada); si se resuelve, vuelve a publicar solo con cada commit que toque `sitio/`.
- Credenciales solo como secretos del repositorio (`FTP_SERVIDOR`, `FTP_USUARIO`, `FTP_CLAVE`). Nunca en archivos ni en el chat.
- Los cambios del sitio pasan por este repositorio. Lo que se edite directo en el Administrador de archivos de cPanel se pisa en la próxima publicación.
- Para volver atrás: revertir el commit y publicar.
- Commits directo a `main`, mensajes en español, cortos.
- La versión de enero de 2026 que estaba en la raíz del repo (para GitHub Pages, con CNAME www.digitalmonster.cl) quedó en el historial de git; la versión es/en de 2025-2026 también.
- Forja vive aparte (TeocHub/forja, en forja.digitalmonster.cl por GitHub Pages). Correos y DNS se manejan en cPanel, no aquí.

## El sitio (versión de noviembre de 2026)
- Una sola página: `sitio/index.html` + `sitio/assets/sitio.css` + `sitio/assets/sitio.js`. Navegación por pestañas con `#inicio`, `#proyectos`, `#formatos`, `#estudio`, `#contacto`.
- Idioma: el español está escrito en el HTML (`data-i18n`); el inglés está en el objeto `EN` de `sitio.js`. Los datos (proyectos, formatos, equipo, opciones del formulario) están arriba en `sitio.js` con su versión `es`/`en`. `?lang=en` fuerza el idioma.
- `es/`, `en/`, `es/nosotros/` y `en/about/` solo redirigen a la página nueva (se mantienen para no romper enlaces viejos y porque `.cpanel.yml` no borra en el servidor).
- Solo se muestran proyectos que existen de verdad: Firelights (webcómic, prototipo y borrador) y Card Game (videojuego, próximamente). No inventar proyectos ni hitos.
- Estética: tinta casi negra, violeta y magenta del logo sobreimpresos, amarillo de Firelights; Big Shoulders Display + IBM Plex Mono/Sans. Teoc no quiere listas ni nada que se note "hecho por IA". Fotos del equipo sin filtros.
- Contacto: carta con huecos (nombre, motivo, correo obligatorio y válido) que se envía por `sitio/contacto.php` con `mail()` a contacto@digitalmonster.cl. El asunto lleva etiqueta en español ([Proyecto], [Colaboración], [Prensa], [Comercial], [Contacto]) para filtrar. Anti-bots: campo oculto `sitio_web` y envío en menos de 3 s. contacto@ debe reenviarse al correo personal de Teoc (Reenviadores en cPanel).
- Forja se presenta en Contacto como herramienta de Digital Monster que ellos mismos usan.
- Al cambiar CSS o JS, subir el `?v=` en `index.html` para que los navegadores no usen la copia vieja.
