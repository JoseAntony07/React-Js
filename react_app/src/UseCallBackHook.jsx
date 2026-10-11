import React, {useState, useMemo, useCallback, useEffect, useRef} from 'react'
import List from './List'


const UseCallBackHook = () => {

  const [number, setNumber] = useState(0)
  const [dark, setDark] = useState(false)

  // if get items returns function
  const getItems = useCallback((increament) => {  // useCallback always return function
                                                  // stabilize function references so that child components (with React.memo) or hooks (useEffect) don’t see them as “new” on every render.
      return [number + increament, number + increament, number + increament]
    }, [number])
    

// if get items returns values
//   const getItems = useMemo(() => {
//     return [number+1, number+2, number+3]  // useMemo always return values
//     }, [number])
  

  const theme = useMemo(() =>{  
    console.log('during re render..! before DOM updates')
  
      return {
          backgroundColor: dark ? 'black': 'white',
          color: dark ? 'white': 'black'
      }
    }, [dark])

//   console.log('useCallback returns - ', getItems)
//   console.log('useMemo returns - ', theme)

  return (
    <div style={theme}>
        <input 
            type="number"
            value={number} 
            onChange={(event) => setNumber(parseInt(event.target.value))} 
        />
        <button onClick={() => setDark((dark) => !dark) }>Toggle Theme</button>
        <List getItems={getItems} />
    </div>
  )
}




/*

Good job 👏 — your note **“useCallback always returns a function and useMemo always returns values”** is correct, but there are a few more important differences and nuances you should know. Let’s refine it:

---

## 🔑 **useMemo vs useCallback**

### 1. **Return Type**

* **useMemo** → caches and returns a **value** (e.g., number, object, array).
* **useCallback** → caches and returns a **function**.

---

### 2. **Use Case**

* **useMemo** → optimize **expensive calculations** (so they don’t re-run unnecessarily).
  Example: filtering, sorting, heavy computation.
* **useCallback** → stabilize **function references** so that child components (with `React.memo`) or hooks (`useEffect`) don’t see them as “new” on every render.

---

### 3. **Dependency Array**

Both work the same way with dependency arrays:

* If dependencies change → recompute and return a new value/function.
* If dependencies don’t change → return the cached one.

---

### 4. **Re-rendering**

* Neither `useMemo` nor `useCallback` **prevent re-renders by themselves**.
* They only help avoid unnecessary recalculations or unnecessary **prop changes** that could *trigger* re-renders in child components.

---

### 5. **When to Use**

* **useMemo** → “I want to memoize a value (like computed data).”
* **useCallback** → “I want to memoize a function (to keep its identity stable).”

---

## ✅ Example Difference:

```js
// useMemo example
const doubled = useMemo(() => number * 2, [number]);

// useCallback example
const increment = useCallback(() => setCount(c => c + 1), []);
```

* `doubled` → a **value** (calculated only when `number` changes).
* `increment` → a **function** (same identity across renders).

---

⚡️ **Your Summary (updated):**

1. `useMemo` → memoizes **values**.
2. `useCallback` → memoizes **functions**.
3. Both help with performance but don’t stop re-renders directly.
4. Main goal: stop unnecessary recalculations or re-creations that would otherwise cause children or effects to re-run.

---


*/




//-----------------------------------------------------------------------------------------------------

// Perfect 👍 Let me give you a **clear example** of how `useCallback` works and why we use it.
// We want to **memoize a function** so its identity doesn’t change across re-renders.

/*



---

### 🔍 What happens here?

* Without `useCallback`
  Every time you type in the input, React re-renders → `increment` gets recreated → function identity changes.

* With `useCallback`
  Even if the component re-renders, the **same function identity** is reused (logged in console).

You’ll see in the console that `increment` has **the same reference** across renders.


*/
  

function UseCallbackDemo() {
    const [count, setCount] = useState(0);
  
    // Without useCallback
    const increment1 = () => {
      setCount((prev) => prev + 1);
    };
  
    // With useCallback
    const increment2 = useCallback(() => {
      setCount((prev) => prev + 1);
    }, []);
  
    useEffect(() => {
      console.log("increment1 identity changed"); // logs on EVERY render
    }, [increment1]);
  
    useEffect(() => {
      console.log("increment2 identity changed"); // logs ONLY once
    }, [increment2]);
  
    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={increment1}>Increment1</button>
        <button onClick={increment2}>Increment2</button>
      </div>
    );
  }




/*
  
you’ll always see the function definition (the body).
That doesn’t show its identity.

👉 Identity means: is it the same reference in memory or a new one?

Example:

function A() {}
function B() {}

console.log(A === A); // true (same function ref)
console.log(A === B); // false (different function refs)
  
  */


// -------------------------------------------------------------------------------------------


// ### ✅ Example: Without `useCallback`


