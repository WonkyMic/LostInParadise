const cassandra = require('cassandra-driver')
const { Gold } = require('./docs/DocTypes')

module.exports = {
    getClient(env) {
        const ks = (env === "PROD")? "paradise_prod" : "paradiseks"
        return new cassandra.Client({
            contactPoints: ['35.188.143.19'],
            localDataCenter: 'us-central1',
            keyspace: ks
          });
    }
}