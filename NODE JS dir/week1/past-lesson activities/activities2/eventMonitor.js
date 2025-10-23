const EventEmitter = require("events");
const emitter = new EventEmitter();

// Listen to the event
emitter.on("utilisateurConnecté", (data) => {
    console.log("Nouvelle connexion : " + `${data.nom} (${data.id})`);
});

// Emit the event (same exact name)
emitter.emit("utilisateurConnecté", { id: 1, nom: "islam" });
