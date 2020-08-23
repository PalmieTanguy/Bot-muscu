const Discord = require("discord.js");
const color = "#007fff";
const client = new Discord.Client();

module.exports.run = async (client, message, args) => {
  var embed = new Discord.MessageEmbed()
    .setAuthor("Commande Du bot", message.author.displayAvatarURL)
    .setDescription("Prefix du bot $")
    .addFields(
      { name: "$ping", value: "If bot is enable" },
      { name: "$icon", value: "Change icon discord" },
      { name: "$avatar + [mention]", value: "Show avatar" },
      { name: "$msg + [text]", value: "Bot write for you" },
      { name: "$invite", value: "Add bot on other discord" },
      { name: "$play [lien YouTube]", value: "Play song" },
      { name: "$stop", value: "Stop song" },
      { name: "$skip", value: "Skip the song" },
      {
        name: "just send a message",
        value: "translate in the other channel with the language different",
      }
    );
  message.channel.send(embed); //message.author.username
};

module.exports.help = {
  name: "help",
};
