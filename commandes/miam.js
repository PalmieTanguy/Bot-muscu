const Discord = require("discord.js");
const color = "#007fff";
const client = new Discord.Client();
const OwnerID = "303971342703919104";
const request = require('request');
const ytdl = require('ytdl-core');

module.exports.run = async(client, message) => {

    if (message.author.id !== OwnerID)
        return message.channel.send("Permission non accordé");
    args = message.content.substring(message.content.indexOf(" ") + 1, message.content.length)
    if (!args)
        return message.reply("Merci d'ajouter 1 argument à cette commande")

    apikey = "AIzaSyDRj96JsNyvLdlqrXgqbn6E92L6-PoXiHQ"
    url = "https://youtube.googleapis.com/youtube/v3/search?maxResults=1&q=" + args + "&key=" + apikey;

    request(url, { json: true }, (err, body, res) => {
        if (err) { return console.log(err); }
        console.log(res.items[0].id.videoId);
        kolo = res.items[0].id.videoId;
        if (!kolo)
            return message.reply("Argument non conforme -> pas de chaine ytb")
        client.voiceChannel.join().then(connection => {
            connection.play(ytdl('https://www.youtube.com/watch?v=' + kolo, { filter: 'audioonly' }));
        }).catch(console.error);
        message.channel.send("Url: https://www.youtube.com/watch?v=" + kolo)

    });

};

module.exports.help = {
    name: "miam",
};