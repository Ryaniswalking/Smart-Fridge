const { google } = require("googleapis");
require("dotenv").config({ path: "../.env" });

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3000" // Redirect URI
);

const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline", // Ensures we get a refresh token
    scope: ["https://www.googleapis.com/auth/calendar.readonly"],
});

console.log("Authorize this app by visiting this URL:", authUrl);
