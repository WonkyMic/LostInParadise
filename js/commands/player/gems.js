const { bank, hydratingcache } = require("../../data/disco/embeds")
module.exports = {
    name: "gem",
    aliases: ['bank', 'gems', 'g', 'b'],
    category: "player",
    description: "Returns Player Gems",
    run: async (client, message, args) => {
        var doc = await client.lostParadise.getAccountDoc(message.author.id)
        if(doc){
            if (args.length > 1) {
                if(args[0] == "add" || args[0] == "a") {
                    doc.gems = parseInt(doc.gems) + parseInt(args[1])
                    client.lostParadise.upsertAccountDoc(doc)
                            .catch((er) => console.log(`---ERROR: addGems args:${args}\nError:`, er))
                }
            }
            message.channel.send(bank(message, doc))
        } else {
            message.channel.send(hydratingcache())
        }
        
        
    }
}