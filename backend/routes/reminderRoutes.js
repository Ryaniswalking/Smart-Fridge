const express = require('express');
const { getReminders } = require('../queries/queries')

const router = express.Router()

router.get('/', async (req, res) => {
    try{
        const results = await getReminders();
        res.json(results);
    } catch (err) {
        console.error('Error fetching reminders:', err);
        res.status(500).status('Error fetching reminders');
    }
})

module.exports = router;