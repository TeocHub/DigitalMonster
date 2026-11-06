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
- La versión de enero de 2026 que estaba en la raíz del repo (para GitHub Pages, con CNAME www.digitalmonster.cl) quedó en el historial de git; la vigente es la que estaba en el servidor (es/, en/, nosotros/about).
- Forja vive aparte (TeocHub/forja, en forja.digitalmonster.cl por GitHub Pages). Correos y DNS se manejan en cPanel, no aquí.
