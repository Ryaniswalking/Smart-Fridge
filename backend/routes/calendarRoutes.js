const express = require("express");
const { google } = require("googleapis");
const { convertToNormalTime } = require("../utils/dateUtils")
require("dotenv").config();

const router = express.Router();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    "http://localhost:3000" // Redirect URL (keep this as localhost for testing)
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const calendar = google.calendar({ version: "v3", auth: oauth2Client });

router.get("/events", async (req, res) => {
    try {
        const response = await calendar.events.list({
            calendarId: "primary",
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: "startTime",
        });

        console.log("Response:", response.data.items);
        const formattedEvents = response.data.items.reduce((acc, event) => {
            const eventDate = event.start.date || event.start.dateTime.split("T")[0];

            if (!acc[eventDate]) {
                acc[eventDate] = { events: [] };
            }

            const allDay = event.end.dateTime && event.end.dateTime.includes("T") ? false : true;

            acc[eventDate].events.push({
                title: event.summary,
                start: event.start.date || convertToNormalTime(event.start.dateTime.split("T")[1]),
                end: event.end.date || convertToNormalTime(event.end.dateTime.split("T")[1]),
                allDay: allDay

            });

            return acc;
        }, {});




        res.json(formattedEvents);
    } catch (error) {
        console.error("Error fetching calendar events:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to fetch events" });
    }
});

module.exports = router;
