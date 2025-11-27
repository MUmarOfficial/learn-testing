import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import CounterAsync from "./CounterAsync";

describe("CounterAsync component", () => {
    const mockFetchInitialCount = vi.fn();

    beforeEach(() => {
        mockFetchInitialCount.mockResolvedValue(10);
    });

    it("should render the initial value from fetchInitialCount", async () => {
        render(<CounterAsync fetchInitialCount={mockFetchInitialCount} />);
        const loadingElement = screen.getByText("Loading...");
        expect(loadingElement).toBeInTheDocument();
        const countValueElement = await screen.findByTestId("countValue");
        expect(countValueElement.textContent).toBe("Count is 10");
    });
});

