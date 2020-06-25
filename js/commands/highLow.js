const highCommand = "!high"
const lowCommand = "!low"
const highLowCommands = [highCommand,lowCommand]

module.exports = {
    highLowCommands: function(message) {
        if(highLowCommands.includes(message)){
            const roll = Math.trunc(Math.random()*100) + 1
            var returnString = "You rolled a " + roll + "\n"
            if(message == "!high"){
                if(roll > 70){
                   returnString += "You did it! You win 10 tokens"
                }
                else {
                    returnString += "Sorry, but you suck!"
                }
            }
            if(message == "!low"){
                if(roll < 30){
                    returnString += "You did it! You win 10 tokens"
                }
                else {
                    returnString += "Sorry, but you suck!"
                }
            }
            return returnString
        }
    }
}