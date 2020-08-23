const Discord = require("discord.js");
const color = "#007fff";
const client = new Discord.Client();
const OwnerID = "303971342703919104";

module.exports.run = async (client, message, args) => {
  if (
    message.member.hasPermission("ADMINISTRATOR") == 0 ||
    message.author.id !== OwnerID
  )
    return message.channel.send("Permission non accordé");
  message.delete();

  message.guild.members.cache.forEach((member) => {
    var embed = new Discord.MessageEmbed()
      .setColor("#f38686")
      .setDescription(`**Le serveur ${message.guild.name} , quitte pas ng !**`)
      .setImage(
        "https://jardinage.lemonde.fr/images/dossiers/historique/tournesol-175148.jpg"
      );
    try {
      member.send(embed);
    } catch (error) {
      //console.error(error);
    }
  });
};

module.exports.help = {
  name: "mp",
};
