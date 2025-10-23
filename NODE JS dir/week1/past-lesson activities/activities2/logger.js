
const EventEmitter = require("events");// importer la class eventemitter  pour créer des objets qui utilise des évennement et réagir evec des listners

class Logger extends EventEmitter {
  log(message) {
    console.log("LOG :", message);
    this.emit("messageLogged", { message, date: new Date() });
  }
}


const fs=require("fs"); // pour importer file system module en node js , pour pouvoir lire et écrire dans des fichiers
const EventEmitter = require(events);
class Logger extends EventEmitter {
  log(message) {
    fs.appendFileSync("log.txt", message + "/n");
    this.emit("messageLogged", { message, date: new Date() });
  }
}
module.exports = Logger;

//Activité 6
class Logger extends EventEmitter{ // class logger qui herite de laclasse eventemitter( now logger can listen or create events)
  log(message){  // chaque fois qu'on appele blogger("texte") ce bloc s'éxecute
    fs.appendFileSync("log.txt",message+"\n"); // pour ajouter le texte dans le fichier log.txt
    this.emit("messageLogged",{message,data:new Date()}); // on  passe un objet comme donées de l'evenement (text et la date actuelle)
  }
}
module.exports=Logger; // export class logger so we can use in other files
