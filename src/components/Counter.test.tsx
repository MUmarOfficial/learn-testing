import { render, screen } from "@testing-library/react"
import Counter from "./Counter";
import { describe, it, expect } from "vitest";

describe("Counter Component", () => {
    it("should render correct counter value", () => {
        render(<Counter />);
        const counterValElement = screen.getByTestId("counterValue");
        expect(counterValElement.textContent).toBe("");
    });
});