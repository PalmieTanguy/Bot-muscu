const Discord = require("discord.js");
const ytdl = require("ytdl-core");


module.exports.run = async(message, args) => {
    const { voiceChannel } = message.member;
    if (!voiceChannel)
        return message.channel.send(
            "Vous devez être dans un salon vocal pour utiliser cette commande !"
        );
    //const serverQueue = message.client.queue.get(message.guild.id);
    //if (!serverQueue)
    //return message.channel.send("Il n'y a aucune musique à arrêter !");
    //serverQueue.songs = [];
    //serverQueue.connection.dispatcher.end("La commande stop a été utilisé !");
    message.guild.me.voiceChannel.leave();

};

module.exports.help = {
    name: "stop"
};