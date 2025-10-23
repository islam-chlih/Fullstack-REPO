// Import the "os" module, which gives information about the computer

const os=require('os');

console.log("plateforme :",os.platform());//Prints the operating system of the computer
console.log("architecture :",os.arch());// Prints the CPU architecture of your computer
console.log("cpu :",os.cpus().length,"coeurs");// Prints the number of CPU cores in the computer
console.log("mémoire totale:",os.totalmem());// Prints the total RAM of the  computer in bytes
console.log("mémoire libre : node " ,os.freemem());//prints the free ram in the computer in bytes
console.log("uptime (en heures) :",(os.uptime()/3600));//Prints how long the computer has been running in seconds but i converted in in hours by dividing it on 3600