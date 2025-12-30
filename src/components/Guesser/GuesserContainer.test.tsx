import { act, fireEvent, render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest";
import GuesserContainer from "./GuesserContainer";
import { type ReactNode } from "react";
import { GuesserContextProvider } from "./GuesserContext";
import { beforeEach } from "node:test";

vi.mock("../../lib/randomizer.ts", () => {
    return {
        MAX_NUM: 5,
        getRandomValue: vi.fn(() => '3'),
    }
});

const renderWithContext = (component: ReactNode) => {
    render(
        <GuesserContextProvider>
            {component}
        </GuesserContextProvider>
    );
};

const guessANumber = (val: string) => {
    const inputEl = screen.getByTestId("guessInputEl");
    const submitBtn = screen.getByTestId("submitBtn");
    act(() => {
        fireEvent.change(inputEl, {
            target: {
                value: val,
            },
        });
        fireEvent.click(submitBtn);
    });
}

describe("GuesserContainer component", () => {

    beforeEach(() => {
        renderWithContext(<GuesserContainer />);
    });

    it("should render the initial UI message with random prompt", () => {
        expect(screen.getByText(/Guess an integer between 1 and/i));
    });

    it("should congrats on a successful guess", async () => {
        guessANumber("3");
        const successMessage = await screen.findByText(/Congratulations! Great guess ✅ The random number was 3/i)
        expect(successMessage).toBeInTheDocument();
    });

    it("should display the failure message & try again btn", async () => {
        guessANumber("2");
        const failureMessage = await screen.findByText(/Wrong guess ❌. The random number was 3/i)
        expect(failureMessage).toBeInTheDocument();
        const tryAgainBtn = screen.getByTestId("tryAgainBtn");
        expect(tryAgainBtn).toBeInTheDocument();
    });

    it("should reset the UI on tryAgainBtn click", async () => {
        guessANumber("1");
        const tryAgainBtn = screen.getByTestId("tryAgainBtn");
        expect(tryAgainBtn).toBeInTheDocument();
        act(() => {
            fireEvent.click(tryAgainBtn);
        });
        expect(screen.getByText(/Guess an integer between 1 and/i));
        expect(screen.getByTestId("submitBtn")).toBeInTheDocument();
        expect(screen.getByTestId("guessInputEl")).toBeEnabled();
    });

});