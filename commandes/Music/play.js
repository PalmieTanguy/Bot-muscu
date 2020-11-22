const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const readablestream = require("readable-stream");

//const music = require ('discord.js-music-v11');


module.exports.run = async(message, args) => {
    const voiceChannel = message.member.voiceChannel;

    //if(!voiceChannel) return message.channel.send("Tu n'as pas de channel audio !");
    //if(!hasPermission("CONNECT") || !hasPermission("SPEAK")) return message.channel.send("je peux pas accéder au channel audio... Donne moi la permission stp!");
    //if(message.guild.message.me.voiceChannel) return message.channel.send("Je suis déja connecté à un autre salon audio ! :/");

    if (!args[0]) return message.channel.send("Précise un lien YT :)");

    const validate = await ytdl.validateURL(args[0]);
    if (!validate) return message.channel.send("Désolé, mais ton url n'est pas valide :/");


    const info = await ytdl.getInfo(args[0]);
    if (message.member.voiceChannel) {
        const info = await ytdl.getInfo(args[0]);
        const connection = await message.member.voiceChannel.join();
        const dispatcher = await connection.playStream(ytdl(args[0], ), { filter: "audioonly" });
        message.channel.send(`Musique en cours : ${info.title}`);

        //const musique = connection.play(ytdl(args[0], { quality: 'highestaudio' }, { filter : 'audioonly' }));

    } else {
        message.reply('Connecte toi à un salon vocal');
    };


};

module.exports.help = {
    name: "play"
};







/*const Discord = require("discord.js");
 const ytdl = require("ytdl-core");
 const ytdlDiscord = require("ytdl-core-discord");
 const { Util } = require("discord.js");
 
 
 module.exports.run = async(client, message, args) => {
    const { voiceChannel } = message.member;

    
    if (message.member.voiceChannel) {
        //const serverQueue = message.client.queue.get(message.guild.id);
        const songInfo = await ytdl.getInfo(args[0]);
        const song = {
            id: songInfo.video_id,
            title: Util.escapeMarkdown(songInfo.title),
            url: songInfo.video_url
        };

        /*if (serverQueue) {
            serverQueue.songs.push(song);
            return message.channel.send(
             `✅ **${song.title}** est ajoutée à la queue !`
            );
        }*/

/*const queueConstruct = {
            textChannel: message.channel,
            voiceChannel,
            connection: null,
            songs: [],
            volume: 1,
            playing: true
        };
        message.client.queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);

        const play = async song => {
            const queue = message.client.queue.get(message.guild.id);
            if (!song) {
                queue.voiceChannel.leave();
                message.client.queue.delete(message.guild.id);
                return;
            }

            const dispatcher = queue.connection
            .playOpusStream(await ytdlDiscord(song.url), { passes: 3 })
            .on("end", reason => {
            if (reason === "Récupération trop lente !")
            console.log("La musique s'est arrêtée !");
            else console.log(reason);
            queue.songs.shift();
            play(queue.songs[0]);
            })
            .on("error", error => console.error(error));
            dispatcher.setVolumeLogarithmic(queue.volume / 5);
            queue.textChannel.send(`🎶 Commence à jouer: **${song.title}**`);
        };

        try {
            const connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(queueConstruct.songs[0]);
        } catch (error) {
            console.error(`Je n'ai pas pu rejoindre le salon: ${error}`);
            message.client.queue.delete(message.guild.id);
            await voiceChannel.leave();
    
        }
    } else {
        message.reply('Connecte toi à un salon vocal');
    };

};
 
 module.exports.help = {
     name: "play"
};*/