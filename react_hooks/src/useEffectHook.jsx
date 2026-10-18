import { useEffect, useState } from "react";

const Cart = () => { // update the browser tab title
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Cart (${count})`;
  }, [count]);

  return <button onClick={() => setCount(count + 1)}>Add to cart</button>;
}


export default Cart


// The effect runs when count changes and synchronizes the browser tab title. Effects are for connecting React to things outside React.