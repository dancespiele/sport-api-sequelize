const Sequelize = require("sequelize");

module.exports = function User(sequelize) {
    return sequelize.define("users", {
        id: {
            type: Sequelize.STRING,
            unique: true,
            primaryKey: true,
            field: 'id'
        },
        full_name: Sequelize.STRING,
        username: Sequelize.STRING,
        password: Sequelize.STRING,
        permissions: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    });
};