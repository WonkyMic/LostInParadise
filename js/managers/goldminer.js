const { getClient } = require('../data/store')
const GoldDoc = require('../data/docs/GoldDoc')
const { GOLD } = require('../data/docs/DocTypes')

// Documentation used when interfacing with DB: https://github.com/datastax/nodejs-drivers
module.exports = {
    async getGoldDoc(docId) {
        const query = `SELECT value FROM gold WHERE id=${docId}`
        const store = getClient()
        return store.execute(query)
            .then((result) => {
                console.log("value from db: ", result.rows[0].value)
                return new GoldDoc(docId, result.rows[0].value)
            })
            .catch((error) => {
                console.log("---ERROR: when attempting to retrieve from DB", error)
                return new GoldDoc(docId, "0")
            })
    },
    async upsertGoldDoc(doc) {
        const query = `UPDATE gold SET value=${doc.value} WHERE id=${doc.id}`
        const store = getClient()
        return store.execute(query) 
        .then(() => {
            console.log("updated doc", doc)
        })
        .catch((error) => {
            console.log("---ERROR: when attempting to write.add to DB", error)
            return new GoldDoc(this.id)
        })
    }
}


