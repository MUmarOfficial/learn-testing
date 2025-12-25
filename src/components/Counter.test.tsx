import { render, screen, fireEvent } from "@testing-library/react"
import Counter from "./Counter";
import { describe, it, expect, beforeEach } from "vitest";

describe("Counter Component", () => {

    beforeEach(() => {
        render(<Counter />);
    });

    // use it.only(..) if you want to run particular test

    it("should show 0 as initial count", () => {
        const counterValueElement = screen.getByTestId("counterValue");
        expect(counterValueElement.textContent).toBe("Count is 0");
    });

    it("should increment the count value on increment button click", () => {
        const counterValueElement = screen.getByTestId("counterValue");
        expect(counterValueElement.textContent).toBe("Count is 0");
        const incrementBtnElement = screen.getByTestId("incrementBtn");
        fireEvent.click(incrementBtnElement);
        expect(counterValueElement.textContent).toBe("Count is 1");
    });

    it("should decrease the count value on decrement button click", () => {
        const incrementBtnElement = screen.getByTestId("incrementBtn");
        for (let countClick = 1; countClick <= 5; countClick++) {
            fireEvent.click(incrementBtnElement);
        };
        const counterValueElement = screen.getByTestId("counterValue");
        expect(counterValueElement.textContent).toBe("Count is 5");
        const decrementBtnElement = screen.getByTestId("decrementBtn");
        fireEvent.click(decrementBtnElement);
        expect(counterValueElement.textContent).toBe("Count is 4");
    });

    it("should remain the count value 0 if is 0 on decrement button click", () => {
        const counterValueElement = screen.getByTestId("counterValue");
        expect(counterValueElement.textContent).toBe("Count is 0");
        const decrementBtnElement = screen.getByTestId("decrementBtn");
        fireEvent.click(decrementBtnElement);
        expect(counterValueElement.textContent).toBe("Count is 0");
    });

    it("should reset the count value on reset button click", () => {
        const incrementBtnElement = screen.getByTestId("incrementBtn");
        for (let countClick = 1; countClick <= 8; countClick++) {
            fireEvent.click(incrementBtnElement);
        };
        const counterValueElement = screen.getByTestId("counterValue");
        expect(counterValueElement.textContent).toBe("Count is 8");
        const resetBtnElement = screen.getByTestId("resetBtn");
        fireEvent.click(resetBtnElement);
        expect(counterValueElement.textContent).toBe("Count is 0");
    });
});