const isAuthed = require("../modules/jwt/isAuthed");

module.exports = function(app, squelize) {
    require("./users/routes")(app, squelize);
    app.use(isAuthed);
    require("./activities/routes")(app, squelize);
}
