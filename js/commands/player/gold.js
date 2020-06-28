const { MessageEmbed } = require("discord.js")
const {getGoldDoc, upsertGoldDoc} = require("../../managers/goldminer")
module.exports = {
    name: "gold",
    category: "player",
    description: "Returns Player Gold Currency",
    run: async (client, message, args) => {
        var goldDoc = await getGoldDoc(message.author.id)
        if (args.length > 1) {
            if(args[0] == "add") {
                goldDoc.value = parseInt(goldDoc.value) + parseInt(args[1])
                upsertGoldDoc(goldDoc)
            }
            if(args[0] == "sub") {
                goldDoc.value = parseInt(goldDoc.value) - parseInt(args[1])
                upsertGoldDoc(goldDoc)
            }
        }
        const embed = new MessageEmbed()
            .setColor("#F0DB4F")
            .setDescription(`Gold: ${goldDoc.value}`)
            .setFooter(message.author.username)

        message.channel.send(embed)
    }
}