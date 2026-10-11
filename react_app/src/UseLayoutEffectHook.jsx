import React, {useState, useEffect, useLayoutEffect} from 'react'



const UseLayoutEffectHook = () => {

  const [count, setCount] = useState(0)

//   useEffect(() => {
//     console.log('Inside useEffect Count -', count)
//   }, [count])

  useLayoutEffect(() => {
    console.log('Inside useEffect Count -', count)
  }, [count])

  console.log('Rendered Outside -', count)

  return (
    <div>
        <h1>{count}</h1>
        <button onClick={() => setCount((curr)  => curr + 1)}>Add</button>
    </div>
  )
}


export default UseLayoutEffectHook



/*

effect - async
       - run after paint in browser/after render content in browser


layouteffect - sync
             - run while paint/render content in browser
             - layout calculation while rendering

*/



// Notes


/*


## 🔹 1. What happens when React renders

When React updates the UI, the process is like this:

1. React **renders** your component (creates the virtual DOM).
2. Browser **paints** the changes on the screen (what you visually see).
3. Then React runs side effects like `useEffect` or `useLayoutEffect`.

---

## 🔹 2. `useEffect` — **async, runs *after* paint**

* It runs **after** the browser has painted the screen.
* So it **doesn’t block** the user from seeing updates.
* Good for tasks like fetching data, logging, setting timeouts, subscriptions, etc.

### Example behavior:

```jsx
useEffect(() => {
  console.log("useEffect - Count:", count);
}, [count]);
```

**Order of execution:**

```
Rendered Outside - 0
(Browser paints screen)
useEffect - Count: 0
```

✅ User sees updated UI *first*, then the effect runs.

---

## 🔹 3. `useLayoutEffect` — **sync, runs *before* paint**

* It runs **immediately after render but before** the browser paints.
* React waits for it to finish before showing the screen.
* Used when you need to **measure DOM elements** or **update layout** before the user sees it (to avoid flickering).

### Example behavior:

```jsx
useLayoutEffect(() => {
  console.log("useLayoutEffect - Count:", count);
}, [count]);
```

**Order of execution:**

```
Rendered Outside - 0
useLayoutEffect - Count: 0
(Browser paints screen)
```

⚡ The effect runs *before* the screen updates visually.

---

## 🔹 4. Your code flow

When you click **Add**:

1. React re-renders → `Rendered Outside - 1` logs.
2. Before browser paints → `useLayoutEffect` runs.
3. Then the browser updates the screen and shows new count.

So your console will look like:

```
Rendered Outside - 0
useLayoutEffect - Count: 0
Rendered Outside - 1
useLayoutEffect - Count: 1
...
```

---

## 🔹 5. Summary Table

| Hook                | Timing       | Blocking? | Use Case                                             |
| ------------------- | ------------ | --------- | ---------------------------------------------------- |
| **useEffect**       | After paint  | ❌ No      | Fetch data, API calls, event listeners, console logs |
| **useLayoutEffect** | Before paint | ✅ Yes     | DOM measurements, animations, avoiding flicker       |

---

## 🔹 6. Simple analogy

Think of React rendering as **painting a wall** 🎨

* `useEffect` = Do something **after** the paint dries (non-blocking).
* `useLayoutEffect` = Do something **before** showing the wall to users (blocking, but clean result).

---

✅ **Best practice:**

* Default to `useEffect`.
* Only use `useLayoutEffect` when you need to read/write DOM layout (like measuring element size or scroll position).

---



*/

