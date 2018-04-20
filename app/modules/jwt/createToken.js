const moment = require("moment");
const jwt = require("jwt-simple");
const config = require("./config");

const createToken = user => {
    const payload = {
        user: {id: user.id, permissions: user.permissions},
        iat: moment().unix(),
        exp: moment().add(config.exp, "days").unix(),
    };

    return {
        token: jwt.encode(payload, config.secret),
        payload: payload
    }
}

module.exports = createToken;