export default function handler(req, res) {
  const code  = req.query.code  || '';
  const error = req.query.error || '';

  // Esta página la abre ML después del login.
  // Pasa el código a la app.html via localStorage y se cierra sola.
  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Conectando...</title>
<style>
  body { font-family: sans-serif; background: #0d0d0d; color: #f0ede8;
         display: flex; align-items: center; justify-content: center;
         min-height: 100vh; margin: 0; flex-direction: column; gap: 16px; }
  .spinner { width: 40px; height: 40px; border: 3px solid #333;
             border-top-color: #f0e040; border-radius: 50%;
             animation: spin .8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  p { color: #666; font-size: 14px; }
</style>
</head>
<body>
  <div class="spinner"></div>
  <p>${error ? '❌ Error: ' + error : 'Conectando con MercadoLibre...'}</p>
  <script>
    if ('${error}') {
      document.querySelector('p').textContent = 'Error al conectar. Cerrando...';
      setTimeout(() => window.close(), 2000);
    } else if ('${code}') {
      // Guardar el code en localStorage para que app.html lo levante
      localStorage.setItem('ps_oauth_code', '${code}');
      localStorage.setItem('ps_oauth_ts', Date.now().toString());
      document.querySelector('p').textContent = '✅ ¡Listo! Podés cerrar esta pestaña.';
      // Intentar cerrar esta pestaña automáticamente
      window.close();
    }
  </script>
</body>
</html>`);
}
