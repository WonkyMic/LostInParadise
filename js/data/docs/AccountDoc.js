module.exports = class AccountDoc {
    constructor(id) {
        this.id = id
        this.attunement = 0
        this.elements = '0'
        this.buffs = '0'
        this.items = '0'
        this.weapon = 0
        this.trinket = 0
        this.armor = 0
        this.gems = 0
        this.hp = 20
        this.maxHp = 20
        this.xp = 0
        this.level = 1
        this.strength = 10
        this.dexterity = 10
        this.constitution = 10
        this.intelligence = 10
        this.wisdom = 10
        this.charisma = 10
    }
    setDoc(doc) {
        this.attunement = doc.attunement
        this.elements = doc.elements
        this.buffs = doc.buffs
        this.items = doc.items
        this.weapon = doc.weapon
        this.trinket = doc.trinket
        this.armor = doc.armor
        this.gems = doc.gems
        this.hp = doc.hp
        this.maxHp = doc.maxhp
        this.xp = doc.xp
        this.level = doc.level
        this.strength = doc.strength
        this.dexterity = doc.dexterity
        this.constitution = doc.constitution
        this.intelligence = doc.intelligence
        this.wisdom = doc.wisdom
        this.charisma = doc.charisma
    }
    getUpdateQuery() {
        return `UPDATE account SET attunement='${this.attunement}', `
                        + `elements='${this.elements}', `
                        + `buffs='${this.buffs}', `
                        + `items='${this.items}', `
                        + `weapon=${this.weapon}, `
                        + `trinket=${this.trinket}, `
                        + `armor=${this.armor}, `
                        + `gems=${this.gems}, `
                        + `hp=${this.hp}, `
                        + `maxhp=${this.maxHp}, `
                        + `xp=${this.xp}, `
                        + `level=${this.level}, `
                        + `strength=${this.strength}, `
                        + `dexterity=${this.dexterity}, `
                        + `constitution=${this.constitution}, `
                        + `intelligence=${this.intelligence}, `
                        + `wisdom=${this.wisdom}, `
                        + `charisma=${this.charisma} `
                        + `WHERE id=${this.id}`
    }

    getSelectQuery() {
        return `SELECT attunement, `
                        + `elements, `
                        + `buffs, `
                        + `items, `
                        + `weapon, `
                        + `trinket, `
                        + `armor, `
                        + `gems, `
                        + `hp, `
                        + `maxHp, `
                        + `xp, `
                        + `level, `
                        + `strength, `
                        + `dexterity, `
                        + `constitution, `
                        + `intelligence, `
                        + `wisdom, `
                        + `charisma `
                        + `WHERE id=${this.id}`
    }
}