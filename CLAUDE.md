# Digital Monster · sitio oficial (digitalmonster.cl)

Empresa de Teoc (TeocHub) y Skynook, Chile (no tiene relación con Digimon). Responder y escribir en español.

## Cómo funciona
- `sitio/` es exactamente lo que se ve en digitalmonster.cl. Todo commit en `main` que toque `sitio/` se publica solo en HostGator (`.github/workflows/publicar.yml`, FTPS a una cuenta FTP limitada a `public_html`).
- Credenciales solo como secretos del repositorio (`FTP_SERVIDOR`, `FTP_USUARIO`, `FTP_CLAVE`). Nunca en archivos ni en el chat.
- Los cambios del sitio pasan por este repositorio. Lo que se edite directo en el Administrador de archivos de cPanel se pisa en la próxima publicación.
- Plan B si Actions no corre: `.cpanel.yml` para la herramienta Git de cPanel (clonar el repo público, luego "Actualizar desde remoto" e "Implementar el commit HEAD" a mano).
- Para volver atrás: revertir el commit y publicar.
- Commits directo a `main`, mensajes en español, cortos.
- La versión de enero de 2026 que estaba en la raíz del repo (para GitHub Pages, con CNAME www.digitalmonster.cl) quedó en el historial de git; la vigente es la que estaba en el servidor (es/, en/, nosotros/about).
- Forja vive aparte (TeocHub/forja, en forja.digitalmonster.cl por GitHub Pages). Correos y DNS se manejan en cPanel, no aquí.
