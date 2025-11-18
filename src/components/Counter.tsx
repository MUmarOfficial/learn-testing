import { useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount((count) => count + 1);
    };

    const decrement = () => {
        setCount((count) => count - 1);
    };

    const reset = () => {
        setCount(0);
    };

    return (
        <div className="m-4 p-6 flex flex-col justify-center items-center">
            <h2 className='text-3xl mb-8'>
                Count is {count}
            </h2>
            <div className="actions flex gap-4 items-center">
                <button onClick={decrement}>
                    Decrement
                </button><button onClick={reset}>
                    Reset
                </button><button onClick={increment}>
                    Increment
                </button>
            </div>
        </div>
    );
};

export default Counter;
