import { render, screen } from "@testing-library/react"
import App from "./App";
import { describe, it, expect } from "vitest";

describe("App Component", () => {
    it("should render correct headline", async () => {
        render(<App />);
        const headlineElement = screen.getByTestId("headline");
        expect(headlineElement.textContent).toBe("Guess the number");
    });
});