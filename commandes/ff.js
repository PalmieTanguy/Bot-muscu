const Discord = require("discord.js");
const color = "#007fff";
const client = new Discord.Client();
const axios = require('axios');
const { MessageEmbed, RichEmbed } = require("discord.js")
const fs = require("fs");

module.exports.run = async(client, message, args) => {
    let country = "";
    if (!args[1]) {
        return message.channel.send("commande non valide")
    } else {
        country = args[1];
        country = country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();
        if (country.includes("Empire")) {
            country = "Empire" + country.charAt(6).toLocaleUpperCase() + country.slice(7).toLowerCase();
        }
    }
    buffer = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJwAAABOCAYAAADVTn9pAAABe0lEQVR42u3dsQ3CQAxA0RRULAGCyViEFVgKsQiiokyNQGKASER2Lj5e8fuT8ipHdx6um/M7ovvxoI6LcjIAJ+AEHHDAASfgBFwouF8P+jzttcJaQQQOOOAEHHDAASfggANuHrhsQONlV6LXbRtS9jmrQAQOOOCAAw444IADDjjggJsGlz3maPWBe60V0CiIwAEHnIADDjjggAMOOODmgesV1vgYStQKaDZE4IADDjjggAMOOOCAAw64WHCtfopXgVIFaCuIwAEHHHDAAQcccAIOOODaggOrjzEKcAIOOOCAAw444IADDrh1gsuGCM8ysIADDjjggAMOOOCAAw444IBLeQbrz0BUvzgNHHDAAQcccMABBxxwwAE3D5znuvqAUuYiNHDAAQcccMABBxxwwAEH3Bdc9iLeKiuOeq3VSqSwXVvAAQecgAMOOOCAA07ATZY9RtEyZS/iBU7ACTjggANOwAEH3DLgoiCqVlFOgBNwAg444IATcAJusg/gA0NS5UC+wQAAAABJRU5ErkJggg==";
    fs.writeFileSync("new-path.jpg", buffer);

    serverColor = "";
    colorBarEmbed = "";
    switch (args[0]) {
        case "blue":
            serverColor = "blue";
            colorBarEmbed = "#00A1FF";
            break;
        case "white":
            serverColor = "white"
            colorBarEmbed = "#FFFFFF";
            break;
        case "yellow":
            serverColor = "yellow"
            colorBarEmbed = "#E8FE00";
            break;
        case "alpha":
            serverColor = "alpha"
            colorBarEmbed = "#FE4D00";
            break;
        case "gamma":
            serverColor = "gamma"
            colorBarEmbed = "#0B6700";
            break;
        case "sigma":
            serverColor = "sigma"
            colorBarEmbed = "#000000";
            break;
        case "cyan":
            serverColor = "cyan"
            colorBarEmbed = "#05FFFD";
            break;
        case "black":
            serverColor = "black"
            colorBarEmbed = "#141414";
            break;
        case "coral":
            serverColor = "coral"
            colorBarEmbed = "#ff5555";
            break;
        case "lime":
            serverColor = "lime"
            colorBarEmbed = "#21F70E";
            break;
        case "omega":
            serverColor = "omega"
            colorBarEmbed = "#9D9D9D";
            break;
        case "pink":
            serverColor = "pink"
            colorBarEmbed = "#E9B8FF";
            break;
        case "purple":
            serverColor = "purple"
            colorBarEmbed = "#C553F9";
            break;
        case "orange":
            serverColor = "orange"
            colorBarEmbed = "#FF9611";
            break;
        default:
            return message.channel.send("bad color choice")
    }

    axios.get(`http://185.142.53.9:30/api/country?serverColor=${serverColor}&name=` + country)
        .then(function(response) {
            if (!response.data[0]) {
                return message.channel.send("le pays " + country + " n 'existe pas")
            }
            let countryResponse = response.data[0];

            let level = countryResponse.level.toString();
            let mmr = countryResponse.mmr.toString();
            let claims = countryResponse.claims.toString();
            let power = countryResponse.power;
            let pillage = countryResponse.pillage.toString();
            let allies = !!countryResponse.ally.toString() ? countryResponse.ally.toString() : ":x:";
            let ennemies = !!countryResponse.ennemies.toString() ? countryResponse.ennemies.toString() : ":x:";
            let dateGet = !!countryResponse.updatedAt.toString() ? countryResponse.updatedAt.toString() : ":x:";
            let date = new Date(dateGet); // dateStr you get from mongodb

            month = date.getMonth() + 1;
            day = date.getDate();
            year = date.getFullYear();

            date = (day < 10 ? "0" + day : day) + "/" + (month < 10 ? "0" + month : month) + " " + year;

            let reportEmbed = new Discord.MessageEmbed()
                .setTitle("Pays: __**" + countryResponse.name + "**__")
                .setThumbnail("https://cdn.nationsglory.fr/default/assets/img/servers/" + serverColor.toLowerCase() + ".png")
                .setDescription("**" + countryResponse.createBy + "**")
                .addFields({ name: 'Level: ', value: level, inline: true }, { name: 'Claims: ', value: claims, inline: true }, { name: 'Power: ', value: power, inline: true })
                .addFields({ name: 'Mmr: ', value: mmr, inline: true }, { name: 'Pillage: ', value: pillage, inline: true }, )
                .addFields({ name: 'Alliés: ', value: allies, inline: false }, )
                .addFields({ name: 'Ennemis: ', value: ennemies, inline: false }, )
                .setColor(colorBarEmbed)
                .setFooter("Dernière update: " + date);

            message.channel.send(reportEmbed);
        })
};

module.exports.help = {
    name: "ff",
};