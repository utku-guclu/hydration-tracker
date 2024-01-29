import React, { createContext, useContext, useState } from "react";

const HydrationContext = createContext();

export const HydrationProvider = ({ children }) => {
  const [totalIntake, setTotalIntake] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(2000);

  const updateTotalIntake = (intake) => {
    setTotalIntake(intake);
  };

  const updateDailyGoal = (goal) => {
    if (goal <= 0 || "") return;
    setDailyGoal(goal);
  };

  return (
    <HydrationContext.Provider
      value={{ totalIntake, dailyGoal, updateTotalIntake, updateDailyGoal }}
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
