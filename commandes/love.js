const Discord = require("discord.js");
const color = "#007fff";
const client = new Discord.Client();
const OwnerID = "303971342703919104";

module.exports.run = async(client, message, args) => {


    var mentionned = message.mentions.users.first();
    const author = message.author;
    if (mentionned == null) {
        return message.reply(
            "Vous devez mentionnez une personne afin que la commande s'effectue"
        );
    }
    if (author == mentionned) {
        return message.reply("tu ne serais pas trop narcissique?");
    }
    loveP = Math.floor(Math.random() * Math.floor(100));

    emoji = "null";
    text = "null";
    ylove = "";
    if (loveP < 30) {
        emoji = ":broken_heart:";
        text = "pas du tout";
        ylove = "n'";
    } else if (loveP < 55) {
        emoji = ":hearts:";
        text = "un peu";
    } else if (loveP < 75) {
        emoji = ":sparkling_heart:";
        text = "beaucoup";
    } else if (loveP < 80) {
        emoji = ":heartpulse:";
        text = "passionnément";
    } else if (loveP > 80 || loveP < 100) {
        emoji = ":heartpulse:";
        text = "à la folie";
    } else if (loveP == 100) {
        emoji = ":couple_with_heart:";
        text = "pour la vie";
    }
    userMention = "<@" + mentionned.id + ">";
    message.channel.send(
        author.username +
        " vous " +
        ylove +
        "aimez " +
        text +
        " " +
        userMention +
        " à " +
        loveP +
        "% " +
        emoji
    );
};

module.exports.help = {
    name: "love",
};