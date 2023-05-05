const { Favorite } = require('../DB_connection')

const postFav = async (req, res) => {
    const { name, origin, status, image, species, gender } = req.body
    if(!name || !origin || !status || !image || !species || !gender) return res.status(401).send('Faltan datos')
    try{
        await Favorite.findOrCreate({
            name,
            origin,
            status,
            image,
            species,
            gender
        })
        const allFavorites = await Favorite.findAll()
        return res.json(allFavorites)
    }
    catch(error){
        return res.status(500).send(error)
    }
}

module.exports = {
    postFav
}