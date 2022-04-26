const moment = require('moment');
const Reflection = require("../models/index").Reflection;
const User = require("../models/index").User;
const { QueryTypes } = require('sequelize');
const { generateToken } = require("../middlewares/auth");

const { sequelize, Sequelize } = require('../config/db-sequelize');

exports.postReflection = async (req, res) => {
    console.log(`req_id : ${req.email}`)
    const body = req.body;
    const success = body.success;
    const low_point = body.low_point;
    const take_away = body.take_away;

    const queryFind = `SELECT * FROM "Users" where email = '${req.email}'`;
    const userDetail = await sequelize.query(queryFind, { type: QueryTypes.SELECT })

    const queryInsert = `INSERT INTO "Reflections" ("success", "low_point", "take_away", "owner_id", "createdAt", "updatedAt") 
    VALUES ('${success}', '${low_point}', '${take_away}', '${userDetail[0].id}', '${moment().format()}', '${moment().format()}')`;


    await sequelize.query(queryInsert, { type: QueryTypes.INSERT }).then((result) => {
        res.status(200).send({
            status: 'SUCCESS',
            message: 'Reflection created',
            data: body
        })
    }).catch(error => {
        console.log('eror');
        console.log(error);
        res.status(503).send({
            status: 'FAILED',
            message: 'failed create Reflection'
        })
    })
}

exports.getReflections = async (req, res) => {
    const queryFind = `SELECT * FROM "Users" where email = '${req.email}'`

    const userDetail = await sequelize.query(queryFind, { type: QueryTypes.SELECT })

    const queryGet = `SELECT * FROM "Reflections" where owner_id = '${userDetail[0].id}'`

    await sequelize.query(queryGet, { type: QueryTypes.SELECT }).then((result) => {
        res.status(200).send({
            status: "SUCCESS",
            data: result
        })
    }).catch(error => {
        res.status(503).send({
            status: "FAILED",
            message: "failed load reflections"
        })
    })

}

exports.putReflections = async (req, res) => {
    const body = req.body;
    const success = body.success;
    const low_point = body.low_point;
    const take_away = body.take_away;
    const id = req.params.id;

    return Reflection.update({
        success: success,
        low_point: low_point,
        take_away: take_away
    }, {
        where: {
            id: id
        }
    }).then(result => {
        res.status(200).send({
            status: "SUCCESS",
            message: "Reflection updated",
            data: body
        })
    }).catch(error => {
        res.status(503).send({
            status: "FAILED",
            message: "failed update Reflection"
        })
    })
}

exports.deleteReflections = async (req, res) => {
    const id = req.params.id;
    return Reflection.destroy({
        where: {
            id: id
        }
    }).then(result => {
        res.status(200).send({
            status: "SUCCESS",
            message: "Reflection deleted",
            data: result
        })
    }).catch(error => {
        res.status(503).send({
            status: "FAILED",
            message: "failed delete Reflection"
        })
    })
}