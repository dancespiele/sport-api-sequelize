const checkPermision = require("../../modules/permisions");

module.exports = function(app, sequelize) {

    const activitiesModel = require("./model")(sequelize);
    app.get("/activities", async (req, res) => {
        const query = req.query;
        try {
            const response = await activitiesModel
                .findAll({
                    where: query,
                });

            res.send(response);
        } catch (error) {
            return res.status(500).send(error);
        } 
    });

    app.get("/activities/:activityId", async (req, res) => {
        const activityId = req.params.activityId;

        try {
            const response = await activitiesModel
                .findOne({
                    where: {id: activityId}
                });

            res.send(response);
        } catch (error) {
            return res.status(500).send(error);
        } 
    });


    app.post("/activities", async (req, res) => {
        const activity = req.body;
        activity.user_id = req.logedUser.id;
        activity.createdAt = new Date();
        activity.updatedAt = new Date();
        activity.start_coordinates = JSON.stringify(activity.start_coordinates);
        activity.end_coordinates = JSON.stringify(activity.end_coordinates);

        try {
            const response = await activitiesModel.create(activity);
            res.send(response);
        } catch(error) {
            res.status(500).send(error);
        }
    });

    app.put("/activities/:activityId", async (req, res) => {
        const activityId = req.params.activityId;
        const activity = req.body;
        activity.updatedAt = new Date();

        try {
            const response = await activitiesModel
                .update(
                    activity, { where: {
                        id: activityId
                    }
                }
            );

            res.send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.use("/activities/:activityId", (req, res, next) => {
        if(req.method === "DELETE") {
            return checkPermision("admin", req, res, next);
        }

        return next();
    });

    app.delete("/activities/:activityId", async (req, res) => {
        const activityId = req.params.activityId;

        try {
            const response = await activitiesModel
                .destroy({
                    where: {
                        id: activityId
                    }
                })
            res.send(activityId);
        } catch(error) {
            res.status(500).send(error);
        }
    });
}