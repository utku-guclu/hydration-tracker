import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

import { useUser } from "./UserContext";

import { useTimer } from "./TimerContext";

import { mlToCups, cupsToMl } from "hydration-converter";

import { ThemeContext } from "./Theme"

import {
  resetPool,
  fetchLogs,
  fetchLogPool,
  addToLogPool,
  generateHydrationImage,
} from "../services/hydrationService";

import { ThemeContext } from "./Theme";

import {
  resetPool,
  fetchLogs,
  fetchLogPool,
  addToLogPool,
} from "../services/hydrationService";

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
  const [thirstinessColor, setThirstinessColor] = useState("var(--gray)");
  const [statistics, setStatistics] = useState({ 0: 0 });

  // Define a state variable to track whether the image has been fetched
  const [isImageFetched, setIsImageFetched] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  /* hooks */
  const { token } = useUser();
  const { timeDifference } = useTimer();
  const { theme, isDarkTheme } = useContext(ThemeContext);

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

  const resetLogPool = () => resetPool(token, setStatistics);

  const fetchHydrationLogs = () =>
    fetchLogs(token, setRecentIntake, setLogs, setIsLoadingLogs);

  const updateCall = async (intake) => {
    await fetchLogs(token, setRecentIntake, setLogs, setIsLoadingLogs);
    await addToLogPool(token, intake);
    await fetchLogPool(token, setStatistics, calculateHourlyIntakeByPercentage);
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
      hourlyIntakePercentage[hour] = (
        (hourlyIntakeTotals[hour] / totalIntake) *
        100
      ).toFixed(0);
    });

    return hourlyIntakePercentage;
  };

  const switchUnit = () => {
    setIsCup((prev) => !prev);
  };

  const calculateThirstinessLevel = (intake, timeSinceLastDrink, theme) => {
    // Determine the user's current thirstiness level based on recent intake and time since last drink
    if (timeSinceLastDrink >= 3600) {
      setThirstinessColor(theme.danger);
      return "Very Thirsty"; // If it has been more than 1 hour since the last drink, the user is very thirsty
    } else if (intake === 0) {
      setThirstinessColor(theme.threat);
      return "Dehydrated"; // If the recent intake is 0, the user is dehydrated
    } else if (intake < 500 && timeSinceLastDrink >= 3000) {
      setThirstinessColor(theme.warning);
      return "Slightly Thirsty"; // If intake is low and 10 mins passed
    } else if (intake < 1000 && timeSinceLastDrink >= 1800) {
      setThirstinessColor(theme.sea);
      return "Moderately Thirsty"; // If intake is moderate and 30 mins passed
    } else {
      setThirstinessColor(theme.hydrated);
      return "Hydrated"; // Otherwise, the user is hydrated
    }
  };

  useEffect(() => {
    setTotalIntake(calculateTotalIntake(logs));
  }, [logs]);

  useEffect(() => {
    fetchHydrationLogs();
    fetchLogPool(token, setStatistics, calculateHourlyIntakeByPercentage);
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
      timeDifference,
      theme
    );
    setThirstiness(thirstinessLevel);
  }, [recentIntake, timeDifference, theme]);

  // fetch hydration image
  useMemo(() => {
    async function fetchHydrationImage() {
      try {
        console.log("fetching img..");
        const response = await generateHydrationImage(token, thirstiness);
        // Set the state variable to true to indicate that the image has been fetched
        setImageUrl(response);
        setIsImageFetched(true);
      } catch (error) {
        console.log("Error fetching Hydration Image", error);
      }
    }

    // Fetch the image only if it hasn't been fetched before and all necessary data is available
    if (thirstiness && token) {
      fetchHydrationImage();
    }
  }, [thirstiness, token]);

  // useEffect to reset isImageFetched when thirstiness or token changes
  useEffect(() => {
    setIsImageFetched(false);
  }, [thirstiness, token]);

  return (
    <HydrationContext.Provider
      value={{
        totalIntake,
        dailyGoal,
        logs,
        updateDailyGoal,
        fetchHydrationLogs,
        switchUnit,
        isCup,
        unit,
        convertedTotal,
        convertedDailyGoal,
        thirstiness,
        isLoadingLogs,
        thirstinessColor,
        statistics,
        setRecentIntake,
        recentIntake,
        setLogs,
        resetLogPool,
        updateCall,
      }}
    >
      {children}
      {/* Apply background styling using pseudo-element */}
      <style>{`
        body::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          filter: saturate(1.2) contrast(1.3);
          z-index: -1;
          background-image: url('${isCup && !isDarkTheme ? imageUrl : ""}');
        }
      `}</style>
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
