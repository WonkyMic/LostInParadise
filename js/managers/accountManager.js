const { getClient } = require('../data/store')
const AccountDoc = require('../data/docs/AccountDoc')

// Documentation used when interfacing with DB: https://github.com/datastax/nodejs-drivers
module.exports = {
    async getAccountDoc(docId) {
        const query = `SELECT * FROM account WHERE id=${docId}`
        const store = getClient()
        return store.execute(query)
            .then((result) => {
                const doc = result.rows[0]
                console.log("value from db: ", doc)
                return new AccountDoc(docId).setDoc(doc)
            })
            .catch((error) => {
                console.log("---ERROR: when attempting to retrieve from DB", error)
                return new AccountDoc(docId)
            })
    },
    async upsertAccountDoc(doc) {
        const store = getClient()
        return store.execute(doc.getUpdateQuery()) 
        .then(() => {
            console.log("updated doc", doc)
        })
        .catch((error) => {
            console.log("---ERROR: when attempting to write.add to DB", error)
            return new AccountDoc(this.id)
        })
    }
}


