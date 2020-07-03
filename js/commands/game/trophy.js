const { MessageEmbed } = require("discord.js")
// const { getGoldDoc, upsertGoldDoc } = require("../../managers/goldminer")

module.exports = {
    name: "trophy",
    category: "game",
    description: "Allows you to spend gold on getting a trophy",
    run: async (client, message, args) => {

        function errorWarning() {
            const errMsg = new MessageEmbed()
                .setColor("#FF0000")
                .setDescription(somethingWentWrong)
            message.channel.send(errMsg)
        }

        var trophyCost = 100;
        var samePerson = false;
        function removeTrophy(user) {
            if (user.nickname != null && user.nickname != undefined) {
                if (user.nickname.includes("🏆")) {
                    if (user.id == message.author.id) {
                        samePerson = true;
                    }
                    else {
                    user.setNickname(user.nickname.replace(/🏆/g, ""));
                    }
                }
            }
        }

        function addTrophy(user) {
            if (user != message.author) {
                if (user.nickname == null || user.nickname == undefined) {
                    console.log("nickname was undefined or null");
                    user.setNickname(user.displayName + "🏆").then(message.channel.send(user.displayName + "🏆" + " now has the trophy!"));
                } else {
                    user.setNickname(user.nickname + "🏆").then(message.channel.send(user.nickname + " now has the trophy!"));
                }
            }
        }

        if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) {
            message.channel.send('I don\'t have permission to change your nickname!');
            return
        }
        message.guild.members.cache.map(member => currentTrophyUser = removeTrophy(member));
        if (samePerson) {
            message.channel.send('You already have the trophy!');
            return
        }
        message.guild.members.fetch();
        msgMember = message.guild.members.cache.get(message.member.id);
        console.log(msgMember.nickname)
        addTrophy(msgMember);
        // var goldDoc = await getGoldDoc(message.author.id)
        // goldDoc.value = parseInt(goldDoc.value) - parseInt(trophyCost)
        // upsertGoldDoc(goldDoc)
        var doc = await client.lostParadise.getAccountDoc(message.author.id)
        doc.value = parseInt(doc.value) - parseInt(trophyCost)
        client.lostParadise.upsertAccountDoc(doc)
            .catch((er) => console.log(`---ERROR: trophy args:${args}\nError:`, er))

        //errorWarning()
    }
}