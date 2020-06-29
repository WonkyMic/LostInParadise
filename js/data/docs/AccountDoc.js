module.exports = class AccountDoc {
    constructor(id) {
        this.id = id
        this.activeClass = 'default'
        this.buffs = []
        this.items = []
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
        this.activeClass = doc.activeClass
        this.buffs = doc.buffs
        this.items = doc.items
        this.gems = doc.gems
        this.hp = doc.hp
        this.maxHp = doc.maxHp
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
        const query = `UPDATE account SET activeClass=${this.activeClass}, `
                        + `buffs=${this.buffs}, `
                        + `items=${this.items}, `
                        + `gems=${this.gems}, `
                        + `hp=${this.hp}, `
                        + `maxHp=${this.maxHp}, `
                        + `xp=${this.xp}, `
                        + `level=${this.level}, `
                        + `strength=${this.strength}, `
                        + `dexterity=${this.dexterity}, `
                        + `constitution=${this.constitution}, `
                        + `intelligence=${this.intelligence}, `
                        + `wisdom=${this.wisdom}, `
                        + `charisma=${this.charisma}`
                        + `WHERE id=${this.id}`
    }
}