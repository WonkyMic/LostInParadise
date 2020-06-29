const { MessageEmbed } = require("discord.js")
const { getAccountDoc, upsertAccountDoc } = require("../../managers/accountManager")
const { addGems } = require("../../managers/gemMiner")
module.exports = {
    name: "gem",
    aliases: ['bank', 'gems', 'g', 'b'],
    category: "player",
    description: "Returns Player Gems",
    run: async (client, message, args) => {
        var doc = await getAccountDoc(message.author.id).then(_ => {
            console.log("---Object: " , _)
            return obj
        })
        console.log("---Doc ", doc)
        if (args.length > 1) {
            if(args[0] == "add") {
                doc = await addGems(doc, args[1])
                            .catch((er) => console.log(`---ERROR: addGems args:${args}\nError:`, er))
            }
        }
        console.log("---Doc0 ", doc)
        const embed = new MessageEmbed()
            .setColor("#F0DB4F")
            .setTitle(`Bank: ${message.author.username}`)
            .setDescription(`Gems: ${doc.gems}`)
            .setFooter("Additional Commands: !gamble, !market, !insurance")

        message.channel.send(embed)
    }
}