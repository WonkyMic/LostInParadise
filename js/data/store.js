const couchbase = require("couchbase")
import { GOLD } from './docs/DocTypes'

const cluster = new couchbase.Cluster("couchbase://localhost", {
    username: "Administrator",
    password: "password"
})

const gameContent = cluster.bucket("lost-in-paradise")

export function getGoldDoc(id) { return gameContent.get(GOLD + id) }
export function setGoldDoc(goldDoc) { return gameContent.upsert(GOLD + goldDoc.id, goldDoc) }

