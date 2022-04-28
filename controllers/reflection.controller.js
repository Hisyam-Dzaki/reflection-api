const moment = require('moment');
const { QueryTypes } = require('sequelize');

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

    const queryFind = `SELECT * FROM "Users" where email = '${req.email}'`;
    const userDetail = await sequelize.query(queryFind, { type: QueryTypes.SELECT })

    const queryUpdate = `UPDATE "Reflections" SET "success" = '${success}', "low_point" = '${low_point}', "take_away" = '${take_away}', "owner_id" = '${userDetail[0].id}', "updatedAt" = '${moment().format()}' WHERE "id" = '${id}'`;

    await sequelize.query(queryUpdate, { type: QueryTypes.UPDATE }).then((result) => {
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

    const queryDelete = `DELETE FROM "Reflections" WHERE "id" = '${id}'`;

    await sequelize.query(queryDelete, { type: QueryTypes.DELETE }).then((result) => {
        res.status(200).send({
            status: "SUCCESS",
            message: "Reflection deleted",
        })
    }
    ).catch(error => {
        res.status(503).send({
            status: "FAILED",
            message: "failed delete Reflection"
        })
    })
}