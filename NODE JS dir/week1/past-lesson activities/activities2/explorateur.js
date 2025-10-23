const fs = require("fs");     // Module pour lire et écrire dans les fichiers
const path = require("path"); // Module pour gérer les chemins de fichiers

// Lire le contenu du dossier actuel
fs.readdir(__dirname, (err, files) => {
    if (err) return console.log("Erreur :", err.message);
    
    console.log("Contenu du dossier :", files);

    // Afficher le chemin complet de chaque fichier
    files.forEach(f => {
        console.log(path.join(__dirname, f));
    });
    const date = new Date().toLocaleString(); // Get current date and time
    const message = `Date : ${date}\nNombre de fichiers trouvés : ${files.length}\n\n`;
fs.appendFile("log.txt", message, (err) => {
    if (err) return console.log("Erreur lors de l'écriture du log :", err.message);
    console.log("Informations enregistrées dans log.txt ");
});

});
