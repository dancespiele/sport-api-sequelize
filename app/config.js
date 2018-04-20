const globalConfig = {
    mongodb: {
        database: process.env.MONGO_DATABASE,
        host: process.env.MONGO_HOST,
        password: process.env.MONGO_PASSWORD,
        username: process.env.MONGO_USER,
    },
    service: {
        port: parseInt(process.env.SERVICE_PORT, 10),
    },
}

module.exports = globalConfig;