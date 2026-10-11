
// rafce - React Arrow Function Component Export (snippet)


//  🔗 What is a **Hook** in React?

/*

In **React**, a **hook** is a special function that lets you **“hook into”** React features — like **state**, **lifecycle methods**, and **context** — **without writing a class**.

---

### 📌 Why use Hooks?

Hooks let you use state and other React features in **functional components** instead of class components.

---

### 🧩 Commonly Used Hooks

| Hook          | Purpose                                                         |
| ------------- | --------------------------------------------------------------- |
| `useState`    | To add state to a functional component                          |
| `useEffect`   | To perform side effects (e.g. fetch data, set up subscriptions) |
| `useContext`  | To access context API in functional components                  |
| `useRef`      | To reference DOM elements or hold mutable values                |
| `useMemo`     | To optimize performance (memoize values)                        |
| `useCallback` | To memoize functions (avoid unnecessary re-renders)             |


### 🎯 Summary

* Hooks **make React functional components powerful**.
* You must **only call hooks at the top level** of your component (not inside loops or conditions).
* Hooks **start with `use`** — this is a rule.


*/



// UseState Hook


import React, { useState } from 'react'


const About = () => {

  // useState returns an array [stateValue, setStateFunction]
  // useState return list - 0 -> variable(num), 1-> function(setNum)
  // function should start with "set"
  // React Hooks function must start with "use"
  // The setter function (setNum) updates state and triggers re-render the component

  let [num, setNum] = useState(1); // this hook rerender the component again
                                   // Initial value is 1

  console.log('Current value -', num);

  const addNumber = () => {
    
        setNum((currval) => {
            console.log('Re-render triggered');
            return currval + 1
        })
  }

  return (
    <>
    <h1>Count - {num}</h1>
    <button onClick={addNumber}>Add Number</button>


    </>
    
  )
}

// Without Hook
const About2 = () => {
  
    let num = 1;
  
    console.log('Current value -', num);
  
    const addNumber = () => {
        num += 1
        console.log('num', num)   // value updated here, it wont reflect
                                  // if hook is there, it will rerender     
    }
  
    return (// it already returned, so without re render we cant update the state
      <>
      <h1>Counter - {num}</h1>
      <button onClick={addNumber}>Add Button </button>
  
  
      </>
      
    )
  }




/*

- hook internal behaviour


function useState(initialValue) {
  let state = initialValue;

  function update(newValue) {
    state = newValue;
    // In real React: triggers re-render of component
  }

  return [state, update]; // Mimics [value, setValue]
}

const [num, setNum] = useState(1);
console.log(num, setNum); // Output: 1, [Function: update]



*/



/*

Note

- we can acheive hooks functionality in class based component without hooks.
- but if we ready to use class based component, then we should know OOPS.
- many of them only knows function thats why learned hooks to achieve state operation

*/

// -------------------------------------------------------------------


const WithState = () => {
  let [num, setNum] = useState(1);

  console.log('🔁 Component rendered - Current value:', num);

  const addNumber = () => {
    setNum((currVal) => {
      console.log('🧠 State updated from', currVal, 'to', currVal + 1);
      return currVal + 1;
    });
  };

  return (  // return called(i.e. component rendered) using useState.

    // updated html would be returned by re rendering component
    <>
      <h1>With State Count - {num}</h1>
      <button onClick={addNumber}>Add Number</button>
    </>
  );
};


/*

🔁 Component rendered - Current value: 1
🧠 State updated from 1 to 2
🔁 Component rendered - Current value: 2
🧠 State updated from 2 to 3
🔁 Component rendered - Current value: 3
🧠 State updated from 3 to 4
🔁 Component rendered - Current value: 4

*/



const WithoutState = () => {
  let num = 1; 

  console.log('🔁 Component rendered - Current value:', num);

  const addNumber = () => {
    num += 1;
    console.log('➕ Number increased to:', num);
    // 🟥 No re-render, so UI won't update
  };

  return ( // return not called(i.e. component not rendered). only click action works

    // updated html won't be returned due to no component rerender
    <>
      <h1>Without State Count - {num}</h1>
      <button onClick={addNumber}>Add Number</button>
    </>
  );
};


