const Discord = require("discord.js");
const color = "#007fff";
const client = new Discord.Client();

module.exports.run = async (client, message, args) => {
  message.delete().catch((O_o) => {});
  const m = await message.channel.send("Ping?");

  var ping = new Discord.MessageEmbed()
    .setTitle("Pong ! ", message.guild.iconURL)
    .setDescription(
      `La lantence du serveur discord est de ${Math.round(client.ws.ping)}ms`
    )
    .setColor(color)
    .setTimestamp();
  message.channel.send(ping);
};
module.exports.help = {
  name: "ping",
};
