var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const jwt = require('jsonwebtoken');
const AWS = require("aws-sdk");
import Badges from '../models/Badges';
// import schema from '../schema'
const Ajv = require("ajv");
const ajv = new Ajv();
export const loginhandler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            id: 1,
            username: "ahsan",
        };
        const token = jwt.sign({ user }, 'secret', { expiresIn: '24h' }, 'secretKey');
        const response = {
            statusCode: 200,
            body: `token: ${token}`
        };
        return response;
    }
    catch (err) {
        return {
            statusCode: 500,
            body: `An error occured`,
        };
    }
});
export const posthandler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let docClient = new AWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000',
            accessKeyId: 'DEFAULT_ACCESS_KEY',
            secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
        });
        const parsedBody = JSON.parse(event.body || '');
        const data = {
            badgeid: 1,
            badgeTitle: parsedBody === null || parsedBody === void 0 ? void 0 : parsedBody.title,
            badgeImage: parsedBody === null || parsedBody === void 0 ? void 0 : parsedBody.image,
            badgeStatus: parsedBody === null || parsedBody === void 0 ? void 0 : parsedBody.status,
            isAdmin: true
        };
        let params = {
            TableName: "Badges",
            Item: data
        };
        let bg;
        // const valid = ajv.validate(schema, data);
        let valid = true;
        if (valid) {
            // bg = await Badges.create(data,
            //     { fields: ["badgeTitle","badgeImage","badgeStatus"] })
            yield docClient.put(params, (err, data1) => {
                if (err) {
                    console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                }
                else {
                    console.log(data1);
                    console.log("Added item:", JSON.stringify(data1, null, 2));
                }
            });
            // let d= await docClient.put(params)
            // console.log(d)
        }
        else {
            console.log(ajv.errors);
        }
        const response = {
            statusCode: 200,
            body: `Badge created and the created id ` //: ${bg.dataValues.badgeid}`
        };
        return response;
    }
    catch (err) {
        return {
            statusCode: 500,
            body: `An error occured`,
        };
    }
});
// function verifyToken(req,res,next){
// }
export const gethandler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = event.headers.Authorization;
        let bg = yield Badges.findAll();
        let response;
        jwt.verify(token, 'secret', (err, authData) => {
            if (err) {
                console.log(err);
                response = {
                    statusCode: 500,
                    body: "An error has occured"
                };
            }
            else {
                // console.log(authData);
                bg = { object: JSON.stringify(bg) };
                const valid = ajv.validate(schema, bg);
                if (!valid) {
                    console.log(ajv.errors);
                }
                else {
                    response = {
                        statusCode: 200,
                        body: bg.object
                    };
                }
            }
        });
        // console.log(token.Authorization);
        //   };
        // console.log(response)
        return response;
    }
    catch (err) {
        return {
            statusCode: 500,
            body: 'An error occured',
        };
    }
});
export const puthandler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = JSON.parse(event.body || '');
        const data = {
            badgeid: parsedBody === null || parsedBody === void 0 ? void 0 : parsedBody.id,
            badgeTitle: parsedBody === null || parsedBody === void 0 ? void 0 : parsedBody.title,
            badgeImage: parsedBody === null || parsedBody === void 0 ? void 0 : parsedBody.image,
            badgeStatus: parsedBody === null || parsedBody === void 0 ? void 0 : parsedBody.status,
            isAdmin: true
        };
        const valid = ajv.validate(schema, data);
        if (valid) {
            yield Badges.update({ data }, {
                where: {
                    badgeid: data.badgeid
                }
            });
        }
        else {
            console.log(ajv.errors);
        }
        const response = {
            statusCode: 200,
            body: `Badge Updated `
        };
        return response;
    }
    catch (err) {
        return {
            statusCode: 500,
            body: 'An error occured',
        };
    }
});
export const deletehandler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = JSON.parse(event.body || '');
        const data = {
            badgeid: parsedBody === null || parsedBody === void 0 ? void 0 : parsedBody.id
        };
        const valid = ajv.validate(schema, data);
        if (valid) {
            yield Badges.destroy({
                where: {
                    badgeid: data.badgeid
                }
            });
        }
        else {
            console.log(ajv.errors);
        }
        const response = {
            statusCode: 200,
            body: 'Badge Deleted'
        };
        return response;
    }
    catch (err) {
        return {
            statusCode: 500,
            body: 'An error occured',
        };
    }
});
export const findhandler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let docClient = new AWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000',
            // accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
            // secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
        });
        const data = {
            badgeid: Number(event.pathParameters.id)
        };
        // let valid = ajv.validate(schema, data);
        let bg;
        var params = {
            TableName: "Badges",
            Key: {
                "badgeid": data.badgeid
            }
        };
        let valid = true;
        if (valid) {
            //  bg = await Badges.findByPk(data.badgeid);
            yield docClient.get(params, function (err, data1) {
                if (err) {
                    console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                }
                else {
                    console.log(data1);
                    console.log("GetItem succeeded:", JSON.stringify(data1, null, 2));
                }
            });
            // let d = await docClient.scan(params);
            // console.log("sadsd")
            // console.log(d);
            // console.log("GetItem succeeded:", JSON.stringify(d, null, 2));
        }
        // bg=JSON.stringify(bg)
        // valid = ajv.validate(schema, bg);
        // if (!valid) console.log(ajv.errors)
        const response = {
            statusCode: 200,
            body: "" //bg
        };
        return response;
    }
    catch (err) {
        return {
            statusCode: 500,
            body: 'An error occured',
        };
    }
});
//# sourceMappingURL=badges.js.map