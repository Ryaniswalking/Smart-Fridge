import React, { useState, useEffect } from "react";

const ReminderCounts = ({ refreshTrigger }) => {
  const [totalCount, setTotalCount] = useState(0);
  const [weeklyCount, setWeeklyCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);

  useEffect(() => {
    const getCounts = async () => {
      //Weekly Counts
      try {
        const response = await fetch(`api/reminders/count?range=Weekly`);
        if (!response.ok) {
          throw new Error(
            `Could not reach server for weekly counts. ${response}`
          );
        }
        const data = await response.json();
        setWeeklyCount(data.count);
      } catch (err) {
        console.log(`Error getting weekly count: ${err}`);
      }
      //Total Counts
      try {
        const response = await fetch(`api/reminders/count?range=Total`);
        if (!response.ok) {
          throw new Error(`Could get total counts. ${response}`);
        }
        const data = await response.json();
        setTotalCount(data.count);
      } catch (err) {
        console.log(`Error getting total counts; ${err}`);
      }
      //Todays Counts
      try {
        const response = await fetch(`api/reminders/count?range=Today`);
        if (!response.ok) {
          throw new Error(`Could not get todays counts. ${response}`);
        }
        const data = await response.json()
        setTodayCount(data.count);
      } catch (err) {
        console.log(`Error getting today's counts. ${err}`);
      }
    };
    getCounts();
  }, [refreshTrigger]);

  return (
    <div className="reminder-counts">
      A: {totalCount} W: {weeklyCount} D: {todayCount}
    </div>
  );
};

export default ReminderCounts;
