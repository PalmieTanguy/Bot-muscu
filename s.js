const { MESSAGES } = require("../../util/constants");
const { MessageEmbed, RichEmbed } = require("discord.js")
const { stripIndents } = require("common-tags");
const fetch = require("node-fetch");

module.exports.run = async(bot, message, args) => {
    const name = args.join(" ");
    if (!name) {
        let reportEmbed = new Discord.MessageEmbed()
            .setTitle("Error", message.guild.iconURL)
            .setDescription(" ")
            .setColor("#ff0000")
            .addField("Reason:", "Parameter [user] please.")
            .setTimestamp()
        message.channel.send(reportEmbed);
    }
    const url = `https://instagram.com/${name}/?__a=1`;
    let res;

    try {
        res = await fetch(url).then(url => url.json());
    } catch (e) {
        let reportEmbed = new MessageEmbed()
            .setTitle("Error", message.guild.iconURL)
            .setDescription(" ")
            .setColor("#ff0000")
            .addField("Reason:", "Couldn't find this account...")
            .setTimestamp()
        message.channel.send(reportEmbed);
    }

    console.log(res)

    const account = res.graphql.user;
    const embed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle(account.full_name)
        .setURL(`https://instagram.com/${name}`)
        .setThumbnail(account.profile_pic_url_hd)
        .addField("Profile information", stripIndents `**- Username:** ${account.username}
            - Full name: ${account.full_name}
            - Biography: ${account.biography.length == 0 ? "none" : account.biography}
            - Posts: ${account.edge_owner_to_timeline_media.count}
            - Followers: ${account.edge_followed_by.count}
            - Following: ${account.edge_follow.count}
            - Private account: ${account.is_private ? "Yes 🔐" : "Nope 🔓"}`)
        .setTimestamp();
    message.channel.send(embed);
}

module.exports.help = {
    name: "insta"
};


module.exports.help = MESSAGES.COMMANDS.CONNECTIONS.INSTA;