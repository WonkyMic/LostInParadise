module.exports = {
    getStartingMagicalItem() {
        const rand = Math.floor(Math.random() * Math.floor(3))
        return magicalWeapons.rand
    },
    getStartingPhysicalItem() {
        const rand = Math.floor(Math.random() * Math.floor(3))
        return physicalWeapons.rand
    }
}

const physicalWeapons = [
    {name:`Dagger` , desc:'Basic weapon', mod:'1', minDmg:'1', maxDmg: '2'},
    {name:`Crossbow` , desc:'Basic weapon', mod:'1', minDmg:'1', maxDmg: '2'},
    {name:`Quarterstaff` , desc:'Basic weapon', mod:'1', minDmg:'1', maxDmg: '2'}
]
const magicalWeapons = [
    {name:`Dagger` , desc:'Basic weapon', mod:'1', minDmg:'1', maxDmg: '2'},
    {name:`Crossbow` , desc:'Basic weapon', mod:'1', minDmg:'1', maxDmg: '2'},
    {name:`Staff` , desc:'Basic weapon', mod:'1', minDmg:'1', maxDmg: '2'}
]