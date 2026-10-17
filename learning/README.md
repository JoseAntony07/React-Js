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