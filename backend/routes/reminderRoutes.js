const express = require("express");
const {
  getReminders,
  saveReminder,
  updateReminder,
} = require("../queries/queries");
const { RestartProcess } = require("concurrently");
const {
  getAllReminders,
  getWeeklyCount,
  getTotalCount,
  getTodayCount
} = require("../controllers/ReminderController");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const reminders = await getAllReminders();
    res.json(reminders);
  } catch (err) {
    console.error("Error fetching reminders:", err);
    res.status(500).status("Error fetching reminders");
  }
});

router.post("/add-reminder", async (req, res) => {
  try {
    saveReminder(req.body);
    res.status(201).send("successfully added");
  } catch (err) {
    res.status(500).status("Failed to add reminder");
  }
});

router.put("/update-reminder", async (req, res) => {
  try {
    await updateReminder(req.body);
    res.status(201).json({ message: "Reminder updated successfully" });
  } catch (err) {
    console.error("Error updating reminder:", err); // Log the error for debugging
    res.status(500).json({ error: "Failed to update reminder" });
  }
});

router.get("/count", async (req, res) => {
  try {
    const rangeType = req.query.range;
    let count;

    switch (rangeType) {
      case "Weekly":
        count = await getWeeklyCount();
        break;
      case "Total":
        count = await getTotalCount();
        break;
      case "Today":
        count = await getTodayCount();
        break;
      default:
        throw new Error("Invalid range");
    }
    
    if (count) {
      res.status(200).json({ count });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});
module.exports = router;
