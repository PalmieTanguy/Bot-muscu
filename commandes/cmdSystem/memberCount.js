module.exports = {
    run: function(client) {
        const guild = client.guilds.cache.get("752812593961369641");
        console.log('nb:' + guild.memberCount)
        var memberCount = guild.memberCount;
        var channel = client.channels.cache.get("780967477919481906");
        // channel.setName(memberCount + " members").catch(e => console.table(e));
    }
}