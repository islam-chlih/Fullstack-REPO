// monitor.js
// ---------------------------------------
// Ce script surveille le système toutes les 5 secondes.
// Il collecte la mémoire libre, la mémoire totale,
// le temps d’activité (uptime), et enregistre tout
// cela dans le log via le module Logger.
// ---------------------------------------

const os = require('os');       // Module standard pour infos système
const Logger = require('./logger'); // Notre module Logger

const logger = new Logger(); // Création d’une instance du logger

// Fonction de surveillance principale
function monitorSystem() {
  const totalMem = os.totalmem(); // Mémoire totale (en octets)
  const freeMem = os.freemem();   // Mémoire libre (en octets)
  const uptime = os.uptime();     // Temps depuis le démarrage (en secondes)
  const percentFree = (freeMem / totalMem) * 100; // % de mémoire libre

  // Message formaté pour le log
  const stats = `Mémoire libre : ${(freeMem / 1e6).toFixed(2)} MB / ${(totalMem / 1e6).toFixed(2)} MB | Uptime : ${uptime.toFixed(0)}s | Libre : ${percentFree.toFixed(2)}%`;

  // Écrit les stats dans le fichier log
  logger.log(stats);

  // Si la mémoire libre est < 20%, on émet un événement d’alerte
  if (percentFree < 20) {
    logger.warnLowMemory(percentFree);
  }
}

// Écouteur d’événement : message ajouté
logger.on('messageLogged', (msg) => {
  console.log('→ Nouveau log enregistré');
});

// Écouteur d’événement : mémoire faible
logger.on('lowMemory', (msg) => {
  console.warn(msg);
});

// Message d’accueil dans la console
console.log('Surveillance du système en cours... (Ctrl+C pour arrêter)');

// Lancement immédiat d’une première mesure
monitorSystem();

// Répétition automatique toutes les 5 secondes
setInterval(monitorSystem, 5000);
