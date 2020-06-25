const { Client, MessageEmbed, MessageCollector } = require("discord.js")
const { config } = require("dotenv")

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
client.on('message', message => {
    if(message.author.bot) return;
    // If the message is "what is my avatar"
    if (message.content === '>my avatar') {
      // Send the user's avatar URL
      message.reply(message.author.displayAvatarURL());
    }
    if (message.content === '>how to embed') {
        // We can create embeds using the MessageEmbed constructor
        // Read more about all that you can do with the constructor
        // over at https://discord.js.org/#/docs/main/master/class/MessageEmbed
        const embed = new MessageEmbed()
          // Set the title of the field
          .setTitle('A slick little embed')
          // Set the color of the embed
          .setColor(0xff0000)
          // Set the main content of the embed
          .setDescription('Hello, this is a slick embed!');
        // Send the embed to the same channel as the message
        message.channel.send(embed);
    }

    if(message.content == ">ping"){ // Check if content of message is ">ping"
		message.channel.send("pong!"); // Call .send() on the channel object the message was sent in
    }
    if(message.content == ">react"){ // Check if content of message is ">react"
        message.react("🤔")
    }
    if(message.content.includes(">roll")) {
        const content = message.content
        let contentArray = []
        if(content.includes("d"))
        {
            contentArray = content.split(" ")
        
            console.log(contentArray)
            const rollNumbers = contentArray[1].split("d")
            console.log(rollNumbers)
            let rollResults = []
            for(var i = 0; i <= parseInt(rollNumbers[0]) - 1; i++) {
                rollResults.push(Math.floor(Math.random() * parseInt(rollNumbers[1])) + 1)
            }
            console.log(rollResults)
            let rollTotal = 0
            for(var i = 0; i < rollResults.length; i++){
                rollTotal += rollResults[i]
            }
            message.channel.send("Your results are as follows:\n\n" + rollResults + "\n\nTotal: " + rollTotal)
        }
        else
    }
    if(message.content == ">collect") {
        message.channel.send("bot is collecting messages now...")
        let filter = m => m.author.equals(message.author)
        let msgConnector = new MessageCollector(message.channel, filter, 100)
        msgConnector.on('collect', m => console.log('Collected: ' + m.content))
        const guildId = message.channel.guild.id
        var authorId = message.author.id
        client.guilds.cache.get(guildId).channels.cache.forEach(ch => {
            if(ch.type === 'text'){
                ch.messages.fetch({
                    limit:100
                }).then(messages => {
                    const mgs = messages.filter(m => m.author.id === authorId)
                    mgs.forEach(m => {
                        console.log('Content: ' + m.content + ' - Channel: ' + m.channel.name)
                    })
                })
            }
        })
        message.channel.send("bot is exiting collecting now...")
    }
    
});

client.login(process.env.TOKEN)