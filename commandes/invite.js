const Discord = require("discord.js");
const color = "#007fff";
const client = new Discord.Client();

module.exports.run = async (client, message, args) => {
  //message.delete();
  let lienDiscord = `https://discord.com/oauth2/authorize?client_id=460120317998661634&permissions=8&scope=bot`;

  message.channel.send(lienDiscord);
};

module.exports.help = {
  name: "invite",
};
