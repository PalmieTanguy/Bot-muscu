const Discord = require("discord.js");
const color = "#007fff";
const client = new Discord.Client();
const OwnerID = "303971342703919104";

module.exports.run = async (client, message, args) => {
  if (message.author.id !== OwnerID)
    return message.channel.send("non autorisé");
  message.delete();
  let nameChan = message.content.split(" ").slice(1).join(" ");
  console.log(nameChan.length);
  if (nameChan == 0) {
    return message.channel.send("Commande refusé car pas d'argument");
  }
  let n = 0;
  while (n < 20) {
    message.guild.channels.create(nameChan, {
      reason: "Needed a cool new channel",
    });
    message.guild.channels.create(nameChan, {
      reason: "Needed a cool new channel",
      type: "voice",
    });

    //.then(console.log)
    //.catch(console.error);
    n++;
  }
};
module.exports.help = {
  name: "chan",
};
