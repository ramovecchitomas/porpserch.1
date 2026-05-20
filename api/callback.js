module.exports = function handler(req, res) {
  const code  = req.query.code  || '';
  const error = req.query.error || '';

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
  p { color: #aaa; font-size: 14px; text-align: center; }
</style>
</head>
<body>
  <div class="spinner"></div>
  <p id="msg">Conectando con MercadoLibre...</p>
  <script>
    const code  = ${JSON.stringify(code)};
    const error = ${JSON.stringify(error)};
    if (error) {
      document.getElementById('msg').textContent = 'Error: ' + error + '. Cerrando...';
      setTimeout(() => window.close(), 2000);
    } else if (code) {
      localStorage.setItem('ps_oauth_code', code);
      localStorage.setItem('ps_oauth_ts', Date.now().toString());
      document.getElementById('msg').textContent = '✅ ¡Autorizado! Podés cerrar esta pestaña.';
      window.close();
    } else {
      document.getElementById('msg').textContent = 'No se recibió código. Intentá de nuevo.';
    }
  </script>
</body>
</html>`);
}
