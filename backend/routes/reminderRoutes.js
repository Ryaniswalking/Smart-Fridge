const express = require('express');
const { getReminders, saveReminder, updateReminder} = require('../queries/queries')
const { RestartProcess } = require('concurrently');
const { getAllReminders } = require("../controllers/ReminderController");
const router = express.Router()

router.get('/', async (req, res) => {
    try{
        const reminders = await getAllReminders();
        console.log("reminders!", reminders);
        res.json(reminders)
    } catch (err) {
        console.error('Error fetching reminders:', err);
        res.status(500).status('Error fetching reminders');
    }
})

router.post("/add-reminder", async (req, res) => {
    try{
        saveReminder(req.body);
        res.status(201).send("successfully added");
    }catch (err){
        res.status(500).status("Failed to add reminder");
    }
})

router.put("/update-reminder", async (req, res) => {
    try {
        await updateReminder(req.body);
        res.status(201).json({ message: "Reminder updated successfully" });
    } catch (err) {
        console.error("Error updating reminder:", err); // Log the error for debugging
        res.status(500).json({ error: "Failed to update reminder" });
    }

})

module.exports = router;