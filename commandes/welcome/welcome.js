/*const Canvas = require("canvas");
const Discord = require("discord.js");
const client = new Discord.Client();
const color = "#270327";

module.exports.run = async(client, member, welcomeText) => {
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
    ctx.fillStyle = "#030024";
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
    ctx.drawImage(avatarInfo, 10, 10, 200, 200);
    const attachment = new Discord.MessageAttachment(
        canvas.toBuffer(),
        "welcome-image.png"
    );
    console.log("New member !");
    console.log(member.id);
    //let sendMp = client.users.cache.get(member.id);

    let longText = welcomeText;

    var embed = new Discord.MessageEmbed()
        .setColor(color)
        .setDescription(longText);
    //sendMp.send(embed);
    channel.send(`Welcome to the server, ${member}!`, attachment);

}*/