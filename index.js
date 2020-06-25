const { Client, MessageEmbed, MessageCollector} = require("discord.js")
const { config } = require("dotenv")
const { highLowCommands } = require('./js/commands/highLow.js');

const client = new Client({
    disableEveryone: true
});

config({
    path: __dirname + "/.env"
})

client.on("ready", () => {
    console.log('I am now online, my name is ' + client.user.username)

    client.user.setPresence({
        status: "online",
        game: {
            name: "Under development",
            type: "WATCHING"
        }
    })
});

// Create an event listener for messages
client.on('message', async message => {
    const prefix = "!"
    
    if (message.author.bot) return
    if (!message.guild) return
    if (!message.content.startsWith(prefix)) return

    /* johns additions */
    var results = highLowCommands(message.content)
    if(results){
        message.channel.send(results)
    }
    /* johns additions end here */

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase()

    if (cmd === "ping"){ // Check if content of message is "!ping"
        // message.channel.send("pong!"); // Call .send() on the channel object the message was sent in
        const msg = await message.channel.send('🏓 Pinging....')
                    .catch((error) => {
                        console.log("---ERROR: when pinging", error)
                    })
        
        msg.edit(`🏓 Pong test!\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency is ${Math.round(client.ws.ping)}ms`);
    }

    if (cmd === "gold") {
        const embed = new MessageEmbed()
            .setColor("#F0DB4F")
            .setDescription(`Gold: ${Math.floor(Math.random(0, 11) * 10)}`)
            .setFooter(message.author.username)

        message.channel.send(embed)
    }
});
client.login(process.env.TOKEN)