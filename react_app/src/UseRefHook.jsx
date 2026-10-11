

import React, { useState, useRef, useEffect } from "react";



const FocusExample = () =>  {
  const inputRef = useRef(null); // box starts empty (null)

  useEffect(() => {
    inputRef.current.focus(); // tell browser to focus the input
                              // Access/manipulate DOM elements directly.
  }, []);

  return <input ref={inputRef} placeholder="Auto focus me" />;
}



const UseRefExample = () => {
  const [input, setInput] = useState('');
  const inputRef = useRef();  // call by itself on every render /  it wont make rerender by itself
                              // Store values across renders without causing re-renders.
                              // Access/manipulate DOM elements directly.
                              // Hold values that are used internally, not for display.
                              // ref - data should persists like state not like normal variable.  but ref dont make rerender the component
                              // ref is mainly use to avoid the compoent rerender and data persists like state
                              // Ref remembers the old state across renders without causing an extra render.

  console.log('Component Triggered....!')
  console.log('inputRef.current 1 - ', inputRef.current)

  useEffect(() => {
    console.log("✅ [Render Complete] — DOM updated");
    console.log('inputRef.current 2 - ', inputRef.current)
    inputRef.current = input  // inputRef updated after component rendered as useEffect will be called after Dom render
    console.log('inputRef.current 3 - ', inputRef.current)
    
  }, [input])


  const display = () => {
    console.log('inputRef.current 4 - ', inputRef.current)
    // inputRef.current.focus()

  }

  return (
    <div>
      <h1>Input</h1>
      <input 
        ref={inputRef}
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />

      <p>My name is - {input}</p>
      <p>My name is - {inputRef.current}</p>
      <p>{console.log("✅ [Render Complete] — DOM updated")}</p>
      <button onClick={display}>Show Input</button>
      
    </div>
      
  );
}


export {FocusExample, UseRefExample}



// ------------------------------------------------------------------------------------------------


/*

variable - store the value / cannot pass the stored value to next render / no rerender
state - store the value / can use updated stored value 
ref - store the value / can pass the stored value to next render / no rerender

*/



// -------------------------------------------------------------------------------------------------


// When useState, useEffect, useRef being called?


/*

## **1️⃣ useState**

* **When called:**

  * Only during the *initial render* (to set the initial value).
  * Afterwards, when you call the setter function (`setState`), React schedules a re-render — and on that re-render, `useState` will return the *latest state value*.
* **Key point:**

  * The `useState` **function itself** runs **every render**, but React does not reinitialize the state each time — it remembers the state value from the previous render.
* **Triggers re-render:** ✅ Yes, when you call the setter and the new value is different.

---

## **2️⃣ useEffect**

* **When called:**

  * **After** the component has rendered and the DOM is updated (post-render phase).
  * First run: after the initial render.
  * Later runs: depends on its dependency array:

    * `[]` → runs only once (mount).
    * `[var1, var2]` → runs whenever *any* listed variable changes between renders.
    * *No dependency array* → runs after every render.
* **Triggers re-render:** ❌ No (but if you call `setState` inside it, that will cause a re-render).
* **Purpose:** For side effects (API calls, DOM manipulation, subscriptions, timers, logging, etc.).

---

## **3️⃣ useRef**

* **When called:**

  * The `useRef()` call itself runs on **every render**, but React gives back the **same `.current` object** each time (persistent between renders).
  * Does **not** cause a re-render when `.current` changes.
* **Triggers re-render:** ❌ No (unlike `useState`).
* **Purpose:**

  * Store mutable values that persist across renders without re-rendering the component.
  * Access/manipulate DOM elements directly (when `ref` is attached to an element).

---

### 🔄 **Typical Timeline**

Let’s say your component first renders:

1. **useState** runs → sets up initial state value.
2. JSX is returned → React builds virtual DOM → React updates real DOM.
3. **useEffect** runs (if dependency condition met) → handles side effects.
4. **useRef** values remain available across renders → can read/write `.current` without triggering render.

If you update state via `setState`:

* Component function runs again (including the `useState` and `useRef` calls).
* JSX re-generated → DOM updated.
* **useEffect** runs again if dependencies changed.


*/

// ---------------------------------------------------------------------------------------------------

/*

useState - call initial render/ changes in setter fucntion
useEffect - call initial render after dom updation / changes in input list variables / it wont make rerender by itself
useRef - call by itself on every render /  it wont make rerender by itself


Your summary is almost correct ✅, just needs a tiny bit of precision so it’s crystal clear:

---

### **1️⃣ useState**

* **Runs:**

  * On **initial render** (to set the initial state value).
  * On **every render** (but React reuses the stored value, so it doesn’t reinitialize).
* **Triggers re-render:** ✅ **Only** when you call the setter (`setState`) **and** the new value is different from the old one.

---

### **2️⃣ useEffect**

* **Runs:**

  * On **initial render**, **after** DOM updates.
  * On **dependency changes** (variables listed in the dependency array).
* **Triggers re-render:** ❌ Not by itself.

  * But if you call `setState` inside it, **that** will trigger a re-render.

---

### **3️⃣ useRef**

* **Runs:**

  * The `useRef()` hook is called on **every render**, but React always gives the same `.current` object back.
  * The `.current` value persists between renders.
* **Triggers re-render:** ❌ No matter how much you change `.current`, it will not cause a re-render.

---

💡 **Extra clarity:**
Think of `useState` as **"data that causes re-renders"**, `useRef` as **"data that survives re-renders"**, 
and `useEffect` as **"do something after the render"**.


*/


