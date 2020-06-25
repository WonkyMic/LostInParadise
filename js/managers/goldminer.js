const getContent = require('../data/store')
// const setGoldDoc = require('../data/store')
const GoldDoc = require('../data/docs/GoldDoc')
const { GOLD } = require('../data/docs/DocTypes')

module.exports = class GoldMiner {
    constructor(id) {
        this.id = id
        this.content = getContent()
    }

    async getGoldDoc() { 
        return this.content.get(GOLD + this.id)
            .then((doc) => {
                console.log("doc", doc)
                return doc
            })
            .catch((error) => {
                console.log("---ERROR: when attempting to retrieve from DB", error)
                return new GoldDoc(this.id)
            })
    }

    async upsertGoldDoc(doc) {
        return this.content.upsert(GOLD + this.id, doc)
        .then((doc) => {
            console.log("doc", doc)
            return doc
        })
        .catch((error) => {
            console.log("---ERROR: when attempting to write.add to DB", error)
            return new GoldDoc(this.id)
        })
    }
}


