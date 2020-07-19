const { MessageCollector } = require("discord.js")
const AccountDoc = require('../../data/docs/AccountDoc')
const { creationintro, charactersheet, askCharacterType } = require('../../data/disco/embeds')
const { exitingstate } = require('../../data/disco/messages')
const weapons = require('../../data/equipment/weapons')
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
        console.log(`----START`)
        userDM.send(creationintro(client.user.avatarURL)).then(async msg => {
            msg.react('❌')
            msg.react('💪')
            msg.react('🏃')
            msg.react('🤢')
            msg.react('🤔')
            msg.react('✨')
            msg.react('🎼')
            const collector = msg.createReactionCollector((reaction, user) => {
                if (user.id === ogId &&
                    (reaction.emoji.name === '❌' ||
                    reaction.emoji.name === '💪'  ||
                    reaction.emoji.name === '🏃'  ||
                    reaction.emoji.name === '🤢'  ||
                    reaction.emoji.name === '🤔'  ||
                    reaction.emoji.name === '✨'  ||
                    reaction.emoji.name === '🎼'
                    ))
                return reaction
            }, { max:1, time: 30000 })
                .once('collect', reaction => {
                    const chosen = reaction.emoji.name
                    if (chosen === "❌") {
                        collector.stop()
                        userDM.send(exitingstate("Character Creation"))
                        return
                    }
                    const doc = new AccountDoc(ogId)
                    if (chosen === '💪') {
                        collector.stop()
                        doc.attunement = 'Warbringer'
                        doc.weapon = `${weapons.starting.find(w => w.name === 'Broomstick')}`
                        doc.strength += 2
                        doc.dexterity += 1
                        doc.constitution += 1
                        doc.intelligence -= 1
                        doc.wisdom -= 1
                        doc.charisma -= 1

                    } else if (chosen == '🏃') {
                        collector.stop()
                        doc.attunement = 'Assassin'
                        doc.weapon = `${weapons.starting.find(w => w.name === 'Steak knife')}`
                        doc.strength += 1
                        doc.dexterity += 2
                        doc.constitution += 1
                        doc.intelligence -= 1
                        doc.wisdom -= 1
                        doc.charisma -= 1
                    } else if (chosen == '🤢') {
                        collector.stop()
                        doc.attunement = 'Paladin'
                        doc.weapon = `${weapons.starting.find(w => w.name === 'Broomstick')}`
                        doc.strength -= 1
                        doc.dexterity -= 1
                        doc.constitution += 2
                        doc.intelligence -= 1
                        doc.wisdom += 1
                        doc.charisma += 1
                    } else if (chosen == '🤔') {
                        collector.stop()
                        doc.attunement = 'Spellweaver'
                        doc.weapon = `${weapons.starting.find(w => w.name === 'Broomstick')}`
                        doc.strength -= 1
                        doc.dexterity -= 1
                        doc.constitution -= 1
                        doc.intelligence += 2
                        doc.wisdom += 1
                        doc.charisma += 1
                    } else if (chosen == '✨') {
                        collector.stop()
                        doc.attunement = 'Wizard'
                        doc.weapon = `${weapons.starting.find(w => w.name === 'Broomstick')}`
                        doc.strength -= 1
                        doc.dexterity -= 1
                        doc.constitution -= 1
                        doc.intelligence += 1
                        doc.wisdom += 2
                        doc.charisma += 1
                    } else if (chosen == '🎼') {
                        collector.stop()
                        doc.attunement = 'Bard'
                        doc.weapon = `${weapons.starting.find(w => w.name === 'Broomstick')}`
                        doc.strength -= 1
                        doc.dexterity -= 1
                        doc.constitution -= 1
                        doc.intelligence += 1
                        doc.wisdom += 1
                        doc.charisma += 2
                    }
                    // Final Step of Create Character
                    client.lostParadise.upsertAccountDoc(doc)
                    .catch((err) => {console.log(`---Error CreateCharacter:`, err)})
                    userDM.send(charactersheet(message, doc))
                })
        })
    }
}