function averageLoja(list){
    let sumTime = 0
    for (let i = 0; i < list.length; i++) {
        sumTime += list[i].pTempo
    }
    return sumTime / list.length
}

module.exports = { averageLoja}