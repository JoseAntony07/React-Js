### React.js flow

```text
Browser loads the page
        ↓
HTML loads the JavaScript entry file
        ↓
main.jsx / index.js starts React
        ↓
React attaches to the root element in index.html
        ↓
App component renders
        ↓
Child components render
        ↓
React updates the DOM
        ↓
User sees the UI
        ↓
User interacts (click, type, submit)
        ↓
Event handler runs
        ↓
State changes (e.g. setCount)
        ↓
React renders the affected component again
        ↓
React updates the changed parts of the DOM
```

### If the app fetches data

```text
Component starts a data request
        ↓
Browser sends request to the backend API
        ↓
Backend processes the request and returns data
        ↓
React receives the data
        ↓
Component renders with the data
        ↓
React updates the DOM
```

**Unlike Django’s request pipeline, React’s flow mainly runs in the browser and repeats when the UI’s data changes.**


Q) which storage are used to store the state values in browser and all hooks where it stores the values?

React state and hook values usually **aren’t stored in `localStorage` or another browser storage system**. React keeps them in memory while the app is running, associated with each component instance in React’s internal data structures (the Fiber tree).

For example:

- `useState` and `useReducer`: current values are held in React’s in-memory component state.
- `useRef`: the ref object is held for that component instance; changing `.current` doesn’t trigger a render.
- `useMemo` and `useCallback`: cached values are held by React for that component instance, but React may discard those caches.
- `useEffect` and `useLayoutEffect`: React tracks the effect and its dependencies; effects run after rendering at the relevant phase. They aren’t storage for persistent data.
- `useContext`: reads a value supplied by a context provider; the provider’s value is typically backed by its own state or another source.

This state generally lasts while the component stays mounted. It resets when the component unmounts or the page reloads. For persistence across reloads, explicitly save data to `localStorage`, IndexedDB, a cookie, or a backend.

