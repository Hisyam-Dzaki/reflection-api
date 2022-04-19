const bcrypt = require('bcrypt');
const db = require("../config/db");
const User = require("../models/index").User;
const { generateToken } = require("../middlewares/auth");

exports.register = async (req, res) => {
    const body = req.body;

    const email = body.email;
    const password = body.password;

    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (user) {
            return res.status(400).send({
                message: 'Email already exist'
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        User.create({
            email: email,
            password: hash
        }).then(user => {
            const token = generateToken({
                id: user.id,
                email: user.email
            })

            res.status(200).send({
                status: 'SUCCESS',
                message: 'User created',
                token: token
            })
        }).catch(error => {
            console.log("error", error)
            res.status(503).send({
                status: 'FAILED',
                message: 'user creation failed'
            })
        })
    })
}


