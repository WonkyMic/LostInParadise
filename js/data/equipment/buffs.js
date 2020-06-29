module.exports = {
    getEmoji(id) {return emoMap.find(e => e.id === id)},
    getId(emoji) {return empMap.find(e => e.val === emoji).id}
}

const emoMap = [
    {id:0 , val:`🌑` , desc:'No Buffs Applied'}
]