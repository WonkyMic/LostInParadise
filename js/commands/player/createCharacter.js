const { MessageCollector } = require("discord.js")
const AccountDoc = require('../../data/docs/AccountDoc')
const { creationintro, charactersheet, askCharacterType } = require('../../data/disco/embeds')
const { exitingstate } = require('../../data/disco/messages')
const { lp_physical, lp_magical } = require("../../data/disco/emotes/attunements")
module.exports = {
    name:"create",
    aliases: ['start'],
    category: "player",
    description: "Character creation",
    run: async (client, message, args) => {
        const ogId = message.author.id
        const userDM = client.users.cache.get(message.author.id)
        const characterType = 'physical'
        const characterAttunement = 'Basic'
        // Commenting to test Emojis on server vs DMs
        // userDM.send(creationintro(client.user.avatarURL)).then(async msg => {
        message.channel.send(creationintro(client.user.avatarURL)).then(async msg => {
            msg.react('✅')
            msg.react('❌')
            const collector = msg.createReactionCollector((reaction, user) => {
                if (user.id === ogId &&
                    (reaction.emoji.name === '✅' ||
                    reaction.emoji.name === '❌'))
                return reaction
            }, { max:1, time: 10000 })
                .once('collect', reaction => {
                    const chosen = reaction.emoji.name
                    if (chosen === '✅') {
                        collector.stop()
                        // Attunement Request
                        message.channel.send(askCharacterType()).then(async typeMsg => {
                            typeMsg.react(`728699747820634153`)
                            typeMsg.react(`728699997612146759`)
                            const tpyeCollector = typeMsg.createReactionCollector((reaction, user) => {
                                if (user.id === ogId && (reaction.emoji.name === 'lp_physical' || reaction.emoji.name === 'lp_magical')) return reaction
                            }, { max:1, time: 10000 })
                                .once('collect', typereaction => {
                                    const chosenType = typereaction.emoji.name
                                    console.log("---ChosenType :: " + chosenType)
                                    const doc = new AccountDoc(ogId)
                                    if (chosenType == 'lp_physical') {
                                        collector.stop()
                                        doc.type = 'physcial'
                                        doc.attunement = 'Fighter'
                                        doc.strength += 1
                                        doc.dexterity += 1
                                        doc.constitution += 1
                                        doc.intelligence -= 1
                                        doc.wisdom -= 1
                                        doc.charisma -= 1

                                    } else if (chosenType == 'lp_magical') {
                                        collector.stop()
                                        doc.type = 'magical'
                                        doc.attunement = 'Spell Caster'
                                        doc.strength -= 1
                                        doc.dexterity -= 1
                                        doc.constitution -= 1
                                        doc.intelligence += 1
                                        doc.wisdom += 1
                                        doc.charisma += 1
                                    }
                                    // Final Step of Create Character
                                    client.lostParadise.upsertAccountDoc(doc)
                                    .catch((err) => {console.log(`---Error CreateCharacter:`, err)})
                                    message.channel.send(charactersheet(message, doc))  
                                })
                        })
                    } else if (chosen === "❌") {
                        collector.stop()
                        message.channel.send(exitingstate("Character Creation"))
                    }
                })
        })
    }
}