const { MessageEmbed } = require("discord.js")
const sorryStringFormat = "Sorry <@%u> but you lost %s gold :("
const winningStringFormat = "Congratulations <@%u> you did it! You win %s gold!"
const somethingWentWrong = "Your commands didn't make sense, try again! ex : `!r <high/low> 40`"


module.exports = {
    name: "r",
    category: "game",
    description: "Plays a simple high/low game with gold bets",
    run: async (client, message, args) => {

        function failure() {
            const errMsg = new MessageEmbed()
            .setColor("#FF0000")
            .setDescription(somethingWentWrong)
            message.channel.send(errMsg)
        }

        let betValue
        let returnString
        let winnings = 0

        let side = args.shift().toLowerCase()
        if(side != "high" && side != "low"){
            failure()
            return
        }

        //if args exist get the next one as the bet value
        if(Array.isArray(args) && args.length > 0 ){
            betValue = args.shift().toLowerCase()
        }
        else {
            failure()
            return
        }
        //if the betValue is not a number, give error and no winnings
        if(isNaN(betValue)){
            failure()
            return
        }

        //Do the roll and build appropriate string
        const roll = Math.trunc(Math.random()*100) + 1
        returnString = "You rolled a " + roll + ".\n"

        if(side == "high"){
            //if they bet high and succeed, double the betVal as winnings
            if(roll > 70){
                returnString += winningStringFormat
                winnings += betValue*2
            }
            else {
                returnString += sorryStringFormat
                winnings = betValue
            }
        }
        else if(side == "low"){
            //if they bet low and succeed, double the betVal as winnings
            if(roll < 30){
                returnString += winningStringFormat
                winnings += betValue*2
            }
            else {
                returnString += sorryStringFormat
                winnings = betValue
            }
        }
        else { return }

        returnString = returnString.replace(/\%s/g, winnings)
        returnString = returnString.replace(/\%u/g, message.author.id)

        message.channel.send(returnString)
    }
}