// ----------------------------------------------------------------------------------------------


/*

Q) state update the value in each render, ref pass the value to next render

what is the diff in storevalue in normal varible, state and ref? 


---

## **1️⃣ Normal variable (let/const inside component)**

* **Lifetime:** Exists **only during a single render**.
* **Behavior:**

  * Value **resets** on every re-render.
  * Changing it will **not** trigger a re-render.
* **When to use:** Temporary calculations **inside** a render only.

```jsx
function Example() {
  let counter = 0; // new variable each render

  const increment = () => {
    counter += 1;
    console.log(counter); // updates here
  };

  return <button onClick={increment}>Click</button>;
}
```

⚠️ Clicking the button will log increasing numbers **in console**, but the UI will **not** update because React doesn’t re-render.

---

## **2️⃣ useState**

* **Lifetime:** Persists between renders.
* **Behavior:**

  * Changing state **triggers a re-render** (if the value changes).
  * Value is tied to the UI.
* **When to use:** Data that should **control what is shown on the screen**.

```jsx
function Example() {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Click</button>
    </>
  );
}
```

✅ Clicking updates **both console and UI**.

---

## **3️⃣ useRef**

* **Lifetime:** Persists between renders.
* **Behavior:**

  * Changing `.current` **does not** trigger a re-render.
  * Stores **mutable values** that need to survive re-renders **without causing** extra renders.
* **When to use:** Storing DOM elements or values you don’t want to cause re-renders (e.g., timers, previous values).

```jsx
function Example() {
  const counterRef = useRef(0);

  const increment = () => {
    counterRef.current += 1;
    console.log(counterRef.current); // UI won't update
  };

  return <button onClick={increment}>Click</button>;
}
```

⚡ UI won’t change, but the value is saved between renders.

---

### 🔍 Quick Comparison Table

| Feature                                         | Normal Variable | useState | useRef |
| ----------------------------------------------- | --------------- | -------- | ------ |
| Persists between renders                        | ❌ No            | ✅ Yes    | ✅ Yes  |
| Causes re-render on change                      | ❌ No            | ✅ Yes    | ❌ No   |
| Good for UI updates                             | ❌ No            | ✅ Yes    | ❌ No   |
| Good for DOM refs                               | ❌ No            | ❌ No     | ✅ Yes  |
| Good for storing mutable data without re-render | ❌ No            | ❌ No     | ✅ Yes  |



*/


// ---------------------------------------------------------------------------------------------



/*

## **1️⃣ What does “mutable” mean?**

* **Mutable** = **can be changed** after creation.
* **Immutable** = **cannot be changed** after creation; instead, you make a new copy.

In React terms:

* **Normal variables** → mutable (but reset every render)
* **useState** → *value is immutable* in the sense that you **should not directly change it** (`stateVar = newVal` won’t work). You must use the setter (`setStateVar`) which replaces the old value.
* **useRef** → mutable (`ref.current = something` works directly without setters).

Example:

```js
let arr = [1,2,3];
arr.push(4); // mutable change
let newArr = [...arr, 4]; // immutable change
```

---

## **2️⃣ Where does React store state & ref values?**

Both `useState` and `useRef` values **live in React’s internal memory**, not in your component function variables.

* That’s why they **survive across renders**.
* Your component function is called from scratch each render, but React looks up the stored value from its “memory” and gives it back.

Think of it like:

* Your component is a **recipe** that React runs fresh each time.
* State & Ref are **notes React keeps in a separate notebook** to remember between runs.

---

## **3️⃣ When is that memory cleared?**

React clears the memory when:

* The component **unmounts** (removed from the DOM).
* The component **is no longer rendered** due to conditional rendering.
* A **page reload** or full app restart happens.

So:

* If your component disappears (e.g., switching pages, removing a conditional), its state/ref data is gone.
* When it mounts again, it starts with **initial values**.

---

## **4️⃣ TL;DR Table**

| Feature            | Mutable?         | Stored in React’s Memory? | Causes Re-render? | Cleared When…        |
| ------------------ | ---------------- | ------------------------- | ----------------- | -------------------- |
| Normal Variable    | ✅ Yes            | ❌ No                      | ❌ No              | Every render restart |
| State (`useState`) | ❌ (needs setter) | ✅ Yes                     | ✅ Yes             | Component unmounts   |
| Ref (`useRef`)     | ✅ Yes            | ✅ Yes                     | ❌ No              | Component unmounts   |



*/

