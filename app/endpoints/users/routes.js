const bcrypt = require("bcrypt");
const createToken = require("../../modules/jwt/createToken");

module.exports = function(app, sequelize){
    
    const userModel = require("./model")(sequelize);

    app.post("/users", async (req, res) => {
        const login = req.body;
        try {
            const user = await userModel.findOne({
                where: {username: login.username}
            });

            const isvalid = await bcrypt.compare(login.password, user.password);
            if (!isvalid) {
                res.status(401).send({
                    message: "Login error"
                });
            }
            
            res.send(createToken(user.dataValues));
        } catch (error) {
            res.status(500).send(error);
        }
    });
}
