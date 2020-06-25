const { MessageEmbed } = require("discord.js")
const sorryStringFormat = "Sorry <@%u> but you lost %s gold :("
const winningStringFormat = "Congratulations <@%u> you did it! You win %s gold!"
const somethingWentWrong = "Your commands didn't make sense, try again! ex : `!r <high/low> 40`"
const _HIGH_ = "high"
const _LOW_ = "low"


module.exports = {
    name: "r",
    category: "game",
    description: "Plays a simple high/low game with gold bets",
    run: async (client, message, args) => {
        let betValue
        let returnString
        let winnings = 0

        function errorWarning() {
            const errMsg = new MessageEmbed()
            .setColor("#FF0000")
            .setDescription(somethingWentWrong)
            message.channel.send(errMsg)
        }

        function win() {
            returnString += winningStringFormat
            winnings += betValue*2
        }
        function lose() {
            returnString += sorryStringFormat
            winnings = betValue
        }

        if(Array.isArray(args) && args.length > 1 ){ //to stop processing if not enough args
            let side = args.shift().toLowerCase()

            if(side == _HIGH_ || side == _LOW_){ //must provide "low"/"high"
                betValue = args.shift().toLowerCase()

                if(!isNaN(betValue)){ //if betValue IS a number
                    const roll = Math.trunc(Math.random()*100) + 1
                    returnString = "You rolled a " + roll + ".\n"
                    if(side == _HIGH_){
                        if(roll > 70){
                            win()
                        }
                        else {
                            lose()
                        }
                    }
                    else if(side == _LOW_){
                        if(roll < 30){
                            win()
                        }
                        else {
                            lose()
                        }
                    }
                    returnString = returnString.replace(/\%s/g, winnings)
                    returnString = returnString.replace(/\%u/g, message.author.id)

                    message.channel.send(returnString)
                    return
                }
            }
        }
        errorWarning()
    }
}