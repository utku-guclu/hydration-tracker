import React, { createContext, useContext, useState, useEffect } from "react";

import server from "../config/baseURL";

import { useUser } from "./UserContext";

const HydrationContext = createContext();

export const HydrationProvider = ({ children }) => {
  const [totalIntake, setTotalIntake] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(2000);
  const [logs, setLogs] = useState([]);

  const { token } = useUser();

  const fetchHydrationLogs = async () => {
    try {
      if (!token) {
        const hydratedLogs = JSON.parse(localStorage.getItem("hydrationLogs"));
        if (hydratedLogs) {
          setLogs(hydratedLogs);
          setTotalIntake(calculateTotalIntake(hydratedLogs));
        }
        return; // no access db unless valid token
      }
      const response = await fetch(`${server}/api/hydration/logs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const fetchedLogs = await response.json();
        setLogs(fetchedLogs);
        setTotalIntake(calculateTotalIntake(fetchedLogs));
      } else {
        console.error("Failed to fetch hydration logs");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addHydrationLog = async (intake) => {
    try {
      if (!token) {
        const hydratedLogs =
          JSON.parse(localStorage.getItem("hydrationLogs")) || [];
        hydratedLogs.push({ intake, timestamp: Date.now() }); // Assuming timestamp is needed
        localStorage.setItem("hydrationLogs", JSON.stringify(hydratedLogs));
        setLogs(hydratedLogs); // Update state with the new log
        setTotalIntake(calculateTotalIntake(hydratedLogs)); // Update total intake
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
      } else {
        console.error("Failed to add hydration log");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateHydrationLog = async (timestamp, updatedIntake) => {
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
        setTotalIntake(calculateTotalIntake(updatedLogs));
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
        setTotalIntake(calculateTotalIntake(updatedLogs));
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

  const updateDailyGoal = (goal) => {
    if (goal <= 0 || "") return;
    setDailyGoal(goal);
  };

  const calculateTotalIntake = (logs) => {
    return logs.reduce((total, log) => total + log.intake, 0);
  };

  useEffect(() => {
    fetchHydrationLogs();
  }, [token]);

  return (
    <HydrationContext.Provider
      value={{
        totalIntake,
        dailyGoal,
        logs,
        updateDailyGoal,
        fetchHydrationLogs,
        addHydrationLog,
        deleteHydrationLog,
        updateHydrationLog,
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
