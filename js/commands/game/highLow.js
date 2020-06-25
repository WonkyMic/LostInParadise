const sorryStringFormat = "Sorry, but you lost %s tokens :("
const winningStringFormat = "Congratulations, you did it! You win %s tokens!"
const somethingWentWrong = "Your commands didn't make sense, try again! ex : `!high 40`"

module.exports = {
    name:"highLow",
    category: "game",
    description: "todo",
    run: async (client, message, args) => {

        console.log("--- Running highLow ---")
        console.log("--- args : " + args + " ---")

        let betValue
        let winnings = 0

        //if args exist get the next one as the bet value
        if(Array.isArray(args) && args.length > 0 ){
            betValue = args.shift().toLowerCase()
        }
        else {
            return somethingWentWrong
        }
        //if the betValue is not a number, give error and no winnings
        if(isNaN(betValue)){
            return somethingWentWrong
        }

        //Do the roll and build appropriate string
        const roll = Math.trunc(Math.random()*100) + 1
        var returnString = "You rolled a " + roll + ".\n"

        if(cmd == "high"){
            //if they bet high and succeed, double the betVal as winnings
            if(roll > 70){
                returnString += winningStringFormat
                winnings += betVal*2
            }
            else {
                returnString += sorryStringFormat
                winnings = betVal
            }
        }
        else if(cmd == "low"){
            //if they bet low and succeed, double the betVal as winnings
            if(roll < 30){
                returnString += winningStringFormat
                winnings += betVal*2
            }
            else {
                returnString += sorryStringFormat
                winnings = betVal
            }
        }
        else { return }

        returnString = returnString.replace(/\%s/g, winnings)
        return returnString
    }
}