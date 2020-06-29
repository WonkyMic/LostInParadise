const { getClient } = require('../data/store')
const AccountDoc = require('../data/docs/AccountDoc')

// Documentation used when interfacing with DB: https://github.com/datastax/nodejs-drivers
module.exports = {
    async getAccountDoc(docId) {
        const query = `SELECT * FROM account WHERE id=${docId}` //getSelectQuery(docId)
        const store = getClient()
        var accountdoc = new AccountDoc(docId)
        store.execute(query)
            .then((result) => {
                const doc = result.rows[0]
                console.log("---SELECT Doc.id: " + doc.id)
                console.log("---SELECT Doc: " , doc)
                return accountdoc.setDoc(doc)
            })
            .catch((error) => {
                console.log("---ERROR: when attempting to retrieve from DB", error)
                return accountdoc
            })
    },
    async upsertAccountDoc(doc) {
        const store = getClient()
        const query = doc.getUpdateQuery()
        console.log("---QUERY :: ", query)
        store.execute(query) 
        .then(() => {
            return doc
        })
        .catch((error) => {
            console.log("---ERROR: when attempting to write.add to DB", error)
            return new AccountDoc(this.id)
        })
    }
}