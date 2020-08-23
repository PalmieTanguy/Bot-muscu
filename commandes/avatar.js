const Discord = require("discord.js");
const color = "#007fff";
const client = new Discord.Client();

module.exports.run = async (client, message, args) => {
  var mentionned = message.mentions.users.first();
  if (mentionned) {
    var autheur = mentionned;
  } else {
    var autheur = message.author;
  }
  let image = autheur.displayAvatarURL();
  image = image.replace("webp", "png");

  var embed = new Discord.MessageEmbed()
    .setAuthor(autheur.username)
    .setImage(image + "?size=2048")
    .setColor("#66baea");

  message.channel.send(embed);
};

module.exports.help = {
  name: "avatar",
};
