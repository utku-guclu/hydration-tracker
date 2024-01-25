import React, { useState } from "react";

function HydrationForm({ onSubmitSuccess }) {
    const [waterIntakeLocal, setWaterIntakeLocal] = useState(0);

    const handleFormSubmit = async (e) => {
        if (waterIntakeLocal <= 0 || "") return;

        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:3000/api/hydration-logs",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        intake: parseInt(waterIntakeLocal, 10),
                    }),
                }
            );

            if (response.ok) {
                console.log("Hydration log added successfully");
                onSubmitSuccess();
            } else {
                console.error("Failed to add hydration log");
            }
        } catch (error) {
            console.error("Error:", error);
        }

        console.log(`Submitted water intake: ${waterIntakeLocal} ml`);
    };

    return (
        <div>
            <h2>Log Your Water Intake</h2>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Water Intake (ml):
                    <input
                        type="number"
                        value={waterIntakeLocal}
                        onChange={(e) => setWaterIntakeLocal(e.target.value)}
                    />
                </label>
                <button type="submit">Log Water Intake</button>
            </form>
        </div>
    );
}

export default HydrationForm;
