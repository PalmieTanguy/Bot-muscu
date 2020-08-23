const Discord = require("discord.js");
const client = new Discord.Client();
const OwnerID = "303971342703919104";

module.exports.run = async (client, message, args) => {
  if (
    message.member.hasPermission("ADMINISTRATOR") == 0 ||
    message.author.id !== OwnerID
  )
    return message.channel.send("Permission non accordé");
  message.delete();
  let nameChanger = message.content.split(" ").slice(1).join(" ");
  console.log("Name ServerGuild change in: " + nameChanger);
  message.guild.setName(nameChanger);
};

module.exports.help = {
  name: "name",
};
