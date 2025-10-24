// logger.js
// ---------------------------------------
// Ce module définit une classe Logger qui
// hérite de EventEmitter pour gérer les logs
// et déclencher des événements personnalisés.
// ---------------------------------------

const fs = require('fs');
const EventEmitter = require('events');

class Logger extends EventEmitter {
  constructor(logFile = 'log.txt') {
    super(); // Appel au constructeur de EventEmitter
    this.logFile = logFile; // Nom du fichier de log
  }

  // Méthode principale : écrire un message dans le log
  log(message) {
    // Ajoute un horodatage au format HH:MM:SS
    const timestamp = new Date().toLocaleTimeString('fr-FR', { hour12: false });
    const entry = `[${timestamp}] ${message}\n`;

    // Écrit (ou ajoute) le message dans le fichier log.txt
    fs.appendFile(this.logFile, entry, (err) => {
      if (err) console.error('Erreur lors de l’écriture du log :', err);
    });

    // Émet un événement "messageLogged" quand un message est enregistré
    this.emit('messageLogged', entry);
  }

  // Méthode spéciale pour signaler une mémoire faible
  warnLowMemory(percentFree) {
    const message = `⚠️ Mémoire faible : ${percentFree.toFixed(2)}% libre`;
    this.log(message); // On enregistre aussi ce message dans le log
    this.emit('lowMemory', message); // Et on déclenche l’événement
  }
}

module.exports = Logger;
