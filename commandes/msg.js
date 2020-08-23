const Discord = require("discord.js");
const color = "#007fff";
const client = new Discord.Client();
const OwnerID = "303971342703919104";

module.exports.run = async (client, message, args) => {
  if (message.author.id !== OwnerID) {
    message.delete();
  }

  let messUser = message.author.username;
  let messageSplited = message.content.split(" ").slice(1).join(" ");
  console.log(messageSplited);
  let image = message.author.displayAvatarURL();
  var embed = new Discord.MessageEmbed()
    .setColor("#66baea")
    .setTitle(messUser + " send" + ": ")
    .setAuthor(messUser, image)
    .setDescription(messageSplited);
  message.channel.send(embed);
};

module.exports.help = {
  name: "msg",
};
