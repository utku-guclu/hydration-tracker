import React, { createContext, useContext, useState, useEffect } from "react";

import server from "../config/baseURL";

import { useUser } from "./UserContext";

import { mlToCups, cupsToMl } from "hydration-converter";

const HydrationContext = createContext();

export const HydrationProvider = ({ children }) => {
  /* states */
  const [totalIntake, setTotalIntake] = useState(0);

  const [logs, setLogs] = useState([]);

  const [isCup, setIsCup] = useState(false);

  const [dailyGoal, setDailyGoal] = useState(
    JSON.parse(localStorage.getItem("dailyGoal")) || 2000
  );

  const [totalIntakeCups, setTotalIntakeCups] = useState(0);

  const [dailyGoalCups, setDailyGoalCups] = useState(0);

  /* hooks */
  const { token } = useUser();

  /* constants */
  const unit = isCup ? "(cup)" : "(ml)";

  const convertedTotal = isCup ? totalIntakeCups : totalIntake;

  const convertedDailyGoal = isCup ? dailyGoalCups : dailyGoal;

  const fetchHydrationLogs = async () => {
    try {
      if (!token) {
        const hydratedLogs = JSON.parse(localStorage.getItem("hydrationLogs"));
        if (hydratedLogs) {
          setLogs(hydratedLogs);
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
      } else {
        console.error("Failed to fetch hydration logs");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addHydrationLog = async (intake) => {
    // convert unit cup to ml
    intake = isCup ? cupsToMl(intake) : intake;

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

  const updateDailyGoal = (goal) => {
    goal = isCup ? cupsToMl(goal) : goal;
    if (goal <= 0 || "") return;
    setDailyGoal(goal);
    localStorage.setItem("dailyGoal", JSON.stringify(goal));
  };

  const calculateTotalIntake = (logs) => {
    return logs.reduce((total, log) => total + log.intake, 0);
  };

  const switchUnit = () => {
    setIsCup((prev) => !prev);
  };

  useEffect(() => {
    setTotalIntake(calculateTotalIntake(logs));
  }, [logs]);

  useEffect(() => {
    fetchHydrationLogs();
  }, [token]);

  useEffect(() => {
    setTotalIntakeCups(mlToCups(totalIntake));
  }, [totalIntake]);

  useEffect(() => {
    setDailyGoalCups(mlToCups(dailyGoal));
  }, [dailyGoal]);

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
