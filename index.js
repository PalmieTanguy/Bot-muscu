const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require("./config");
const fs = require("fs");
const trad = require("./commandes/traduction/traduction");
//const welcome = require("./commandes/welcome/welcome")
//const memberCount = require("./commandes/cmdSystem/memberCount")
const catchan = require("./commandes/cmdSystem/cat&chan")
    //lst channel

const { MessageAttachment } = require('discord.js')
const nodeHtmlToImage = require('node-html-to-image')

const prefix = settings.Prefix;
const login = settings.Token_Bot;
const prefixOther = settings.prefixOther;
//const welcomeText = settings.welcome;
client.commands = new Discord.Collection();

client.login(login);

//call commandes
let commandesM = [];
let commandes = [];

fs.readdir("./commandes/Music", (error, f) => {
    if (error) console.log(error);

    f.forEach((f) => {
        if (f.split(".").pop() === "js") {
            commandesM.push(f);
        }
    });
    if (commandesM.length <= 0) return console.log("Aucune commande trouvée !");

    commandesM.forEach((f) => {
        let commande = require(`./commandes/Music/${f}`);
        console.table(`${f} load!`);
        client.commands.set(commande.help.name, commande);
    });
});

fs.readdir("./Commandes/", (error, f) => {
    if (error) console.log(error);
    //let commandes = f.filter((f) => f.split(".").pop() === "js");
    f.forEach((f) => {
        if (f.split(".").pop() === "js") {
            commandes.push(f);
        }
    });
    if (commandes.length <= 0) return console.log("Aucune commande trouvée !");

    commandes.forEach((f) => {
        let commande = require(`./Commandes/${f}`);
        console.table(`${f} commande chargée !`);

        client.commands.set(commande.help.name, commande);
    });
});

//call Event message
fs.readdir("./Event/", (error, f) => {
    if (error) console.log(error);
    console.log(`${f.length} events en chargement`);

    f.forEach((f) => {
        const events = require(`./Event/${f}`);
        const event = f.split(".")[0];

        client.on(event, events.bind(null, client));
    });
});

client.on("guildMemberAdd", async(member) => {
    console.log("COME")
        //welcome.run(client, member, welcomeText).then();
        //memberCount.run(client)
});

client.on("guildMemberRemove", (member) => {
    console.log("QUIT")
        //memberCount.run(client)
});


//bot
client.on("ready", function() {
    //memberCount.run(client)

    console.log(`--> Bot Name : [ ${client.user.tag} ]`);
    console.log(`--> Préfix actuel :       [ ${prefix} ]`);
    client.user.setActivity("Activation = " + prefix + "help");
    client.user.setPresence({
        activity: {
            name: "se muscler | $help",
            type: "PLAYING",
        },
    });

});
/*online
idle
dnd
invisible
*/
//message for bot
client.on("message", async(message) => {

    if (message.author.bot) return;
    // let t = trad.trad(message, client, prefix, prefixOther, Discord);

    if (message.content == "$o")
        message.channel.send(message.guild.iconURL().replace("webp", "png"));

    /*if (message.content == "$memberCount") {
        message.guild.channels.create(message.guild.memberCount.toString(), {
            type: 'text',
            permissionOverwrites: [{
                id: message.author.id,
                deny: ['VIEW_CHANNEL'],
            }, ],
        })
    }*/

    //console.log(message.guild.ownerID)
    if (message.content == "$users") {
        catchan.run(message)
    }

    if (message.content.startsWith("$waw")) {
        //  htmlToPng.js
        let users = message.mentions.members.first();
        if (!users) {
            users = message.author.username;
        } else {
            users = message.mentions.members.first().user.username;
        }

        const _htmlTemplate = `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <style>
      body {
        font-family: "Poppins", Arial, Helvetica, sans-serif;
        background-image: linear-gradient(to right, #b3a6ee 0%, #e3a6ee 51%, #b10180 100%);
        color: #fff;
        max-width: 300px;
      }

      .app {
        max-width: 300px;
        padding: 20px;
        display: flex;
        flex-direction: row;
        border-top: 3px solid #20272F;
        background-image: linear-gradient(to right, #b3a6ee 0%, #e3a6ee 51%, #b10180 100%);
        align-items: center;
      }

      img {
        width: 50px;
        height: 50px;
        margin-right: 20px;
        border-radius: 50%;
        border: 1px solid #fff;
        padding: 5px;
      }
    </style>
  </head>
  <body>
    <div class="app">
      <img src="https://avatars.dicebear.com/4.5/api/avataaars/${users}.svg" />

      <h4>Welcome ${users}</h4>
    </div>
  </body>
</html>
`
        const images = await nodeHtmlToImage({
                html: _htmlTemplate,
                quality: 100,
                type: 'jpeg',
                puppeteerArgs: {
                    args: ['--no-sandbox'],
                },
                encoding: 'buffer',
            })
            // for more configuration options refer to the library
        return message.channel.send(new MessageAttachment(images, `users.jpeg`))

    }

})