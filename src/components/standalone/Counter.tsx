import { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount((count) => count + 1);
    };

    const decrement = () => {
        if(count === 0){
            return count;
        }
        setCount((count) => count - 1);
    };

    const reset = () => {
        setCount(0);
    };

    return (
        <div className="p-6 flex flex-col justify-center items-center">
            <h2 className="mb-10 text-xl">Simple Counter</h2>
            <h2 data-testid="counterValue" className="text-3xl mb-8">
                Count is {count}
            </h2>
            <div className="actions flex gap-4 items-center">
                <button data-testid="decrementBtn" onClick={decrement}>
                    Decrement
                </button>
                <button data-testid="resetBtn" onClick={reset}>
                    Reset
                </button>
                <button data-testid="incrementBtn" onClick={increment}>
                    Increment
                </button>
            </div>
        </div>
    );
};

export default Counter;
