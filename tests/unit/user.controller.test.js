const moment = require('moment');
require('dotenv').config();
const { User } = require('../../models/index');
const UserController = require('../../controllers/user.controller');
const { INET } = require('sequelize/types');
const { sequelize, Sequelize } = require('../../config/db-sequelize');

jest.mock('../../models/');

let req, res, next;


const fakeData1 = {
    rows: []
}

const fakeData2 = {
    rows: [
        {
            email: 'yourniggaz@gmail.com',
            password: 'mynigga'
        }
    ]
}

const queryRegister = `INSERT INTO "Users" ("email", "password", "createdAt", "updatedAt") values ('${userData.email}', '${userData.password}', '${moment().format()}', '${moment().format()}')`


beforeEach(() => {
    jest.clearAllMocks()
})

describe("UserController.register", () => {
    it("should return 200", async () => {
        req.body = userData;
        sequelize.query.mockResolvedValue(fakeData1);
        await UserController.register(req, res);
        expect(res.statusCode).toBe(200);
    })
})