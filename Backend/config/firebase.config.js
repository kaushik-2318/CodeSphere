const fbAdmin = require("firebase-admin");
const serviceCredentials = require("../etc/secrets/codesphere-7627c-firebase-adminsdk-lu3xr-000ca3eddd.json");

fbAdmin.initializeApp({
    credential: fbAdmin.credential.cert(serviceCredentials),
    storageBucket: "codesphere-7627c.appspot.com",
});

module.exports = fbAdmin;