/*

🔁 Component rendered - Current value: 1
➕ Number increased to: 2
➕ Number increased to: 3
➕ Number increased to: 4
➕ Number increased to: 5

*/





/*

My understanding of re render in use state

   compontent is function. function is not called anywhere. so where we use usestate to call the function
   again, which means re render the component again. so fuction/ component return current values



Answer by chatgpt
-----------------

### 🧠 How `useState` causes a re-render

1. **React calls your component function** to display something on the screen.

   * This happens **the first time** when the component mounts.

2. Inside your component, you call:

   ```js
   const [count, setCount] = useState(0);
   ```

   * `count` is stored in React’s **internal memory** (not just a normal JS variable).
   * `setCount` is a **special function** React gives you to update that stored value.

3. When you click a button or something calls `setCount`:

   * React **does not** directly change the variable.
   * Instead, React:

     * Updates its **internal stored value**.
     * **Schedules** the component to run again (re-render).

4. On the **next render**:

   * React calls your component function **again**.
   * This time, `useState` returns the **updated value**.
   * The JSX is returned **based on the new value**.
   * React updates the real DOM (only changed parts) using Virtual DOM diffing.

---

### 📍 Key points to remember

* **Your component is just a function** — React decides *when* to call it.
* `setState` (like `setCount`) **tells React**:

  > “Please call my component again with updated data.”
* A **re-render** means: React calls your component function again to return **new JSX**.

---

💡 In short:

> `useState` doesn't “call the function again” directly —
> it tells React to schedule a re-render, and React calls your function again.


*/





// Real Time Example




// We’ll build a **simple cart counter** like in an e-commerce app.


const CartCounter = () => {
  console.log("🔄 Component rendered");

  // State variables
  const [count, setCount] = useState(0); // Items in cart
  const [totalPrice, setTotalPrice] = useState(0); // Total cart price

  const ITEM_PRICE = 50; // Price per item

  const addItem = () => {
    console.log("🛍 Adding item to cart...");
    setCount((prev) => prev + 1); // Update count
    setTotalPrice((prev) => prev + ITEM_PRICE); // Update total price
  };

  const removeItem = () => {
    if (count > 0) {
      console.log("🗑 Removing item from cart...");
      setCount((prev) => prev - 1);
      setTotalPrice((prev) => prev - ITEM_PRICE);
    }
  };

  const clearCart = () => {
    console.log("🧹 Clearing cart...");
    setCount(0);
    setTotalPrice(0);
  };

  return (
    <div style={{ padding: "1rem", border: "1px solid black", width: "250px" }}>
      <h2>🛒 Cart</h2>
      <p>Items: {count}</p>
      <p>Total Price: ${totalPrice}</p>
      <button onClick={addItem}>➕ Add Item</button>
      <button onClick={removeItem}>➖ Remove Item</button>
      <button onClick={clearCart}>🧹 Clear Cart</button>
    </div>
  );
};


export {About, About2, WithState, WithoutState, CartCounter}


/*


## 🔍 How This Works

1. **Initial Render**

   * `count = 0`, `totalPrice = 0`.
   * Component renders and shows empty cart.

2. **Click "Add Item"**

   * `setCount` updates count → triggers re-render.
   * `setTotalPrice` updates price → triggers re-render.
   * React batches these updates into **one render** for performance.
   * On re-render, new `count` and `totalPrice` values are shown.

3. **Click "Remove Item"**

   * If `count > 0`, updates both states again.
   * Component re-renders with updated values.

4. **Click "Clear Cart"**

   * Both states reset to `0`.
   * Component re-renders with empty cart.

---

## 📜 Console Log Timeline Example

If you open your browser console while running this:

```
🔄 Component rendered
🛍 Adding item to cart...
🔄 Component rendered
🛍 Adding item to cart...
🔄 Component rendered
🗑 Removing item from cart...
🔄 Component rendered
🧹 Clearing cart...
🔄 Component rendered
```

You can clearly see:

* State change → triggers **re-render**.
* `console.log` at the top runs **every render**.
* Each `setState` **does not instantly update the variable** — instead, it schedules a re-render.


*/
