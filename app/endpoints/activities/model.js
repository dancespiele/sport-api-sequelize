const Sequelize = require("sequelize");

module.exports = function User(sequelize) {
    return sequelize.define("activities", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        activity_type: Sequelize.STRING,
        user_id: Sequelize.INTEGER,
        start_time: Sequelize.DATE,
        end_time: Sequelize.DATE,
        start_coordinates: Sequelize.TEXT,
        end_coordinates: Sequelize.TEXT,
        calories: Sequelize.INTEGER,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    });
};