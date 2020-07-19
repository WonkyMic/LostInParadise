const { charactersheet, hydratingcache, equipped } = require('../../data/disco/embeds')
module.exports = {
    name:"cs",
    aliases: ['charactersheet', 'characterSheet', 'Charactersheet', 'CharacterSheet'],
    category: "info",
    description: "Returns Character information",
    run: async (client, message, args) => {
        var doc = await client.lostParadise.getAccountDoc(message.author.id)
        const user = client.users.cache.get(message.author.id)
        if(doc) {
            if (args.length > 0) {
                if(args[0] == "display" || args[0] == "d") {
                    console.log("---!CS Display")
                    message.channel.send(charactersheet(message, doc))
                    message.channel.send(equipped(message, doc))
                }
            } else {
                console.log("---!cs")
                user.send(charactersheet(message, doc)) // this may cause issues on multiple DMs
            }
        } else {
            user.send(hydratingcache())
        }
    }
}