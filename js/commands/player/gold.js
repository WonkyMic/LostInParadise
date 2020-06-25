const { MessageEmbed } = require("discord.js")
const GoldMiner = require("../../managers/goldminer")
module.exports = {
    name:"gold",
    category: "player",
    description: "Returns Player Gold Currency",
    run: async (client, message, args) => {
        var GM = new GoldMiner(message.author.id)
        var goldDoc = await GM.getGoldDoc()
        if (args.length > 1) {
            if(args[0] == "add") {
                goldDoc.value += args[1]
                goldDoc = GM.upsertGoldDoc(goldDoc)
            }
            if(args[0] == "sub") {
                goldDoc.value -= args[1]
                goldDoc = GM.upsertGoldDoc(goldDoc)
            }
        }
        
        const embed = new MessageEmbed()
            .setColor("#F0DB4F")
            .setDescription(`Gold: ${goldDoc.value}`)
            .setFooter(message.author.username)

        message.channel.send(embed)

        
    }
}