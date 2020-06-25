const couchbase = require("couchbase")
const { Gold } = require('./docs/DocTypes')

const cluster = new couchbase.Cluster('couchbase://127.0.0.1', {
    username: "username",
    password: "password"
})

const bucket = cluster.bucket("lost-in-paradise", function(err){
    if(err) {
        console.error('Couchbase Bucket error: ', err)
    }
})
var gameContent = bucket.defaultCollection()

module.exports = function getContent() { return gameContent}

// module.exports = function getGoldDoc(id) { 
//     return gameContent.get(GOLD + id).catch((error) => {
//         console.log("---ERROR: when attempting to retrieve from DB", error)
//         return
//     })
// }
// module.exports = function setGoldDoc(goldDoc) { 
//     return gameContent.upsert(GOLD + goldDoc.id, goldDoc).catch((error) => {
//         console.log("---ERROR: when attempting to write to DB", error)
//     })
// }

