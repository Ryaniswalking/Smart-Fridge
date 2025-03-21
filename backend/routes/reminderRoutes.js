const express = require('express');
const { getReminders, saveReminder } = require('../queries/queries')
const { parseReminder } = require('../models/reminder');

const router = express.Router()

router.get('/', async (req, res) => {
    try{
        const results = await getReminders();
        const reminders = parseReminder(results);
        res.json(reminders)
        // res.json(results);
    } catch (err) {
        console.error('Error fetching reminders:', err);
        res.status(500).status('Error fetching reminders');
    }
})

router.post("/add-reminder", (req, res) => {
    try{
        console.log(req.body);
        saveReminder(req.body);
        res.status(200).send("successfully added");
    }catch (err){
        res.status(500).status("NAS QUEEN");
    }
})

module.exports = router;