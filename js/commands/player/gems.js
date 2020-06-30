const { MessageEmbed } = require("discord.js")
// const { getAccountDoc, upsertAccountDoc } = require("../../managers/accountManager")
const AccountManager = require("../../managers/AccountManager")
// const { addGems } = require("../../managers/gemMiner")
module.exports = {
    name: "gem",
    aliases: ['bank', 'gems', 'g', 'b'],
    category: "player",
    description: "Returns Player Gems",
    run: async (client, message, args) => {
        var doc = await client.lostParadise.getAccountDoc(message.author.id)
        if (args.length > 1) {
            if(args[0] == "add") {
                doc.gems = parseInt(doc.gems) + parseInt(args[1])
                client.lostParadise.upsertAccountDoc(doc)
                        .catch((er) => console.log(`---ERROR: addGems args:${args}\nError:`, er))
            }
        }
        
        const embed = new MessageEmbed()
            .setColor("#F0DB4F")
            .setTitle(`Bank: ${message.author.username}`)
            .setDescription(`Gems: ${doc.gems}`)
            .setFooter("Additional Commands: !gamble, !market, !insurance")

        message.channel.send(embed)
    }
}