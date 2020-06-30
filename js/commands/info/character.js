const { MessageEmbed } = require("discord.js")
module.exports = {
    name:"cs",
    category: "info",
    description: "Returns Character information",
    run: async (client, message, args) => {
        console.log("---Client.lostParadise.cache", client.lostParadise.cache)
        var doc = await client.lostParadise.getAccountDoc(message.author.id)
        if(doc.id) {
            const embed = new MessageEmbed()
                .setColor("#03AA2E")
                .setTitle(`Character Sheet: ${message.author.username}`)
                .setDescription(`Level: ${doc.level}\nAttunement: ${doc.attunement}\nElements:${doc.elements}`)
                .addFields(
                    { name: 'XP', value: `${doc.xp}/100`, inline: true },
                    { name: 'Gems', value: `${doc.gems}`, inline: true },
                    { name: 'HP', value: `${doc.hp}/${doc.maxHp}`, inline: false },
                    { name: 'Str', value: doc.strength, inline: true },
                    { name: 'Dex', value: doc.dexterity, inline: true },
                    { name: 'Const', value: doc.constitution, inline: true },
                    { name: 'Int', value: doc.intelligence, inline: true },
                    { name: 'Wis', value: doc.wisdom, inline: true },
                    { name: 'Char', value: doc.charisma, inline: true },
                )
                .setFooter("Additional Commands : !actions, !items, !attunement")
            message.channel.send(embed) // this may cause issues on multiple DMs
        } else {
            message.channel.sent("I fucked up")
        }
    }
}