
import React, { useState, useReducer } from "react";


const ACTIONS = {
    INCREMENT: "increment",
    DECREMENT: "decrement"
}

function reducerFn(state, action) {
    switch (action.type){
        case ACTIONS.INCREMENT:
            return {count: state.count + 1}
        case ACTIONS.DECREMENT:
            return {count: state.count - 1}
        default:
            return state
    }
}


const UseReducerHookState = () => {

    // Method 1
    const [count, setCount] = useState(1)  // for simple logic

    // Method 2
    const [state, dispatch] = useReducer(reducerFn, {count: 1}) // for complex logic

    const increment = () => {
        // setCount((curr) => curr + 1  )
        dispatch({type: ACTIONS.INCREMENT})
    }

    const decrement = () => {
        // setCount((curr) => curr - 1  )
        dispatch({type: ACTIONS.DECREMENT})
    }

    console.log(state);

    return (
        <div style={{
            display: 'flex'
        }}>
            <button onClick={decrement}>-</button>
            {/* <h1>{count}</h1> */}
            <h1>{state.count}</h1>
            <button onClick={increment}>+</button>
        </div>
    )
}


export {UseReducerHookState};



/*

Q) difference between useState and useReducer Hook in react. when to use which?



## 🔹 `useState`

* A React hook to store and update **simple state** in a component.
* Best for **independent pieces of state** that don’t need complex logic.

### Example

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
}
```

👉 State is just a number, updated directly. Perfect for simple counters, toggles, form inputs.

---

## 🔹 `useReducer`

* A React hook for **more complex state logic**.
* Instead of directly setting state, you **dispatch actions** → reducer function decides how state changes.
* Good when state depends on **previous state** or has **multiple sub-values**.

### Example

```jsx
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </>
  );
}
```

👉 State is managed by a reducer → predictable, structured, easier to scale.

---

## 🔑 When to Use Which?

| Hook             | Use when...                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **`useState`**   | State is **simple** (booleans, strings, numbers, a few fields). Updating is straightforward.                                         |
| **`useReducer`** | State is **complex** (objects, arrays with many updates). Multiple actions update state. You want **predictable state transitions**. |

---

✅ **Rule of thumb**

* Start with **`useState`** (simpler).
* If state logic gets messy → refactor to **`useReducer`**.

*/



/*

Q) Good when state depends on previous state or has multiple sub-values. what do you mean by here ?



### 1. **“Depends on previous state”**

Sometimes the next value depends on the **old value**, not just a new assignment.


**Example with a counter:**

```jsx
// ✅ This depends on the old state
setCount(prevCount => prevCount + 1);
```

If you have **a lot of such updates**, `useReducer` gives you a cleaner structure since the reducer function always receives the **current state** and updates it predictably.

---

### 2. **“Has multiple sub-values”**

When your state is an **object with many fields** (not just one number/string), `useState` can get messy because you need to copy and update parts of the object manually.

**Example (messy useState form):**

```jsx
const [form, setForm] = useState({ name: "", email: "", age: "" });

function updateField(field, value) {
  setForm({ ...form, [field]: value });
}
```

Here you’re constantly spreading `...form` and updating a single key → it grows hard to manage when you have many fields.

**Cleaner with useReducer:**

```jsx
function formReducer(state, action) {
  switch (action.type) {
    case "updateField":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
}

const [form, dispatch] = useReducer(formReducer, { name: "", email: "", age: "" });

// usage
dispatch({ type: "updateField", field: "name", value: "Jose" });
```

Now each change is **structured** and easier to maintain as the form grows.

---

✅ So in short:

* **Previous state** → when the new state is calculated using the old one (e.g., increment/decrement).
* **Multiple sub-values** → when your state is a complex object/array with many updates.


*/

