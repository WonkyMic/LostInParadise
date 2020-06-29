module.exports = {
    getItem(id) {return emoMap.find(e => e.id === id)},
}

const emoMap = [
    {id:0 , name:`Dagger` , desc:'Basic weapon'}
]