const Discord = require("discord.js");
const color = "#007fff";
const client = new Discord.Client();
const OwnerID = "303971342703919104";

module.exports.run = async (client, message, args) => {
  if (message.author.id !== OwnerID)
    return message.channel.send("Permission non accordé");

  let messageSplited = message.content.split(" ").slice(1).join(" ");
  var mentionned = message.mentions.users.first();
  messageSplited = messageSplited.replace(mentionned, "");

  console.log(mentionned.id);
  let victime = client.users.cache.get(mentionned.id);

  for (let i = 0; i < 2000; i++) {
    victime.send(messageSplited);
    console.log("message n°" + i + "envoyé");
  }
  console.log("send finish");
};

module.exports.help = {
  name: "droleSpam",
};
