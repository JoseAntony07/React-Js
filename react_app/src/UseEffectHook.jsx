

import React, {useState, useEffect} from 'react'


const UseEffectHook = () => {

  const [num1, setNum1] = useState(1)
  
  useEffect(() => {  // first time runs when page loads
                     // if list is empty it wont run again(which is after first time)
    console.log('from useEffect 1')
    setNum1(2)
  }, []) // 2 argument(callback func, list)


  return (
    <>
      <h1>Effect Hook Count - {num1}</h1>
      <button onClick={() => setNum1((num1) => num1 + 1) }>Add Number</button>
    </>
  )
}


const UseEffectHook2 = () => {

  const [num1, setNum1] = useState(1)
  
  useEffect(() => {  
    console.log('from useEffect 2', num1)
    setNum1(3) 

  }, [num1]) // if there any changes in existing and new value, then useEffect will call
             // first time new value 1 and existing value null or 0, there is change so useEffect called
             // second time new value 3 and existing value 1, there is change so useEffect called
             // third time new value 3 and existing value 3, there is no change so useEffect not called

  return (
    <>
      <h1>Effect Hook Count - {num1}</h1>
      <button onClick={() => setNum1((num1) => 3) }>Add Number</button>
    </>
  )
}


const UseEffectHook3 = () => {

  const [num1, setNum1] = useState(1)
  const [num2, setNum2] = useState(100)

  useEffect(() => {  
    console.log('from useEffect 3', num1)
    setNum1(3) 

    return () => {
      setNum1(null) // clear the memory before setting new data (increase performance)
                    // it calls before the useEffect main above logic 
                    // before component rerender(setNum1), free up the memory

      console.log('memory cleared...!')  
    }

  }, [num1, num2]) // any one of list values has changes with existing val then useEffect will be called
                   // here num2 has changes with exiting due to increment every time  setNum2((num1) => num1 + 1)
             

  return (
    <>
      <h1>Effect Hook Count i - {num1}</h1>
      <button onClick={() => setNum1((num1) => 3) }>Add Number</button>

      <h1>Effect Hook Count ii - {num2}</h1>
      <button onClick={() => setNum2((num1) => num1 + 1) }>Add Number</button>
    </>
  )
}



/*

## ✅ Corrected Understanding

### **1. `UseEffectHook` — `[]` dependency array**

```js
useEffect(() => {
  console.log('from useEffect 1');
  setNum1(2);
}, []);
```

* **Runs only once** — after the component mounts.
* This is similar to a “componentDidMount” in class components.
* Even though you call `setNum1(2)` inside, React will re-render **once** more with the new value, but `useEffect` itself **won’t run again** because the dependency list is empty.

---

### **2. `UseEffectHook2` — `[num1]` dependency**

```js
useEffect(() => {  
  console.log('from useEffect 2', num1);
  setNum1(3);
}, [num1]);
```

* Runs **every time** `num1` changes.
* On mount:

  1. `num1` starts as `1` → effect runs → sets it to `3`.
  2. Setting to `3` triggers another re-render → effect runs again (`num1` changed from `1` to `3`).
  3. Setting `num1` to `3` again **does not** trigger effect because React **won’t re-render for identical state values**.

---

### **3. `UseEffectHook3` — `[num1, num2]` dependency**

```js
useEffect(() => {  
  console.log('from useEffect 3', num1);
  setNum1(3);
}, [num1, num2]);
```

* Runs when **either** `num1` or `num2` changes.
* If `num2` changes, `useEffect` runs even if `num1` stays the same.
* Every render compares the new values of both dependencies with their previous values — if **at least one** is different, the effect runs.

---

## 🔍 Corrections to your comments

Your code comments are mostly correct, but:

* Saying “existing value null or 0” isn’t technically right — React **remembers the last render’s value** and compares it to the new one.
* Saying “new value” isn’t quite right either — at the time of comparison, React has the *current render value* and the *previous render value*.
* When dependencies are empty (`[]`), `useEffect` runs **once after mount**, not “never again” — it will run again **if the component unmounts and mounts again**.

---

## 📌 Better mental model

Think of `useEffect` like this:

> After React paints your component to the screen, it looks at your dependency array. If any value in that array changed compared to the last render, it runs your effect again.



*/



// Real Time Example



/*

Let’s make a **real-world-ish** example for `useEffect` so you see why and how it’s used beyond console logs.

We’ll build **"User Fetcher"** — a small component that:

* Fetches user data from an API when the page loads.
* Lets you refresh the data with a button.
* Uses `useEffect` correctly so we don’t cause infinite loops.

---

*/


const UserFetcher = () => {
  const [user, setUser] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);

  // Runs on mount AND when refreshCount changes
  useEffect(() => {
    console.log("📡 Fetching user data...");

    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Data fetched:", data);
        setUser(data);
      })
      .catch((err) => console.error("❌ Error fetching user:", err));
    
    return () => {
      setUser(null) // clear the memory before setting new user data (increase performance)
      console.log('memory cleared...!')  
    }

  }, [refreshCount]); // Dependency array

  return (
    <div style={{ padding: "1rem", border: "1px solid black" }}>
      <h2>User Info</h2>
      {user ? (
        <>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={() => setRefreshCount(c => c + 1)}>
        🔄 Refresh User Data
      </button>
    </div>
  );
};


export {UseEffectHook, UseEffectHook2, UseEffectHook3, UserFetcher}


/*

### 🧠 What’s Happening

1. **First render:**

   * Component mounts.
   * `refreshCount` is `0`.
   * `useEffect` runs (because it always runs after mount).
   * Data is fetched and stored in `user`.

2. **Click “Refresh User Data”:**

   * `setRefreshCount` changes `refreshCount` from `0` → `1`.
   * Component re-renders.
   * React sees `refreshCount` changed, so `useEffect` runs again.
   * Data is fetched again.

---

### 🔍 Why this is a *good* `useEffect` example:

* Avoids infinite loops (we only depend on `refreshCount`, not `user` itself).
* Shows dependency array usage (`[]` vs `[refreshCount]`).
* Demonstrates a real side effect — fetching data from an API.
* Makes sense in real apps — many things (fetch, timers, subscriptions) happen **after render**, and `useEffect` is how you handle them.


*/




/*

When useEffect runs:
--------------------


Initial render → always runs once after the component mounts.
Later renders → runs again if one of its dependencies in [ ... ] changes.


But the change itself usually comes from:

- useState setter

- props change from parent

- context value change

- If you never call setState or change props, useEffect won't run again.

*/

