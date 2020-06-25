module.exports = {
    name:"highLow",
    category: "game",
    description: "todo",
    run: async (client, message, args) => {
        const arg0 = args[0]
        const roll = Math.trunc(Math.random()*100) + 1
        var returnString = "You rolled a " + roll + "\n"
        console.log("highLow args:", args)
        if(arg0 == "high"){
            if(roll > 70){
                returnString += "You did it! You win 10 tokens"
            }
            else {
                returnString += "Sorry, but you suck!"
            }
        }
        if(arg0 == "low"){
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