function WithoutUseCallback() {
  const [count, setCount] = useState(0);
  const prevRef = useRef();

  const increment = () => {
    setCount((c) => c + 1);
  };

  // Compare identity with previous render
  if (prevRef.current) {
    console.log("Without useCallback:", prevRef.current === increment);
  }
  prevRef.current = increment;

  return (
    <div>
      <p>WithoutUseCallback Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}


/*
👉 Every render, `increment` is **newly created**,
so console will log:

```
Without useCallback: false
```

---


*/


// ### ✅ Example: With `useCallback`



function WithUseCallback() {
  const [count, setCount] = useState(0);
  const prevRef = useRef();

  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []); // 👈 dependency empty → same function reference always
          // I meant that React will reuse that same function object across all renders, because no dependencies force it to rebuild.

  // Compare identity with previous render
  if (prevRef.current) {
    console.log("With useCallback:", prevRef.current === increment);
  }
  prevRef.current = increment;

  return (
    <div>
      <p>WithUseCallback Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}


/*

👉 Every render, `increment` has the **same identity**,
so console will log:

```
With useCallback: true
```

---

📌 **Summary**:

* **Without useCallback** → new function each render → identity changes → `false`
* **With useCallback** → memoized function → same identity across renders → `true`

---

*/



export {UseCallBackHook, UseCallbackDemo, WithoutUseCallback, WithUseCallback}



// ---------------------------------------------------------------------------------------------------


// Q) what will happen if it create new function reference everytime?


/*


### 🔹 When you **create a new function reference every time** (not using `useCallback`)

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {     // 👈 new function created on every render
    setCount(c => c + 1);
  };

  console.log("Increment identity:", increment);

  return <button onClick={increment}>Count: {count}</button>;
}
```

* On **every render**, React **creates a new `increment` function object** in memory.
* Even though the function body looks the same, its **identity (reference in memory) is different** each time.

👉 This is usually fine for **simple components**.
👉 But it causes **problems** when you pass `increment` down to child components wrapped in `React.memo`.

* Child will re-render unnecessarily because React thinks `props.increment` changed (different function reference).
* Also affects dependencies in `useEffect`, `useMemo` (they’ll re-run when function identity changes).

---

### 🔹 When you **use `useCallback` with `[]`**

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {   // 👈 function memoized
    setCount(c => c + 1);
  }, []); // 👈 dependency empty → same function reference always

  console.log("Increment identity:", increment);

  return <button onClick={increment}>Count: {count}</button>;
}
```

* React only creates the function **once**.
* On later renders → React **reuses the same reference**.
* So `increment` always has the **same identity** unless dependencies change.

---

### ⚡ Key Difference (Example with Child)

```jsx
const Child = React.memo(({ onClick }) => {
  console.log("Child rendered!");
  return <button onClick={onClick}>Click</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  // Without useCallback → new function each render
  const increment = () => setCount(c => c + 1);

  return (
    <>
      <Child onClick={increment} />
      <p>Count: {count}</p>
    </>
  );
}
```

👉 Here `Child` will **re-render every time** because `increment` is a new function.
👉 If we wrap `increment` in `useCallback([])` → Child won’t re-render unnecessarily.

---

✅ So, **if you always create a new function reference**, it can:

* Break memoization (`React.memo`)
* Cause unnecessary re-renders
* Trigger effects that depend on the function


*/


// -------------------------------------------------------------------------------------------------


// Q) function reference is same to avoid unnessary child renders. but value will be dynamically passed to function?



/*

Exactly ✅ — you got it right! Let me explain carefully.

---

### 1️⃣ Function identity vs arguments

* **`useCallback` keeps the function reference the same** → React sees it as the same object across renders.
* **Arguments (values) can still change dynamically** when you call the function.

Example:

```jsx
const [count, setCount] = useState(0);

// Function identity is stable
const increment = useCallback((step) => {
  setCount(c => c + step); // step can be any dynamic value
}, []);
```

* `increment` is **the same function object** across renders.
* You can call it with **different step values** dynamically:

```jsx
increment(1);
increment(5);
increment(10);
```

* React memoization sees **same function reference**, so child components won’t re-render unnecessarily.
* But the **logic inside the function can still use dynamic arguments or latest state**.

---

### 2️⃣ With Child Component Example

```jsx
const Child = React.memo(({ onClick }) => {
  console.log("Child rendered!");
  return <button onClick={() => onClick(2)}>Add 2</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  const increment = useCallback((step) => {
    setCount(c => c + step);
  }, []);

  return (
    <>
      <Child onClick={increment} />
      <p>Count: {count}</p>
    </>
  );
}
```

* Child will **not re-render** unnecessarily, even if Parent re-renders.
* `increment` still receives **dynamic `step` value** when called.

---

✅ **Summary**:

* `useCallback` → keeps **function reference stable** (helps React.memo).
* Arguments/values → can still be **dynamic**, passed at runtime.
* Function logic can use **latest state** if you use the functional updater:

  ```js
  setCount(c => c + step)
  ```


*/

