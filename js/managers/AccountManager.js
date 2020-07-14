const { mongoClient } = require('../data/store')
module.exports = class AccountManager{
    constructor(client){
        this.cache = []
    }
    async getAccountDoc(docId) {
        const cachedDoc = this.cache.find((doc) => doc.id===docId)
        if (cachedDoc) {
            console.log(`---Retrieved from Cache doc.id::${cachedDoc.id}`)
            return cachedDoc
        }

        const query = { id: docId }
        const mongo = mongoClient()
        await mongo.connect()
        const db = mongo.db()
        const dbDoc = await db.collection("account").findOne(query)
        mongo.close()
        if (dbDoc){
            console.log(`---Retrieved from Mongo doc.id::${dbDoc.id}`)
            this.cache.push(dbDoc)
            return dbDoc
        }
            
    }
    async upsertAccountDoc(doc) {
        const cacheIndex = this.cache.findIndex((cDoc) => cDoc.id===doc.id)
        if (cacheIndex > -1) {this.cache.cacheIndex = doc}
        else {this.cache.push(doc)}
        
        const mongo = mongoClient()
        await mongo.connect()
        const db = mongo.db()
        await db.collection("account").replaceOne({id: doc.id}, doc, {upsert: true})
        mongo.close()
    }
}
