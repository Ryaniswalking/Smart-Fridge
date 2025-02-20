const { google } = require("googleapis");
require("dotenv").config({ path: "../.env" });

console.log(process.env.GOOGLE_CLIENT_ID);
console.log(process.env.GOOGLE_CLIENT_SECRET)

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3000"
);

async function getToken() {
    const { tokens } = await oauth2Client.getToken(""); //paste code here
    console.log("Access Token:", tokens.access_token);
    console.log("Refresh Token:", tokens.refresh_token);
}

getToken();
