const Code = require("code");
const Lab = require("lab");
const request = require("request-promise");
const login = require("./requests").login;
const activity = require("./requests").activity;
const activityPost = require("./requests").activityPost;

const lab = exports.lab = Lab.script();

lab.experiment("Sport", () => {
    let acitivityId;
    let token;
    let userId;

    lab.test("The login has to be success", async() => {
        login.body = {username: "admin", password: "test"}

        const response = await request(login);
        token = response.token;
        Code.expect(token).to.exist();
    });

    lab.test("Has to get missing authorization header", async() => {
        start = new Date();
        end = start.setDate(start.getDate() +2);

        const body = {
            activity_type: "cycling",
            start_time: start,
            end_time: end,
            start_coordinates: { lat: 12.399, long: 19.339},
            end_coordinates: { lat: 40.503, long: 30.450},
            calories: 100,
        };
        activity.method = "POST";
        activity.body = body;
        
        try {
            const response = await request(activity);
        } catch(err) {
            Code.expect(err.error.message).to.be.equal("Missing authorization header");
        }

    });

    lab.test("Has to post an acitivity", async() => {
        start = new Date();
        end = new Date();

        const body = {
            activity_type: "cycling",
            start_time: start,
            end_time: end,
            start_coordinates: { lat: 12.399, long: 19.339},
            end_coordinates: { lat: 40.503, long: 30.450},
            calories: 100,
        };

        activity.headers = { "Authorization": `Bearer ${token}`}
        activity.body = body;
        activity.method = "POST";

        const response = await request(activity);
        activityId = response.id;
        userId = response.user_id;

        Code.expect(response.activity_type).to.be.equal("cycling");
        Code.expect(response.calories).to.be.equal(100);
    });

    lab.test("Has to get the activity by user_id", async() => {
        activity.uri = `${activity.uri}?user_id=${userId}`;
        activity.method = "GET";
        activity.body = {};

        const response = await request(activity);
        Code.expect(response[0].activity_type).to.be.equal("cycling");
        Code.expect(response[0].calories).to.be.equal(100);
    });

    lab.test("Hasn't to get any activities", async() => {
        activity.uri = `http://localhost:8000/activities?user_id=45959338`;

        const response = await request(activity);
        Code.expect(response).to.length(0);
    });

    lab.test("Has to get the activity", async() => {
        activity.uri = `http://localhost:8000/activities/${activityId}`;

        const response = await request(activity);
        Code.expect(response.activity_type).to.be.equal("cycling");
        Code.expect(response.calories).to.be.equal(100);
    });

    lab.test("Has to update the activity", async() => {
        activity.method = "PUT";

        const body = {
            activity_type: "football",
            calories: 180,
        };

        activity.body = body;

        let response = await request(activity);
        Code.expect(response[0]).to.be.equal(1);

        activity.method = "GET";
        activity.body = {};

        response = await request(activity);
        Code.expect(response.activity_type).to.be.equal("football");
        Code.expect(response.calories).to.be.equal(180);
    });

    lab.test("Has to delete the activity", async() => {
        activity.method = "DELETE";

        const response = await request(activity);

        Code.expect(response).to.be.equal(activityId);
    });

    lab.test("Hasn't to allow to execute delete", async() => {
        login.body = {username: "paco", password: "test"}

        const response = await request(login);

        token = response.token;
        Code.expect(token).to.exist();

        activity.headers = { "Authorization": `Bearer ${token}`}

        try {
            const response = await request(activity);
        } catch(err) {
            Code.expect(err.error.message).to.be.equal("not allowed");
        }
    });
});
