import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import CounterAsyncExternal from "./CounterAsyncExternal";
import { act } from "react";
import { getUsersCount } from '../api/users.api';

vi.mock("../api/users.api", () => {
    return {
        getUsersCount: vi.fn(),
    }
});

vi.useFakeTimers({
    shouldAdvanceTime: true,
});

describe("CounterAsyncExternal component", () => {

    beforeEach(() => {
        vi.mocked(getUsersCount).mockResolvedValue(10);
        render(<CounterAsyncExternal />);
    });

    it("should render the initial value from fetchInitialCount", async () => {
        const loadingElement = screen.getByText("Loading...");
        expect(loadingElement).toBeInTheDocument();
        vi.advanceTimersByTime(1500);
        const countValueElement = await screen.findByTestId("countValue");
        expect(countValueElement.textContent).toBe("Count is 10");
    });

    it("should increment the value on increment btn click", async () => {
        vi.advanceTimersByTime(1500);

        const countValueElement = await screen.findByTestId("countValue");
        expect(countValueElement.textContent).toBe("Count is 10");
        act(() => {
            const incrementBtnElement = screen.getByTestId("incrementBtn")
            fireEvent.click(incrementBtnElement);
        });
        const loadingElement = screen.getByText("Loading...");
        expect(loadingElement).toBeInTheDocument();
        expect(screen.getByTestId("incrementBtn")).toBeDisabled();
        vi.advanceTimersByTime(1500);
        const countValEl = await screen.findByTestId("countValue");
        expect(countValEl.textContent).toBe("Count is 11");
        expect(screen.getByTestId("incrementBtn")).toBeEnabled();
    });

    it("should decrement the value on decrement btn click", async () => {
        vi.advanceTimersByTime(1500);
        const countValueElement = await screen.findByTestId("countValue");
        expect(countValueElement.textContent).toBe("Count is 10");
        act(() => {
            const decrementBtnElement = screen.getByTestId("decrementBtn")
            fireEvent.click(decrementBtnElement);
        });
        const loadingElement = screen.getByText("Loading...");
        expect(loadingElement).toBeInTheDocument();
        expect(screen.getByTestId("decrementBtn")).toBeDisabled();
        vi.advanceTimersByTime(1500);
        const countValEl = await screen.findByTestId("countValue");
        expect(countValEl.textContent).toBe("Count is 9");
        expect(screen.getByTestId("decrementBtn")).toBeEnabled();
    });

    it("should reset the value on reset btn click", async () => {
        vi.advanceTimersByTime(1500);
        const countValueElement = await screen.findByTestId("countValue");
        expect(countValueElement.textContent).toBe("Count is 10");
        act(() => {
            const resetBtnElement = screen.getByTestId("resetBtn")
            fireEvent.click(resetBtnElement);
        });
        const loadingElement = screen.getByText("Loading...");
        expect(loadingElement).toBeInTheDocument();
        expect(screen.getByTestId("resetBtn")).toBeDisabled();
        vi.advanceTimersByTime(1500);
        const countValEl = await screen.findByTestId("countValue");
        expect(countValEl.textContent).toBe("Count is 0");
        expect(screen.getByTestId("resetBtn")).toBeEnabled();
    });
});
