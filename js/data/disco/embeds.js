const { MessageEmbed } = require("discord.js")
module.exports = {
    charactersheet(message, doc) {
        return new MessageEmbed()
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
    },
    hydratingcache() {
        return "...Hydrating Cache/No Character..."
    },
    bank(message, doc) {
        return new MessageEmbed()
        .setColor("#F0DB4F")
        .setTitle(`Bank: ${message.author.username}`)
        .setDescription(`Gems: ${doc.gems}`)
        .setFooter("Additional Commands: !gamble, !market, !insurance")
    },
    creationintro(avatarURL){
        return {embed: {
            color: 3447003,
            author: {
              icon_url: avatarURL
            },
            title: "Character Creation",
            description: "Welcome to Lost Paradise!",
            fields: [{
                name: "⚠️ Confirmation Requested ⚠️",
                value: "If you have an existing character it will be destroyed. Are you sure?"
              }
            ]
          }}
    }
}