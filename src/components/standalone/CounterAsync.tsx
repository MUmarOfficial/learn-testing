import { useState, useEffect, type FC } from 'react';

export type CounterAsyncProps = {
  fetchInitialCount: () => Promise<number>
}

const CounterAsync: FC<CounterAsyncProps> = ({ fetchInitialCount }) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const FAKE_TIMEOUT = 1500;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const initialCount = await fetchInitialCount();
      setCount(initialCount);
      setLoading(false);
    };
    fetchData();
  }, [fetchInitialCount]);

  const incrementAsync = () => {
    setLoading(true);
    setTimeout(() => {
      setCount((prevCount) => prevCount + 1);
      setLoading(false);
    }, FAKE_TIMEOUT);
  };

  const decrementAsync = () => {
    setLoading(true);
    setTimeout(() => {
      setCount((prevCount) => {
        if (prevCount === 0) {
          return prevCount;
        } else {
          return prevCount - 1;
        }
      });
      setLoading(false);
    }, FAKE_TIMEOUT);
  };

  const resetAsync = () => {
    setLoading(true);
    setTimeout(() => {
      setCount(0);
      setLoading(false);
    }, FAKE_TIMEOUT);
  }

  return (
    <div className="p-6 flex flex-col justify-center items-center">
      <h2 className="mb-10 text-xl">Async Counter</h2>
      {loading ? <h3 className='text-3xl mb-8'>Loading...</h3> : <h3 className='text-3xl mb-8' data-testid="countValue">
        Count is {count}
      </h3>}
      <div className="actions flex gap-4 items-center">
        <button data-testid="decrementBtn" disabled={loading} onClick={decrementAsync}>
          Decrement Async
        </button>
        <button data-testid="resetBtn" disabled={loading} onClick={resetAsync}>
          Reset Async
        </button>
        <button data-testid="incrementBtn" disabled={loading} onClick={incrementAsync}>
          Increment
        </button>
      </div>
    </div>
  );
}

export default CounterAsync;
