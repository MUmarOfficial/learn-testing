import Counter from "./components/Counter";
import CounterAsync from "./components/CounterAsync";
import "./App.css";

function App() {
  return (
    <>
      <h1 data-testid="headline" className="text-3xl text-center m-4">Counter React App</h1>
      <div className="counters">
        <Counter />
        <CounterAsync
          fetchInitialCount={() => {
            return Promise.resolve(10);
          }}
        />
      </div>
    </>
  );
};

export default App;
