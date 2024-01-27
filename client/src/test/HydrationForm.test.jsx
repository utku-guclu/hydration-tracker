import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import HydrationForm from "../components/HydrationForm";

test("renders HydrationForm component", () => {
    render(<HydrationForm onSubmitSuccess={() => {}} />);
    const formElement = screen.getByTestId("hydration-form");

    // Add your assertions here
    expect(formElement).toBeInTheDocument();
});

test("submits the form successfully", async () => {
    render(<HydrationForm onSubmitSuccess={() => {}} />);

    const inputElement = screen.getByLabelText("Water Intake (ml):");
    const submitButton = screen.getByText("Log Water Intake");

    fireEvent.change(inputElement, { target: { value: "500" } });
    fireEvent.click(submitButton);

    // Use waitFor with an asynchronous assertion
    await waitFor(
        async () => {
            // Check for success message or any other indicators
            const successMessage = "Hydration log added successfully";

            // You might need to adjust the selector based on your actual success message element
            const successMessageElement = screen.getByText(successMessage);

            // Assert that the success message is present in the DOM
            expect(successMessageElement).toBeInTheDocument();
        },
        { timeout: 10000 }
    ); // Increase the timeout if needed
});
