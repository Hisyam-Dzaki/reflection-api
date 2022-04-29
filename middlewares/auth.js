var jwt = require('jsonwebtoken');
let privateKey = 'yourbae';

const verify = async (req, res, next) => {
    const token = req.headers["x-access-token"]
    
    jwt.verify(token, privateKey, (err, decoded) => {
        console.log("error", err);
        if (err) {
            return res.status(401).send({
                err: 'Auth is Not Valid'
            })
        }
        req.id = decoded.id;
        req.email = decoded.email;

        next();
    });
}

const checkUser = async (req, res, next) => {
    const token = req.headers["x-access-token"]
    
    jwt.verify(token, privateKey, (err, decoded) => {
        req.id = decoded.id;
        req.email = decoded.email;

        console.log('decoded', decoded);        
        console.log('request', req.params);        
        next();
    });
}

const generateToken = (payload) => {
    return jwt.sign(payload, privateKey, {
        algorithm: 'HS256',
        expiresIn: "1h"
    });
}

module.exports = {
    generateToken,
    verify,
    checkUser
};

