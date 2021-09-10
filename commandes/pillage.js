const Discord = require("discord.js");
const client = new Discord.Client();
const OwnerID = "303971342703919104";
const axios = require('axios');
const { MessageEmbed, RichEmbed } = require("discord.js")

module.exports.run = async(client, message, args) => {
    let nbPillage = 0;
    if (!args[1]) {
        nbPillage = 0;
    } else {
        nbPillage = args[1];
    }

    if (args.length != 1 && args.length != 2) {
        return message.channel.send("commande non valide")
    }

    serverColor = ""
    switch (args[0]) {
        case "blue":
            serverColor = "blue"
            break;
        case "white":
            serverColor = "white"
            break;
        case "yellow":
            serverColor = "yellow"
            break;
        case "alpha":
            serverColor = "alpha"
            break;
        case "gamma":
            serverColor = "gamma"
            break;
        case "sigma":
            serverColor = "sigma"
            break;
        case "cyan":
            serverColor = "cyan"
            break;
        case "black":
            serverColor = "black"
            break;
        case "coral":
            serverColor = "coral"
            break;
        case "lime":
            serverColor = "lime"
            break;
        case "omega":
            serverColor = "omega"
            break;
        case "pink":
            serverColor = "pink"
            break;
        case "purple":
            serverColor = "purple"
            break;
        case "orange":
            serverColor = "orange"
            break;
        default:
            return message.channel.send("bad color choice")
    }
    let myStringCountry = ""
    axios.get(`http://aaronbotng.ddns.net:30/api/pillage?serverColor=${serverColor}&pillage=` + nbPillage)
        .then(function(response) {
            const obj = response.data;
            obj.forEach(element => {
                myStringCountry += "" + element.name + " | " + element.pillage + "\n";
            });
            let reportEmbed = new Discord.MessageEmbed()
                .setTitle("Pillage du server " + serverColor)
                .setThumbnail("https://cdn.nationsglory.fr/default/assets/img/servers/" + serverColor.toLowerCase() + ".png")
                .setDescription(myStringCountry)
                .setColor("#ff9000")
                .setTimestamp();
            message.channel.send(reportEmbed);
        })
};

module.exports.help = {
    name: "pillage",
};