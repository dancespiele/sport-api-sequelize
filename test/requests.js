const login = {
    uri: "http://localhost:8000/users",
    json: true,
    method: "POST",
    body: {}
}

const activity = {
    uri: "http://localhost:8000/activities",
    json: true,
    body: {},
    method: ""
}

module.exports = { login, activity }
