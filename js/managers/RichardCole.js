module.exports = class RichardCole {
    constructor(client) {
        this.client = client
    }
    playGig() {
        console.log("Road Event!!")
        this.client.channels.cache.get('725470018514583634').send('Road Event!!');
    }
}