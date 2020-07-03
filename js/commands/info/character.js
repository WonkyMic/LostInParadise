const { charactersheet, hydratingcache } = require('../../data/disco/embeds')
module.exports = {
    name:"cs",
    aliases: ['charactersheet', 'characterSheet', 'Charactersheet', 'CharacterSheet'],
    category: "info",
    description: "Returns Character information",
    run: async (client, message, args) => {
        var doc = await client.lostParadise.getAccountDoc(message.author.id)
        const user = client.users.cache.get(message.author.id)
        if(doc) {
                user.send(charactersheet(message, doc)) // this may cause issues on multiple DMs
        } else {
            user.send(hydratingcache())
        }
    }
}