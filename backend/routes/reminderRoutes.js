const express = require('express');
const { getReminders, saveReminder, updateReminder} = require('../queries/queries')
const { parseReminder } = require('../models/reminder');
const { RestartProcess } = require('concurrently');

const router = express.Router()

router.get('/', async (req, res) => {
    try{
        const results = await getReminders();
        const reminders = parseReminder(results);
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
    try{
        await updateReminder(req.body);
        res.status(200)
    } catch (err) {
        res.status(500).status("Failed to update reminder");
    }

})

module.exports = router;