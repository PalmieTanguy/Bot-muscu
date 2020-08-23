const Discord = require("discord.js");
const color = "#007fff";
const client = new Discord.Client();
const OwnerID = "303971342703919104";

module.exports.run = async (client, message, args) => {
  message.delete();
  if (message.author.id !== OwnerID) {
    return message.channel.send("Permission non accordé");
  }
  console.log("renameALL");
  let i = 0;
  message.guild.members.cache.forEach((user) => {
    try {
      user.setNickname(user.username + " waw");
      console.log(user.username);
    } catch (error) {
      console.log("error n°:" + i);
      i++;
    }
  });
};

module.exports.help = {
  name: "renameAll",
};
