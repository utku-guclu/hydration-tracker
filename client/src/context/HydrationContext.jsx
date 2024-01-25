import React, { createContext, useContext, useState } from "react";

const HydrationContext = createContext();

export const HydrationProvider = ({ children }) => {
    const [totalIntake, setTotalIntake] = useState(0);

    const updateTotalIntake = (intake) => {
        setTotalIntake(intake);
    };

    return (
        <HydrationContext.Provider value={{ totalIntake, updateTotalIntake }}>
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
