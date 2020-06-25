import { getGameContent } from '../data/store'

export function getGold(id) {
    const key = "gold_" + id
    const result = await getGameContent().get(key)
    return "asdr";
}

