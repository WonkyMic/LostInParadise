import { getGoldDoc, setGoldDoc } from '../data/store'
import GoldDoc from '../data/docs'
import { GOLD } from '../data/docs/DocTypes'

export default class GoldMiner {
    constructor(id) {
        this.goldDoc = getGoldDoc(id)
        if(typeof this.goldDoc === 'undefined') { this.goldDoc = new GoldDoc(id)}
    }
}


