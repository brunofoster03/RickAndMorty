const axios = require('axios')
const URL = 'https://rickandmortyapi.com/api/character/'


const getCharById = async (req, res) => {
    const { id } = req.params
    try{
        const { data } = await axios(URL + id)
        if(data.id && data.name){
            return res.json({
                id: data.id,
                name: data.name,
                status: data.status,
                species: data.species,
                origin: data.origin,
                image: data.image,
                gender: data.gender 
            })
        }
        return res.status(404).send('Not found')
    }
    catch(error){
        return res.status(500).send(error.message)
    }
}
module.exports = {
    getCharById
}