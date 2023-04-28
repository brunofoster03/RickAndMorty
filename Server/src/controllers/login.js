const utils = require('../utils/users')

const login = (req, res) => {
    const { email, password } = req.query
    const access = utils.find(user => user.email === email && user.password === password)
    return access ? res.json({access: true}) : res.json({access: false})
}

module.exports = {
    login
}