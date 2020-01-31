const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const bcrypt = require('bcrypt')

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

async function hashPassword(pwd) {
    const saltRounds = 12
    const result = await bcrypt.hash(pwd, saltRounds).then(function (hash) {
        return hash
    })
    return result
}

module.exports = {
    async register(req, res) {
        try {
            req.body.password = await hashPassword(req.body.password)
            const user = await User.create(req.body)
            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
        } catch (err) {
            // Email already exists
            res.status(400).send({
                error: 'This email account is already in use.'
            })
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!user) {
                res.status(403).send({
                    error: 'The login information was incorrect'
                })
            }

            const isPasswordValid = await user.comparePassword(password)
            if (!isPasswordValid) {
                return res.status(403).send({
                    error: 'The login information was incorrect'
                })
            }

            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
        } catch (err) {
            // Email already exists
            res.status(500).send({
                error: 'An error has occured trying to login'
            })
            console.log(err)
        }
    }
}
