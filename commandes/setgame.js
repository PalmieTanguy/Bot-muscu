const Discord = require("discord.js");
const { indexOf } = require("ffmpeg-static");
const color = "#007fff";
const client = new Discord.Client();

const OwnerID = "303971342703919104";

module.exports.run = async(client, message, args) => {
    console.log(message.content)
    let setGameChanger = message.content.substring(indexOf('"'))

    console.log(setGameChanger)

    if (
        message.member.hasPermission("ADMINISTRATOR") == 1 ||
        message.author.id == OwnerID
    ) {
        message.delete();
        if (args[0] || setGameChanger) {
            client.user.setActivity(args[0]);
        } else {
            message.channel.send("Pas d'argument founis pour la commande setgame")
        }
    }

};

module.exports.help = {
    name: "setgame",
};