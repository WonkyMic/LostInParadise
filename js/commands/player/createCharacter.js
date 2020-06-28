module.exports = {
    name:"create",
    category: "player",
    description: "Returns latency and API ping",
    run: async (client, message, args) => {
        const msg = await message.channel.send('🏓 Pinging....')
                    .catch((error) => {
                        console.log("---ERROR: when pinging", error)
                    })
        msg.edit(`🏓 Pong test!\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency is ${Math.round(client.ws.ping)}ms`);
    }
}