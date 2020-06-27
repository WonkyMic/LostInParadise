const Store = require('../data/store')
const GoldDoc = require('../data/docs/GoldDoc')
const { GOLD } = require('../data/docs/DocTypes')

module.exports = {
    async getGoldDoc(docId) {
        const store = new Store(GOLD)
        return store.collection.findOne({id: {docId}})
            .then((doc) => {
                console.log("doc", doc)
                return doc
            })
            .catch((error) => {
                console.log("---ERROR: when attempting to retrieve from DB", error)
                return new GoldDoc(this.id)
            })
            .finally(() => store.close())
    },
    async upsertGoldDoc(doc) {
        const store = new Store(GOLD)
        const docId = doc.id
        return store.collection.updateOne({id: {docId}}, {'$set': {doc}}) 
        .then((doc) => {
            console.log("doc", doc)
            return doc
        })
        .catch((error) => {
            console.log("---ERROR: when attempting to write.add to DB", error)
            return new GoldDoc(this.id)
        })
        .finally(() => store.close())
    }

    /*
        If we ever need to delte
        collection.deleteOne({name: 'Togo'}, (err, item) => {
            console.log(item)
        })
    */
}


