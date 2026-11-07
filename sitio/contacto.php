<?php
/*
 * Formulario de contacto de digitalmonster.cl
 * Recibe la carta del sitio y la envía a contacto@digitalmonster.cl.
 * El asunto lleva una etiqueta en español ([Proyecto], [Colaboración], [Prensa], [Comercial], [Contacto])
 * para poder filtrar en el correo. "Responder" va directo a quien escribió.
 */

date_default_timezone_set('America/Santiago');

const DESTINO   = 'contacto@digitalmonster.cl';
const REMITENTE = 'contacto@digitalmonster.cl';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function responder($ok, $error = '', $codigo = 200) {
    http_response_code($codigo);
    echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $error], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(false, 'Método no permitido.', 405);
}

$en = (($_POST['idioma'] ?? 'es') === 'en');
$msg = function ($es, $eng) use ($en) { return $en ? $eng : $es; };

// Trampas para bots: campo oculto con contenido, o envío demasiado rápido.
if (trim($_POST['sitio_web'] ?? '') !== '') {
    responder(true);
}
$t = (int) ($_POST['t'] ?? 0);
if ($t > 0 && (microtime(true) * 1000 - $t) < 3000) {
    responder(true);
}

function campo($clave, $max) {
    $v = trim((string) ($_POST[$clave] ?? ''));
    $v = str_replace(["\r\n", "\r"], "\n", $v);
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v);
    return mb_substr($v, 0, $max, 'UTF-8');
}
function linea($v) { return trim(preg_replace('/\s+/u', ' ', $v)); }

$nombre  = linea(campo('nombre', 80));
$correo  = linea(campo('correo', 160));
$motivo  = campo('motivo', 20);
$titulo  = linea(campo('titulo', 120));
$formato = campo('formato', 20);
$estado  = campo('estado', 20);
$ayuda   = campo('ayuda', 20);
$enlace  = linea(campo('enlace', 300));
$mensaje = campo('mensaje', 5000);

$MOTIVOS  = ['proyecto' => 'Proyecto', 'colabora' => 'Colaboración', 'prensa' => 'Prensa', 'comercial' => 'Comercial', 'otro' => 'Contacto'];
$FORMATOS = ['videojuego' => 'Videojuego', 'comic' => 'Cómic', 'novela' => 'Novela', 'mesa' => 'Juego de mesa', 'serie' => 'Serie o corto', 'pelicula' => 'Película', 'merch' => 'Merch', 'otro' => 'Otro'];
$ESTADOS  = ['idea' => 'Idea escrita', 'prototipo' => 'Prototipo o borrador', 'avanzado' => 'Bastante avanzado', 'terminado' => 'Terminado'];
$AYUDAS   = ['conversar' => 'Conversar primero', 'distribucion' => 'Distribución', 'coproduccion' => 'Coproducción', 'produccion' => 'Producción'];

if (!isset($MOTIVOS[$motivo])) $motivo = 'otro';
$esProyecto = ($motivo === 'proyecto');

$faltan = [];
if ($nombre === '') $faltan[] = $msg('tu nombre', 'your name');
if ($correo === '' || !filter_var($correo, FILTER_VALIDATE_EMAIL)) $faltan[] = $msg('un correo válido', 'a valid email');
if ($mensaje === '' && !($esProyecto && $titulo !== '')) $faltan[] = $msg('algo que contarnos', 'something to tell us');
if ($faltan) {
    responder(false, $msg('Nos falta ', 'We still need ') . implode(', ', $faltan) . '.', 422);
}
if ($enlace !== '' && !preg_match('#^https?://#i', $enlace)) {
    $enlace = 'https://' . $enlace;
}

// Asunto
if ($esProyecto) {
    $asunto = '[Proyecto] ' . ($titulo !== '' ? $titulo : 'Sin nombre')
            . ' · ' . ($FORMATOS[$formato] ?? 'Otro')
            . ' · ' . ($AYUDAS[$ayuda] ?? 'Conversar primero');
} else {
    $asunto = '[' . $MOTIVOS[$motivo] . '] ' . $nombre;
}

// Cuerpo
$c  = "Nombre: $nombre\n";
$c .= "Correo: $correo\n";
$c .= 'Motivo: ' . $MOTIVOS[$motivo] . "\n";
if ($esProyecto) {
    $c .= 'Proyecto: ' . ($titulo !== '' ? $titulo : '—') . "\n";
    $c .= 'Formato: ' . ($FORMATOS[$formato] ?? 'Otro') . "\n";
    $c .= 'Estado: ' . ($ESTADOS[$estado] ?? '—') . "\n";
    $c .= 'Busca: ' . ($AYUDAS[$ayuda] ?? 'Conversar primero') . "\n";
    if ($enlace !== '') $c .= "Muestra: $enlace\n";
}
$c .= 'Idioma del sitio: ' . ($en ? 'inglés' : 'español') . "\n";
$c .= "\n" . ($mensaje !== '' ? $mensaje : '(sin mensaje)') . "\n";
$c .= "\n—\nEnviado desde el formulario de digitalmonster.cl el " . date('d-m-Y H:i') . "\n";

$cabeceras  = 'From: =?UTF-8?B?' . base64_encode('Sitio Digital Monster') . '?= <' . REMITENTE . ">\r\n";
$cabeceras .= 'Reply-To: =?UTF-8?B?' . base64_encode($nombre) . '?= <' . $correo . ">\r\n";
$cabeceras .= "MIME-Version: 1.0\r\n";
$cabeceras .= "Content-Type: text/plain; charset=UTF-8\r\n";
$cabeceras .= "Content-Transfer-Encoding: 8bit\r\n";

$asuntoCod = '=?UTF-8?B?' . base64_encode($asunto) . '?=';

$enviado = @mail(DESTINO, $asuntoCod, $c, $cabeceras, '-f' . REMITENTE);

if (!$enviado) {
    responder(false, $msg('No se pudo enviar. Escríbenos directo a ', 'It couldn’t be sent. Write to us at ') . DESTINO . '.', 500);
}
responder(true);
