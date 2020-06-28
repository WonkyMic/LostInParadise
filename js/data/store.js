const cassandra = require('cassandra-driver')
const { Gold } = require('./docs/DocTypes')

module.exports = {
    getClient() {
        return new cassandra.Client({
            contactPoints: ['35.188.143.19'],
            localDataCenter: 'us-central1',
            keyspace: 'paradiseks'
          });
    }
}

// module.exports = class Store {
//     constructor(collName) {
//         const url = '' // GCloud connection URL
//         mongo.connect(url, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         }, (err, clit) => {
//             if (err) {
//                 console.error(err)
//                 return
//             }
//             this.client = clit
//             const db = client.db('wm-lostParadise')
//             this.collection = db.collection({collName})
//         })
//     }
    
//     close(){
//         client.close()
//     }
// }