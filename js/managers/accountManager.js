const { getClient } = require('../data/store')
const AccountDoc = require('../data/docs/AccountDoc')

// Documentation used when interfacing with DB: https://github.com/datastax/nodejs-drivers
module.exports = class AccountManager{
    constructor(client){
        this.cache = []
        this.store = getClient(client.gameENV)
    }
    async getAccountDoc(docId) {
        const cachedDoc = this.cache.find((doc) => doc.id===docId)
        if (cachedDoc) {return cachedDoc;}
        const query = `SELECT * FROM account WHERE id=${docId}`
        
        var accountdoc = new AccountDoc(docId)
        this.store.execute(query)
            .then((result) => {
                const doc = result.rows[0]
                if (doc) {
                    accountdoc.setDoc(doc)
                    this.cache.push(accountdoc)
                }
            })
            .catch((error) => {
                console.log("---ERROR: when attempting to retrieve from DB", error)
            })
        return accountdoc
    }

    async upsertAccountDoc(doc) {
        const cacheIndex = this.cache.findIndex((cDoc) => cDoc.id===doc.id)
        console.log("cacheIndex", cacheIndex)
        this.cache.cacheIndex = doc
        const query = doc.getUpdateQuery()
        console.log("---QUERY :: ", query)
        this.store.execute(query) 
        .catch((error) => {
            console.log("---ERROR: when attempting to write.add to DB", error)
            return new AccountDoc(this.id)
        })
    }
}