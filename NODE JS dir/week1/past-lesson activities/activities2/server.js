const http = require("http"); // pour importer les module http from node js

const server = http.createServer((req, res) => { // pour créer un serveur 
    if (req.url === "/") { // condition si url demandée / (..) envoie text bienvenu sur ..
        res.write("Bienvenue sur notre serveur Node.js !");
        res.end(); // terminer la reponse
    } else if (req.url === "/api/etudiants") {
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify(["islam", "adam", "manal"]));
    } else {
        res.writeHead(404);
        res.end("Page non trouvée");
    }
});

server.listen(3000, () => console.log("Serveur en écoute sur le port 3000...")); // text afficher dans le terminal
