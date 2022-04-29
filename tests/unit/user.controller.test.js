const moment = require('moment');
require('dotenv').config();
const UserController = require('../../controllers/user.controller');
const { sequelize, Sequelize } = require('../../config/db-sequelize');
const httpMocks = require('node-mocks-http')

jest.mock('../../config/db-sequelize')

let req, res, next;

beforeEach(() => {
    jest.clearAllMocks()
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
})

describe("UserController.register", () => {
    it("should return 200", async () => {
        sequelize.query.mockResolvedValue([{
            email: 'bagas@gmail.com',
            password: '123456'
        }]);
        await UserController.register(req, res);
        expect(res.statusCode).toBe(200);
    })

    // it("should return 400", async () => {
    //     sequelize.query.mockResolvedValue([{
    //         email: 'nigga@gmail.com',
    //         password:'black'
    //     }]);
    //     UserController.register(req, res);
    //     expect(res.statusCode).toBe(400);
    // })

    // it("should return 503", async () => {
    //     const rejected = Promise.reject({ message: "Error" })
    //     sequelize.query.mockResolvedValueOnce([]).mockResolvedValue(rejected);
    //     UserController.register(req, res);
    //     expect(res.statusCode).toBe(503);
    // })
})
