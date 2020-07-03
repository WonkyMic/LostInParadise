module.exports = class AccountDoc {
    constructor(id) {
        this.id = id
        this.attunement = 'Basic'
        this.elements = [`🌑`]
        this.buffs = [`🆕`]
        this.items = [`🗡`]
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
}