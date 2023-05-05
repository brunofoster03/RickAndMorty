const { User } = require('../DB_connection')

const postUser = async (req, res) => {
    const { email, password } = req.body
    if(!email || !password) return res.status(404).send('Faltan datos')
    try{
        const [user, created] = await User.findOrCreate({
            where: {email: email},
            defaults: {
                password: password
            }
        })
        return created ? res.status(200).send('User created') :
        res.status(409).send('User already exists')
    }
    catch(error){
        return res.status(500).send(error)
    }


}

module.exports = {
    postUser
}
