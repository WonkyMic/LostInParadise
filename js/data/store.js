const MongoClient = require('mongodb').MongoClient;
const config = require(`../common/config`)
module.exports = {
    mongoClient() {
        const uri = `mongodb+srv://lostparadise:${config.MONGO_CREDS}@cluster0.qfzm6.gcp.mongodb.net/${config.ACTIVE_DATABASE_NAME}?retryWrites=true&w=majority`;
        return new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    }
}