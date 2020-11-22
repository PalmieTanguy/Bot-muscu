const Discord = require("discord.js");
const color = "#007fff";
const client = new Discord.Client();
var Request = require("request");

const OwnerID = "303971342703919104";

module.exports.run = async(client, message, args) => {
    Request.get("http://localhost/apiWildRift/heros/heros.php", (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
        console.dir(JSON.parse(body));
        body = JSON.parse(body);
        message.reply(body)
    });
};

module.exports.help = {
    name: "heros",
};