const { getAccountDoc, upsertAccountDoc } = require('./accountManager')
const GemDoc = require('../data/docs/GemDoc')

// Documentation used when interfacing with DB: https://github.com/datastax/nodejs-drivers
module.exports = {
    async addGems(doc, amount) {
        doc.gems = parseInt(doc.gems) + parseInt(amount)
        return upsertAccountDoc(doc)
            .then(() => {return doc})
            .catch((error) => {
                console.log("---ERROR: when attempting to retrieve from DB", error)
                doc.gems = parseInt(doc.gems) - parseInt(amount)
                return doc
            })
    }
}