import { memo, useCallback, useState } from "react";

const AddButton = memo(function AddButton({ onAdd }) {
  return <button onClick={onAdd}>Add item</button>;
});

function Shop() { // pass a stable function to a memoized child
  const [count, setCount] = useState(0);

  const addItem = useCallback(() => {
    setCount((current) => current + 1);
  }, []);

  return (
    <>
      <p>Items: {count}</p>
      <AddButton onAdd={addItem} />
    </>
  );
}

// useCallback keeps the same function reference between renders unless its dependencies change. It’s mainly useful for performance optimizations.