import React, {useState, useEffect, useMemo} from 'react'



function slowFucntion(num){
    console.log('Running Slow')
    for (let i=0; i<1000000000; i++){}
    return num * 2
}


const UseMemoHook = () => {
  const [number, setNumber] = useState(0)
  const [dark, setDark] = useState(false)

  const doubleNumber = useMemo(() => {
    return slowFucntion(number)
  }, [number])


  const themeStyle = useMemo(() =>{  // only run when there is change in dark
                                     // it won't run when other changes happen, like rerender
                                     // can use  useEffect for this, but when you useEffect we need useState, but useMemo dont need useState
                                     // its mainly used for performance
                                     // Runs during rendering, unlike useEffect which runs after rendering.
                                     // useEffect doesn’t return a value; useMemo returns the computed value. (that's why it needs useState)
    
    console.log('during re render..! before DOM updates')

    return {
        backgroundColor: dark ? 'black': 'white',
        color: dark ? 'white': 'black'
    }
  }, [dark])


  useEffect(() =>{
    console.log('Theme Changed...!')
    console.log('after re render..!....after DOM updates')
  }, [themeStyle])


  return (
    <div>
        <input 
        type="number"
        value={number} 
        onChange={(event) => setNumber(event.target.value)} 
        />
        <button onClick={() => setDark((dark) => !dark) }>Toggle Theme</button>
        <div style={themeStyle}>{doubleNumber}</div>
    </div>
  )
}



export default UseMemoHook



/*

#### **Extra Notes to Add**

* **Difference from `useEffect`:**

  * `useEffect` runs *after* rendering → good for side effects (API calls, subscriptions, logging).
  * `useMemo` runs *during* rendering → good for computing values **before** rendering the UI.
  * `useEffect` doesn’t return a value; `useMemo` returns the computed value.

* **Dependency Array:**

  * Works like `useEffect`.
  * If empty `[]` → runs only once at initial render.
  * If omitted → recalculates on **every render** (defeats the purpose).

* **Common mistake:**
  Overusing `useMemo` for tiny calculations can make code more complex without performance gains.

---

#### **Final Updated Note for Your File**

> **useMemo**:
>
> * Caches the result of an expensive computation and reuses it until dependencies change.
> * Useful for performance optimization when you don’t want a heavy function or object recreation on every render.
> * Runs during rendering, unlike `useEffect` which runs after rendering.
> * Should not be overused for cheap calculations.


*/


// ---------------------------------------------------------------------------------------------



/*


## **useMemo – Key Points**

* **What it does:**

  * Memoizes (stores) the **result** of a computation so it doesn’t re-run unless dependencies change.

* **Why use it:**

  * Avoid recalculating **expensive computations** (e.g., filtering a large list, sorting big arrays, running heavy loops).
  * Prevent object/array reference changes from triggering unnecessary renders or effects.

* **When it runs:**

  * During render (not after like `useEffect`).
  * Recomputes only when **one or more dependencies change**.

* **Dependency array behavior:**

  * `[]` → runs only once at initial render.
  * `[var1, var2]` → runs when any listed variable changes.
  * No array → runs on **every render** (bad for performance).

* **Difference from `useEffect`:**

  * `useEffect` → for **side effects** (data fetching, DOM manipulation, logging), runs after render, doesn’t return a value.
  * `useMemo` → for **value memoization** during render, returns the computed value.

* **When NOT to use it:**

  * For cheap calculations (adds complexity without benefit).
  * If the function is already very fast.


*/


// -------------------------------------------------------------------------------------------


// Q) useMemo will rerender the component?


/*

No — **`useMemo` by itself will not cause a re-render**.

Here’s the breakdown:

* A **re-render happens** when state (`useState`) or props change.
* `useMemo` **runs during a re-render**, but it **does not trigger** that re-render.
* Its job is **only** to memoize a value so that React can skip re-running expensive calculations unless dependencies change.

**Example scenario:**

```jsx
const value = useMemo(() => {
  console.log("Heavy function running");
  return slowFunction(number);
}, [number]);
```

* If `number` changes → React re-renders → `useMemo` sees dependency change → recomputes.
* If `number` doesn’t change → React re-renders for some other reason → `useMemo` **returns the cached value**, skipping computation.
* **But `useMemo` never starts a re-render by itself.**

So if you see your component re-render when using `useMemo`, it’s because **something else** (state/props) changed, not because of `useMemo`.


*/


//----------------------------------------------------------------------------------------------


/*

useMemo → During render (pre-DOM) → optimize calculations.

useEffect → After render (post-DOM) → handle side effects.



*/

