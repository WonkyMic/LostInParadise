const mongo = require('mongodb').MongoClient
const { Gold } = require('./docs/DocTypes')

module.exports = class Store {
    constructor(collName) {
        const url = '' // GCloud connection URL
        this.client
        mongo.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err, clit) => {
            if (err) {
                console.error(err)
                return
            }
            this.client = clit
            const db = client.db('wm-lostParadise')
            return db.collection({collName})
        })
    }
    
    close(){
        client.close()
    }
}