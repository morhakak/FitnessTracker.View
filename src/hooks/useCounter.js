import { useState } from "react";

function useCounter(initialValue) {
  const [count, setCount] = useState(initialValue);

  function increase() {
    setCount((c) => c + 1);
  }

  function decrease() {
    setCount((c) => c - 1);
  }

  function reset() {
    setCount(initialValue);
  }

  return { count, increase, decrease, reset };
}

export default useCounter;
