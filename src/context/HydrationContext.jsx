import React, { createContext, useContext, useState, useEffect } from "react";

import server from "../config/baseURL";

import { useUser } from "./UserContext";

import { useTimer } from "./TimerContext";

import { mlToCups, cupsToMl } from "hydration-converter";

import axios from "axios";

const HydrationContext = createContext();

export const HydrationProvider = ({ children }) => {
  /* states */
  const [totalIntake, setTotalIntake] = useState(0);

  const [logs, setLogs] = useState([]);

  const [isLoadingLogs, setIsLoadingLogs] = useState(false);

  const [isCup, setIsCup] = useState(true);

  const [dailyGoal, setDailyGoal] = useState(
    JSON.parse(localStorage.getItem("dailyGoal")) || 2000
  );

  const [totalIntakeCups, setTotalIntakeCups] = useState(0);

  const [dailyGoalCups, setDailyGoalCups] = useState(0);

  const [recentIntake, setRecentIntake] = useState(0);

  const [thirstiness, setThirstiness] = useState("");

  const [thirstinessColor, setThirstinessColor] = useState(null);

  /* statistics */
  const [statistics, setStatistics] = useState({ 0: 100 });

  /* hooks */
  const { token, userId } = useUser();

  const { timeDifference } = useTimer();

  /* constants */
  const unit = isCup ? "(cup)" : "(ml)";

  const convertedTotal = isCup
    ? isNaN(totalIntakeCups)
      ? 0
      : totalIntakeCups
    : totalIntake;

  const convertedDailyGoal = isCup
    ? isNaN(dailyGoalCups)
      ? 0
      : dailyGoalCups
    : dailyGoal;

  /* for statistics */
  const fetchLogPool = async () => {
    if (!token) return;
    try {
      const response = await axios.get(
        `${server}/api/hydration/logs/statistics`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Assuming you have a valid token
          },
        }
      );
      const data = response.data;
      const { logCount, logPools, totalIntake } = data;
      if (logPools.length > 0) {
        const statisticsData = calculateHourlyIntakeByPercentage(logPools);
        setStatistics(statisticsData);
      }
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const addToLogPool = async (intake) => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${server}/api/hydration/logs/statistics`,
        { intake },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("New log pool added:", response.data);
    } catch (error) {
      console.error("Error adding to log pool:", error);
    }
  };
  const resetLogPool = async () => {
    if (!token) return;
    try {
      const response = await axios.delete(
        `${server}/api/hydration/logs/statistics`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Assuming you have a valid token
          },
        }
      );
      setStatistics({ 0: 100 });
      console.log("Log pools reset successfully");
    } catch (error) {
      console.error("Error resetting log pools:", error);
    }
  };
  /* for logs */
  const fetchHydrationLogs = async () => {
    try {
      if (!token) {
        const hydratedLogs = JSON.parse(localStorage.getItem("hydrationLogs"));
        if (hydratedLogs?.length > 0) {
          const lastIntake = hydratedLogs.slice(-1)[0].intake;
          setRecentIntake(lastIntake);
          setLogs(hydratedLogs);
        }
        return; // no access db unless valid token
      }

      setIsLoadingLogs(true);

      const response = await fetch(`${server}/api/hydration/logs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const fetchedLogs = await response.json();
        const lastIntake = fetchedLogs.slice(-1).intake;
        setRecentIntake(lastIntake);
        setLogs(fetchedLogs);
      } else {
        console.error("Failed to fetch hydration logs");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  const addHydrationLog = async (intake) => {
    // convert unit cup to ml
    intake = isCup ? cupsToMl(intake) : intake;
    calculateThirstinessLevel(intake);

    // update recent intake amount
    setRecentIntake(intake);

    try {
      if (!token) {
        const hydratedLogs =
          JSON.parse(localStorage.getItem("hydrationLogs")) || [];
        hydratedLogs.push({ intake, dailyGoal, timestamp: Date.now() }); // Assuming timestamp is needed
        localStorage.setItem("hydrationLogs", JSON.stringify(hydratedLogs));
        setLogs(hydratedLogs); // Update state with the new log
        return; // Exit without accessing the database
      }

      const response = await fetch(`${server}/api/hydration/logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ intake }),
      });

      if (response.ok) {
        await fetchHydrationLogs();
        await addToLogPool(intake);
        await fetchLogPool();
      } else {
        console.error("Failed to add hydration log");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateHydrationLog = async (timestamp, updatedIntake) => {
    // convert unit cup to ml
    updatedIntake = isCup ? cupsToMl(updatedIntake) : updatedIntake;

    try {
      if (!token) {
        // Handle update in localStorage if user is not logged in
        const hydratedLogs =
          JSON.parse(localStorage.getItem("hydrationLogs")) || [];
        const updatedLogs = hydratedLogs.map((log) => {
          if (log.timestamp === timestamp) {
            return { ...log, intake: updatedIntake };
          }
          return log;
        });
        localStorage.setItem("hydrationLogs", JSON.stringify(updatedLogs));
        setLogs(updatedLogs);
        return;
      }

      const response = await fetch(
        `${server}/api/hydration/logs/${timestamp}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            intake: updatedIntake,
          }),
        }
      );

      if (response.ok) {
        await fetchHydrationLogs();
      } else {
        console.error("Failed to update hydration log");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteHydrationLog = async (timestamp) => {
    try {
      if (!token) {
        // Handle deletion from localStorage if user is not logged in
        const hydratedLogs =
          JSON.parse(localStorage.getItem("hydrationLogs")) || [];
        const updatedLogs = hydratedLogs.filter(
          (log) => log.timestamp !== timestamp
        );
        localStorage.setItem("hydrationLogs", JSON.stringify(updatedLogs));
        setLogs(updatedLogs);

        return;
      }

      const response = await fetch(
        `${server}/api/hydration/logs/${timestamp}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        await fetchHydrationLogs();
      } else {
        console.error("Failed to delete hydration log");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const resetLogs = async () => {
    try {
      if (!token) {
        localStorage.removeItem("hydrationLogs");
        setLogs([]);

        return;
      }

      const response = await fetch(`${server}/api/hydration/logs/reset`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        setLogs([]);
        console.log("Hydration logs reset successfully");
      } else {
        console.error("Failed to reset hydration logs");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateDailyGoal = (goal) => {
    goal = isCup ? cupsToMl(goal) : goal;
    if (goal <= 0 || "") return;
    setDailyGoal(goal);
    localStorage.setItem("dailyGoal", JSON.stringify(goal));
  };

  const calculateTotalIntake = (logs) => {
    return logs.reduce((total, log) => total + log.intake, 0);
  };

  const calculateHourlyIntakeByPercentage = (logPool) => {
    // Initialize an object to hold hourly intake totals
    const hourlyIntakeTotals = {};

    // Group intake by hour
    logPool.forEach((entry) => {
      const hour = new Date(entry.timestamp).getHours();
      hourlyIntakeTotals[hour] = (hourlyIntakeTotals[hour] || 0) + entry.intake;
    });

    // Calculate hourly intake percentage
    const totalIntake = logPool.reduce(
      (total, entry) => total + entry.intake,
      0
    );
    const hourlyIntakePercentage = {};

    Object.keys(hourlyIntakeTotals).forEach((hour) => {
      hourlyIntakePercentage[hour] =
        (hourlyIntakeTotals[hour] / totalIntake) * 100;
    });

    return hourlyIntakePercentage;
  };

  const switchUnit = () => {
    setIsCup((prev) => !prev);
  };

  const calculateThirstinessLevel = (intake, timeSinceLastDrink) => {
    // Determine the user's current thirstiness level based on recent intake and time since last drink
    if (timeSinceLastDrink >= 3600) {
      setThirstinessColor("var(--danger)");
      return "Very Thirsty"; // If it has been more than 1 hour since the last drink, the user is very thirsty
    } else if (intake === 0) {
      setThirstinessColor("var(--threat)");
      return "Dehydrated"; // If the recent intake is 0, the user is dehydrated
    } else if (intake < 500 && timeSinceLastDrink >= 3000) {
      setThirstinessColor("var(--warning)");
      return "Slightly Thirsty"; // If intake is low and 10 mins passed
    } else if (intake < 1000 && timeSinceLastDrink >= 1800) {
      setThirstinessColor("var(--sea)");
      return "Moderately Thirsty"; // If intake is moderate and 30 mins passed
    } else {
      setThirstinessColor("var(--water)");
      return "Hydrated"; // Otherwise, the user is hydrated
    }
  };

  useEffect(() => {
    setTotalIntake(calculateTotalIntake(logs));
  }, [logs]);

  useEffect(() => {
    fetchHydrationLogs();
    fetchLogPool();
  }, [token]);

  useEffect(() => {
    setTotalIntakeCups(mlToCups(totalIntake));
  }, [totalIntake]);

  useEffect(() => {
    setDailyGoalCups(mlToCups(dailyGoal));
  }, [dailyGoal]);

  useEffect(() => {
    const thirstinessLevel = calculateThirstinessLevel(
      recentIntake,
      timeDifference
    );
    setThirstiness(thirstinessLevel);
  }, [recentIntake, timeDifference]);

  return (
    <HydrationContext.Provider
      value={{
        totalIntake,
        totalIntakeCups,
        dailyGoal,
        logs,
        updateDailyGoal,
        fetchHydrationLogs,
        addHydrationLog,
        deleteHydrationLog,
        updateHydrationLog,
        switchUnit,
        isCup,
        unit,
        convertedTotal,
        convertedDailyGoal,
        resetLogs,
        thirstiness,
        isLoadingLogs,
        thirstinessColor,
        statistics,
        resetLogPool,
      }}
    >
      {children}
    </HydrationContext.Provider>
  );
};

export const useHydration = () => {
  const context = useContext(HydrationContext);
  if (!context) {
    throw new Error("useHydration must be used within a HydrationProvider");
  }
  return context;
};
