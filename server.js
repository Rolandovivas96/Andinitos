const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8082;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Andinitos2026!';

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain; charset=utf-8'
};

const FORBIDDEN_PATHS = [
    /(^|\/)\.[^/]+/,
    /(^|\/)node_modules($|\/)/i,
    /(^|\/)\.git($|\/)/i,
    /(^|\/)\.env$/i,
    /(^|\/)(package\.json|package-lock\.json|server\.js|\.htaccess|\.npmrc)$/i
];

const ALLOWED_EXTENSIONS = new Set(Object.keys(MIME_TYPES));

function applySecurityHeaders(res) {
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.whatsapp.com https://*.firebaseio.com wss://*.firebaseio.com https://*.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://firebase.googleapis.com; object-src 'none'; base-uri 'self'; frame-ancestors 'none';");
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');
    res.setHeader('X-XSS-Protection', '1; mode=block');
}

function sendJsonError(res, statusCode, message) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store'
    });
    res.end(JSON.stringify({ error: message }));
}

function isForbiddenPath(urlPath) {
    return FORBIDDEN_PATHS.some((pattern) => pattern.test(urlPath));
}

function isAuthorizedAdmin(req) {
    const header = req.headers.authorization || '';
    if (!header.startsWith('Basic ')) return false;

    try {
        const raw = Buffer.from(header.substring(6), 'base64').toString('utf8');
        const [username, password] = raw.split(':');
        return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
    } catch (error) {
        return false;
    }
}

const server = http.createServer((req, res) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
        applySecurityHeaders(res);
        res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('Método no permitido');
    }

    let safeUrl = req.url ? req.url.split('?')[0] : '/';
    if (safeUrl === '/') safeUrl = '/index.html';
    if (safeUrl === '/admin') safeUrl = '/admin.html';

    if (safeUrl.includes('..') || safeUrl.includes('\\') || isForbiddenPath(safeUrl)) {
        applySecurityHeaders(res);
        return sendJsonError(res, 403, 'Ruta no permitida');
    }

    const normalizedPath = safeUrl.startsWith('/') ? safeUrl : `/${safeUrl}`;
    const filePath = path.resolve(__dirname, `.${normalizedPath}`);
    const rootDir = path.resolve(__dirname);

    if (!filePath.startsWith(rootDir)) {
        applySecurityHeaders(res);
        return sendJsonError(res, 403, 'Acceso no autorizado');
    }

    const isAdminRequest = normalizedPath.toLowerCase() === '/admin.html';
    if (isAdminRequest && !isAuthorizedAdmin(req)) {
        applySecurityHeaders(res);
        res.writeHead(401, {
            'Content-Type': 'text/plain; charset=utf-8',
            'WWW-Authenticate': 'Basic realm="Andinitos Admin"',
            'Cache-Control': 'no-store'
        });
        return res.end('Debe autenticarse para acceder al panel administrativo.');
    }

    const ext = path.extname(filePath).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
        applySecurityHeaders(res);
        return sendJsonError(res, 403, 'Tipo de archivo no permitido');
    }

    fs.readFile(filePath, (err, content) => {
        applySecurityHeaders(res);

        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                return res.end('404 - Archivo no encontrado');
            }

            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            return res.end(`500 - Error interno: ${err.code}`);
        }

        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': 'no-store'
        });

        if (req.method === 'HEAD') {
            return res.end();
        }

        res.end(content, 'utf-8');
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor local de Andinitos corriendo en http://0.0.0.0:${PORT}`);
    console.log('Credenciales del admin (cambiar en entorno real con ADMIN_USERNAME y ADMIN_PASSWORD):');
    console.log(`Usuario: ${ADMIN_USERNAME}`);
    console.log(`Contraseña: ${ADMIN_PASSWORD}`);
});
