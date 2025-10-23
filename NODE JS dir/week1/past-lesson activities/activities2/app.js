const Logger = require("./logger");  // Import Logger from logger.js
const logger = new Logger();// instance de la classe logger pour enregistrer des messages ..

// Attach listener BEFORE calling log
logger.on("messageLogged", (data) => {
    console.log("Événement capturé :", data);
});

// Call log
logger.log("Application démarrée !");

//activité 6

const http = require("http"); // on export module http pour créer un serveur
const Logger = require("./logger"); // j'ai importer la class logger
logger.on(
  "messageLogged",
  (
    data // for listening to the event
  ) => console.log("évenement capturé:", data)
);
const server = http.createServer((req, res) => {
  // to create a server
  logger.log(`requéte recue : ${req.url}`); // we call logger.log with url dyal request & saves it in log.txt
  res.end("requéte enregistrée !"); // this is the text that will display in the navigateur (response)
});
server.listen(4000, () => console.log("serveur sur le port 4000...")); // on démarre le serveur dans le port 4000 and we display that text in the terminal
