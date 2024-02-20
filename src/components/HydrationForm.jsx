// src/components/HydrationForm.jsx
import React, { useState } from "react";

function HydrationForm({ onSubmitSuccess }) {
    const [waterIntake, setWaterIntake] = useState(0);

    const handleInputChange = (e) => {
        setWaterIntake(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to the server endpoint
            const response = await fetch(
                "http://localhost:3008/api/hydration-logs",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        intake: parseInt(waterIntake, 10),
                    }),
                }
            );

            if (response.ok) {
                console.log("Hydration log added successfully");
                // Call the callback function to trigger a re-fetch
                onSubmitSuccess();
            } else {
                console.error("Failed to add hydration log");
            }
        } catch (error) {
            console.error("Error:", error);
        }

        console.log(`Submitted water intake: ${waterIntake} ml`);
    };

    return (
        <div>
            <h2>Log Your Water Intake</h2>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Water Intake (ml):
                    <input
                        type="number"
                        value={waterIntake}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Log Water Intake</button>
            </form>
        </div>
    );
}

export default HydrationForm;
