import axios from "axios";
import { cupsToMl } from "hydration-converter";

import server from "../config/baseURL";

import blobToBase64 from "../utils/blobToBase64";

export const fetchLogPool = async (token, setStatistics, calcHourlyIntake) => {
  if (!token) return;
  try {
    const response = await axios.get(
      `${server}/api/hydration/logs/statistics`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { logPools } = response.data;
    if (logPools.length > 0) {
      const statisticsData = calcHourlyIntake(logPools);
      setStatistics(statisticsData);
    }
  } catch (error) {
    console.error("Error fetching statistics:", error);
  }
};

export const addToLogPool = async (token, intake) => {
  if (!token) return;
  try {
    await axios.post(
      `${server}/api/hydration/logs/statistics`,
      { intake },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error adding to log pool:", error);
  }
};

export const resetPool = async (token, setStatistics) => {
  if (!token) return;
  try {
    await axios.delete(`${server}/api/hydration/logs/statistics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setStatistics({ 0: 100 });
    console.log("Log pools reset successfully");
  } catch (error) {
    console.error("Error resetting log pools:", error);
  }
};

export const fetchLogs = async (
  token,
  setRecentIntake,
  setLogs,
  setIsLoadingLogs
) => {
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

export const addHydrationLog = async (
  token,
  intake,
  dailyGoal,
  isCup,
  setRecentIntake,
  setLogs,
  updateCallback
) => {
  // convert unit cup to ml
  intake = isCup ? cupsToMl(intake) : parseInt(intake);
  // update recent intake amount
  setRecentIntake(intake);

  try {
    if (!token) {
      const hydratedLogs =
        JSON.parse(localStorage.getItem("hydrationLogs")) || [];
      hydratedLogs.push({ intake, dailyGoal, timestamp: Date.now() });
      localStorage.setItem("hydrationLogs", JSON.stringify(hydratedLogs));
      setLogs(hydratedLogs);
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
      await updateCallback(intake);
    } else {
      console.error("Failed to add hydration log");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const updateHydrationLog = async (
  token,
  timestamp,
  updatedIntake,
  setLogs,
  fetchHydrationLogs,
  isCup
) => {
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

    const response = await fetch(`${server}/api/hydration/logs/${timestamp}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        intake: updatedIntake,
      }),
    });

    if (response.ok) {
      await fetchHydrationLogs();
    } else {
      console.error("Failed to update hydration log");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deleteHydrationLog = async (
  token,
  timestamp,
  setLogs,
  fetchHydrationLogs
) => {
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

    const response = await fetch(`${server}/api/hydration/logs/${timestamp}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      await fetchHydrationLogs();
    } else {
      console.error("Failed to delete hydration log");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const resetLogs = async (token, userId, setLogs) => {
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

export const generateImage = async (token, hydrationStatus) => {
  if (!token) return;
  try {
    const response = await fetch(`${server}/api/hydration/logs/generateImage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ hydrationStatus }),
    });
    if (response.ok) {
      console.log(response)
      const url = blobToBase64(response)
      console.log(url)
    } else {
      console.log("Failed to send hydration status");
    }
  } catch (error) {
    console.log("Error:", error);
  }
};
