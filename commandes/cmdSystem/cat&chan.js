module.exports = {
    run: function(message) {
        let nameCat = "xdemon";
        let nameText = "kolowy";
        let category = message.guild.channels.cache.find(c => c.name == nameCat && c.type == "category")
        let channel = message.guild.channels.cache.find(c => c.name == nameText && c.type == "text");

        if (!!category == false) {
            message.guild.channels.create(nameCat, {
                type: 'category',
                permissionOverwrites: [{
                    id: message.author.id,
                    deny: ['VIEW_CHANNEL'],
                }, ],
            })
            message.reply("creation de la catégorie demandé")

        }
        if (!!channel == false) {
            message.guild.channels.create(nameText, {
                type: 'text',
                permissionOverwrites: [{
                    id: message.author.id,
                    deny: ['VIEW_CHANNEL'],
                }, ],
            })
            message.reply("creation du salon demandé")
        }
        category = message.guild.channels.cache.find(c => c.name == nameCat && c.type == "category");
        channel = message.guild.channels.cache.find(c => c.name == nameText && c.type == "text");
        if (category && channel) {
            channel.setParent(category.id).then(message.reply("Fusion de la categorie et du salon"))

        } else console.error(`One of the channels is missing:\nCategory: ${!!category}\nChannel: ${!!channel}`);
    }
}