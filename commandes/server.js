const Discord = require("discord.js");
const { lo } = require("@vitalets/google-translate-api/languages");
const color = "#007fff";
const client = new Discord.Client();
const OwnerID = "303971342703919104";

module.exports.run = async(client, message, args) => {
    message.delete();
    let lstServer = "";
    console.log("liste des servers:");
    if (message.author.id !== OwnerID)
        return message.channel.send("Permission non accordé");
    try {
        client.guilds.cache.forEach((server) => {
            const chan = server.channels.cache.find(
                (channel) => channel.type === "text"
            );
            /*chan
        .createInvite()
        .then((invite) => console.log("create : " + invite.code));
*/
            //console.log(server);
            lstServer += server.name + ": https://discord.gg/";
        });
    } catch (error) {
        console.log("get link server failed");
    }

    /* let result = message.channel
      .createInvite()
      .then((invite) =>
        message.channel.send(
          `Votre lien d'invitation : \n\nhttps://discord.gg/${invite.code}`
        )
      );*/
    //lstServer = lstServer.substring(0, lstServer.length - 2);
    var embed = new Discord.MessageEmbed()
        .setColor("#f38686")
        .setTitle(`**Liste des serveurs: **`)
        .setDescription(lstServer);
    message.channel.send(embed);
};

module.exports.help = {
    name: "server",
};