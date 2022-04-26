const bcrypt = require('bcrypt');
const moment = require('moment');
const User = require("../models/index").User;
const { QueryTypes } = require('sequelize');
const { generateToken } = require("../middlewares/auth");

const { sequelize, Sequelize } = require('../config/db-sequelize');

exports.register = async (req, res) => {
    const body = req.body;

    const querySelect = `SELECT * FROM "Users" where email = '${body.email}'`;

    await sequelize.query(querySelect, { type: QueryTypes.SELECT }).then((result) => {
        if (result.length >= 1) {
            return res.status(400).send({
                message: 'Email already exist'
            })
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(body.password, salt)
        const queryInsert = `INSERT INTO "Users" ("email", "password", "createdAt", "updatedAt") values ('${body.email}', '${hash}', '${moment().format()}', '${moment().format()}')`;

        sequelize.query(queryInsert, { type: QueryTypes.INSERT }).then((user) => {
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
            res.status(503).send({
                status: 'FAILED',
                message: 'User creation failed'
            })
        })
    })
}

exports.login = async (req, res) => {
    const body = req.body;

    const email = body.email;
    const password = body.password;

    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (!user) {
            return res.status(400).send({
                message: 'Email not found'
            })
        }

        const isValid = bcrypt.compareSync(password, user.password);

        if (!isValid) {
            return res.status(400).send({
                message: 'Email and password not match'
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const token = generateToken({
            id: user.id,
            email: user.email
        })
        res.status(200).send({
            status: 'SUCCESS',
            message: 'Login Success',
            token: token
        })
    })
}