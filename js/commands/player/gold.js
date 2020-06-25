const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "gold",
    category: "player",
    description: "Returns Player Gold Currency",
    run: async (client, message, args) => {
        console.log("--- Running gold ---")
        console.log("--- args : " + args + " ---")
        const embed = new MessageEmbed()
            .setColor("#F0DB4F")
            .setDescription(`Gold: ${Math.floor(Math.random(0, 11) * 10)}`)
            .setFooter(message.author.username)

        message.channel.send(embed)
    }
}