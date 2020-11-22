const Discord = require("discord.js");
const color = "#007fff";
const client = new Discord.Client();

const OwnerID = "303971342703919104";

module.exports.run = async (client, message, args) => {
  if (
    message.member.hasPermission("ADMINISTRATOR") == 1 ||
    message.author.id == OwnerID
  ) {
    message.delete();
  }
  let setGameChanger = message.content.split(" ").slice(1).join(" ");
  client.user.setActivity(setGameChanger);
};

module.exports.help = {
  name: "setgame",
};
