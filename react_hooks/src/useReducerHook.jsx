import { useReducer } from "react";

function cartReducer(cart, action) {
  if (action.type === "add") {
    return [...cart, action.product];
  }
  if (action.type === "clear") {
    return [];
  }
  return cart;
}

function Cart() { // manage cart changes
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <>
      <button
        onClick={() =>
          dispatch({ type: "add", product: "Coffee" })
        }
      >
        Add coffee
      </button>
      <button onClick={() => dispatch({ type: "clear" })}>
        Clear cart
      </button>
      <p>Items in cart: {cart.length}</p>
    </>
  );
}


// A reducer is useful when state has several possible actions.
