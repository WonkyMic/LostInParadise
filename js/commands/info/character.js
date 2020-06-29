const { MessageEmbed } = require("discord.js")
const { getAccountDoc } = require("../../managers/accountManager")
module.exports = {
    name:"cs",
    category: "info",
    description: "Returns Character information",
    run: async (client, message, args) => {
        var doc = await getAccountDoc(message.author.id)
        if(doc.id) {
            // const classesList = doc.classes.map((c) => {[]})
            const embed = new MessageEmbed()
                .setColor("#03AA2E")
                .setTitle(`Character Sheet: ${message.author.username}`)
                .setDescription(`Level ${doc.level} - ${doc.activeClass}`)
                .addFields(
                    { name: 'XP', value: `${doc.xp}/100`, inline: true },
                    { name: 'Gems', value: `${doc.gold}`, inline: true },
                    { name: 'HP', value: `${doc.hp}/${doc.maxHp}`, inline: false },
                    { name: 'Str', value: doc.strength, inline: true },
                    { name: 'Dex', value: doc.dexterity, inline: true },
                    { name: 'Const', value: doc.constitution, inline: true },
                    { name: 'Int', value: doc.intelligence, inline: true },
                    { name: 'Wis', value: doc.wisdom, inline: true },
                    { name: 'Char', value: doc.charisma, inline: true },
                )
                .setFooter("Additional Commands : !actions, !items, !class")

            message.channel.send(embed)
            
        } else {
            message.channel.sent("I fucked up")
        }
    }
}