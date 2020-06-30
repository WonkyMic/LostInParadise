const { Client, Collection} = require("discord.js")
const { config } = require("dotenv")
const { readdirSync } = require('fs')
const AccountManager = require('./js/managers/AccountManager')

const client = new Client({
    disableEveryone: true
});

const PROD_CHANNEL = "bot-dev"
const TEST_CHANNEL = "bot-test-channel"

// const ACTIVE_CHANNEL = PROD_CHANNEL
// client.gameENV = "PROD"
const ACTIVE_CHANNEL = TEST_CHANNEL
client.gameENV = "TEST"


client.commands = new Collection()
client.aliases = new Collection()
client.lostParadise = new AccountManager(client)

config({
    path: __dirname + "/.env"
})
readdirSync("./js/handler/").forEach(handler => {
    require(`./js/handler/${handler}`)(client)
})

client.on("ready", () => {
    console.log('I am now online, my name is ' + client.user.username)

    //todo fixme
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
    const prefix = ">"
    
    if (message.author.bot) return
    // if (!message.guild) return
    if (!message.content.startsWith(prefix)) return
    // if (!message.member) message.member = await message.guild.fetchMember(message)
    const channelName = message.channel.name
    const channelType = message.channel.type
    if (channelType!== "dm" && channelName !== ACTIVE_CHANNEL){return}

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase()

    if (cmd.length === 0) return

    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd))
    if (command) {
        await command.run(client, message, args)
                        .catch((error) => {
                            console.log("---ERROR: when Executing Command", error)
                        })
    }
});
client.login(process.env.TOKEN)