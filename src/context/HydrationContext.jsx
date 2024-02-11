import React, { createContext, useContext, useState, useEffect } from "react";
import server from "../config/baseURL";

const HydrationContext = createContext();

export const HydrationProvider = ({ children }) => {
  const [totalIntake, setTotalIntake] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(2000);
  const [logs, setLogs] = useState([]);

  const addHydrationLog = async (intake) => {
    try {
      const response = await fetch(`${server}/api/hydration/logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ intake }),
      });

      if (response.ok) {
        await fetchHydrationLogs();
      } else {
        console.error("Failed to add hydration log");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchHydrationLogs = async () => {
    try {
      const response = await fetch(`${server}/api/hydration/logs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const fetchedLogs = await response.json();
        setLogs(fetchedLogs);
        updateTotalIntake(calculateTotalIntake(fetchedLogs));
      } else {
        console.error("Failed to fetch hydration logs");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateTotalIntake = (intake) => {
    setTotalIntake(intake);
  };

  const updateDailyGoal = (goal) => {
    if (goal <= 0 || "") return;
    setDailyGoal(goal);
  };

  const calculateTotalIntake = (logs) => {
    return logs.reduce((total, log) => total + log.intake, 0);
  };

  useEffect(() => {
    fetchHydrationLogs();
  }, []);

  return (
    <HydrationContext.Provider
      value={{
        totalIntake,
        dailyGoal,
        logs,
        updateTotalIntake,
        updateDailyGoal,
        fetchHydrationLogs,
        addHydrationLog,
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
