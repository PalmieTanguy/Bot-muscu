const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require("./config");
const translate = require("@vitalets/google-translate-api");
const Canvas = require("canvas");
const fs = require("fs");
const ytdl = require("ytdl-core");

//lst channel
const listedChannels = [];

const prefix = settings.Prefix;
const login = settings.Token_Bot;
const OwnerID = settings.OwnerID;
const prefixOther = settings.prefixOther;
const welcomeText = settings.welcome;
client.commands = new Discord.Collection();
const queue = new Map();
const color = "#270327";

client.login(login);

//call commandes
fs.readdir("./Commandes/", (error, f) => {
  if (error) console.log(error);
  let commandes = f.filter((f) => f.split(".").pop() === "js");
  if (commandes.length <= 0) return console.log("Aucune commande trouvée !");

  commandes.forEach((f) => {
    let commande = require(`./Commandes/${f}`);
    console.log(`${f} commande chargée !`);

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

//canvas WELCOME USERS
//param canvas
const applyText = (canvas, text) => {
  const ctx = canvas.getContext("2d");

  // Declare a base size of the font
  let fontSize = 85;
  do {
    // Assign the font to the context and decrement it so it can be measured again
    ctx.font = `${(fontSize -= 10)}px infected`;
    // Compare pixel width of the text to the canvas minus the approximate avatarInfo size
  } while (ctx.measureText(text).width > canvas.width - 300);

  // Return the result to use in the actual canvas
  return ctx.font;
};
client.on("guildMemberAdd", async (member) => {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === "welcome"
  );
  if (!channel) return;

  const canvas = Canvas.createCanvas(1200, 480);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage("./welcome.jpg");
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#000000";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Slightly smaller text placed above the member's display name
  ctx.font = "80px infected";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Welcome ", canvas.width / 5, canvas.height / 2.5);
  // Add an exclamation point here and below
  ctx.font = applyText(canvas, `${member.displayName}!`);
  ctx.fillStyle = "#ffffff";
  ctx.fillText(
    `${member.displayName} !`,
    canvas.width / 7,
    canvas.height / 1.7
  );

  ctx.beginPath();
  ctx.arc(110, 110, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  const avatarInfo = await Canvas.loadImage(
    member.user.displayAvatarURL({ format: "jpg" })
  );
  ctx.drawImage(avatar, 10, 10, 200, 200);
  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "welcome-image.png"
  );
  console.log("New member !");
  channel.send(`Welcome to the server, ${member}!`, attachment);
  console.log(member.id);
  let sendMp = client.users.cache.get(member.id);

  let longText = welcomeText;

  var embed = new Discord.MessageEmbed()
    .setColor(color)
    .setDescription(longText);
  sendMp.send(embed);
});

//bot
client.on("ready", function () {
  console.log(`--> Bot Name : [ ${client.user.tag} ]`);
  console.log(`--> Préfix actuel :       [ ${prefix} ]`);
  client.user.setActivity("Activation = " + prefix + "help");
  client.user.setPresence({
    status: "invisible",
    activity: {
      name: "with depression",
      type: "STREAMING",
      url: "https://www.twitch.tv/monstercat",
    },
  });
});
/*online
idle
dnd
invisible
*/

//music
async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
    title: songInfo.title,
    url: songInfo.video_url,
  };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true,
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      //console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} has been added to the queue!`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  if (!serverQueue)
    return message.channel.send("There is no song that I could skip!");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  console.log("stop: " + serverQueue.songs[0].title);
  message.channel.send(`Stop playing: ** ${serverQueue.songs[0].title} **`);

  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    });
  //.on("error", (error) => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 8);
  serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}
//message for bot
client.on("message", (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(`${prefix}play`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}skip`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}stop`)) {
    stop(message, serverQueue);
    return;
  }

  //if prefixOther bot = return
  if (!message.content.startsWith(prefix)) {
    console.log(message.content);
    let botO = false;
    prefixOther.forEach((p) => {
      if (message.content.startsWith(p)) {
        console.log("stop");
        botO = true;
      }
    });
    if (botO == true) {
      return;
    }
    //declare
    let chanName = message.channel.name;
    let messUser = message.author.username;
    let langage = null;
    let lang = null;
    let server = message.guild;
    let catLang;

    mylang = chanName.substring(chanName.length - 2, chanName.length);
    console.log(mylang);
    if (mylang == "en") {
      langage = "french";
      lang = "send the message in english";
      catLang = "fr";
      catlangFrom = "en";
    } else if (mylang == "fr") {
      langage = "english";
      lang = "a envoyé le message en français";
      catLang = "en";
      catlangFrom = "fr";
    }
    console.log("In: " + chanName);

    chanName = chanName.substring(0, chanName.length - 2) + catLang;

    let chanServer = server.channels.cache.find(
      (c) => c.name == chanName && c.type == "text"
    );
    if (!chanServer) {
      return;
    }
    console.log("Out: " + chanName);

    //let text = message.content.substring(1, message.content.length);
    text = message.content;
    translate(text, {
      to: translate.languages.getCode(langage),
      from: catlangFrom,
    }).then((res) => {
      console.log("test : " + res.text);
      text = res.text.replace("<@! ", "<@!");
      text = text.replace("<# ", "<#");
      text = text.replace(" @!>", "@!>");
      console.log("test : " + res.text);

      //embed
      let image = message.author.displayAvatarURL();
      var embed = new Discord.MessageEmbed()
        .setColor("#270327")
        .setTitle(messUser + " " + lang + ": ")
        .setAuthor(messUser, image)
        .setDescription(text);
      client.channels.cache.get(chanServer.id).send(embed);
    });
  }
});
