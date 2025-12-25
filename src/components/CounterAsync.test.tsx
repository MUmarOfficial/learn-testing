import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import CounterAsync from "./CounterAsync";

describe("CounterAsync component", () => {
    const mockFetchInitialCount = vi.fn();

    beforeEach(() => {
        mockFetchInitialCount.mockResolvedValue(10);
        render(<CounterAsync fetchInitialCount={mockFetchInitialCount} />);

    });

    it("should render the initial value from fetchInitialCount", async () => {
        const loadingElement = screen.getByText("Loading...");
        expect(loadingElement).toBeInTheDocument();
        const countValueElement = await screen.findByTestId("countValue");
        expect(countValueElement.textContent).toBe("Count is 10");
    });

    it("should increment the value on increment btn click", async () => {
        const loadingElement = screen.getByText("Loading...");
        expect(loadingElement).toBeInTheDocument();
        const countValueElement = await screen.findByTestId("countValue");
        expect(countValueElement.textContent).toBe("Count is 10");
        const incrementBtnElement = screen.getByTestId("incrementBtn")
        fireEvent.click(incrementBtnElement);
        expect(countValueElement.textContent).toBe("Count is 11");
    });
});

