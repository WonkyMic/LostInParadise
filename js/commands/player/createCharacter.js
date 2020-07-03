const { MessageCollector } = require("discord.js")
const AccountDoc = require('../../data/docs/AccountDoc')
const { creationintro, charactersheet } = require('../../data/disco/embeds')
const { exitingstate } = require('../../data/disco/messages')
module.exports = {
    name:"create",
    aliases: ['start'],
    category: "player",
    description: "Character creation",
    run: async (client, message, args) => {
        const ogId = message.author.id
        const userDM = client.users.cache.get(message.author.id)
        userDM.send(creationintro(client.user.avatarURL)).then(async msg => {
            msg.react('✅')
            msg.react('❌')
            const collector = msg.createReactionCollector((reaction, user) => {
                if (user.id === ogId &&
                    (reaction.emoji.name === '✅' ||
                    reaction.emoji.name === '❌'))
                return reaction
            }, { max:3, time: 10000 })
                .once('collect', reaction => {
                    const chosen = reaction.emoji.name
                    if (chosen === '✅') {
                        collector.stop()
                        const doc = new AccountDoc(ogId)
                        client.lostParadise.upsertAccountDoc(doc)
                        .catch((err) => {console.log(`---Error CreateCharacter:`, err)})
                        message.channel.send(charactersheet(message, doc))
                    } else if (chosen === "❌") {
                        collector.stop()
                        message.channel.send(exitingstate("Character Creation"))
                    }
                })
        })
    }
}