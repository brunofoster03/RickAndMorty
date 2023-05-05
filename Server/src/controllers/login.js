const { User } = require('../DB_connection')

const login = async (req, res) => {
    const { email, password } = req.query
    if(!email || !password) return res.status(400).send('Faltan datos')
    try{
        const searchUser = await User.findOne({
            where: {
                email: email
            }
        })
        if(searchUser) {
            return searchUser.password === password ? res.json({access: true}) :
            res.status(403).send('Contraseña incorrecta')
        }
    }
    catch(error){
        return res.status(500).send(error)
    }

}

module.exports = {
    login
}