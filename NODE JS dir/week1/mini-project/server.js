// server.js
// ---------------------------------------
// Ce script crée un petit serveur HTTP
// pour consulter les logs et les statistiques système.
// ---------------------------------------

const http = require('http');
const fs = require('fs');
const os = require('os');

const PORT = 3000; // Port d’écoute du serveur

// Création du serveur
const server = http.createServer((req, res) => {
  // Route racine : page d’accueil
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(
      'Bienvenue sur le Node System Logger 🚀\n\n' +
      'Routes disponibles :\n' +
      '/logs → afficher les logs\n' +
      '/stats → voir les stats système'
    );
  }

  // Route /logs : affiche le contenu du fichier log.txt
  else if (req.url === '/logs') {
    fs.readFile('log.txt', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Erreur lors de la lecture du fichier log.');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(data);
    });
  }

  // Route /stats : affiche les statistiques système en JSON
  else if (req.url === '/stats') {
    const stats = {
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
      uptime: os.uptime(),
      freePercent: ((os.freemem() / os.totalmem()) * 100).toFixed(2)
    };

    // Envoi au client au format JSON
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(stats, null, 2));
  }

  // Si la route n’existe pas → erreur 404
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Erreur 404 : Page non trouvée.');
  }
});

// Lancement du serveur
server.listen(PORT, () => {
  console.log(`✅ Serveur HTTP démarré sur http://localhost:${PORT}`);
});
