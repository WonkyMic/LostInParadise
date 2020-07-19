const { charactersheet, hydratingcache } = require("../../data/disco/embeds")
module.exports = {
    name: "actions",
    aliases: ['act', 'a'],
    category: "player",
    description: "Returns Player Actions",
    run: async (client, message, args) => {
        var doc = await client.lostParadise.getAccountDoc(message.author.id)
        if(doc){
            if (doc.type == "physical") {
                message.channel.send("Physical attacks")
            } else if (doc.type = "magical") {
                message.channel.send("Magical attacks")
            }

            if (args.length > 1) {
                if(args[0] == "add" || args[0] == "a") {
                    doc.gems = parseInt(doc.gems) + parseInt(args[1])
                    client.lostParadise.upsertAccountDoc(doc)
                            .catch((er) => console.log(`---ERROR: addGems args:${args}\nError:`, er))
                }
            }
            message.channel.send(charactersheet(message, doc))
        } else {
            message.channel.send(hydratingcache())
        }
    }
}