import React, {useContext} from 'react'
import { ThemeContext } from './UseContextHook'


const User = () => {

  const {theme} = useContext(ThemeContext)  // Use the stored context here
  
  console.log('theme in User - ', theme)

  const textStyle = {
    backgroundColor: theme === 'light' ? 'yellow': 'green',
    color: theme === 'light' ? 'green': 'yellow'

  }


  return (
    <h1 style={textStyle}>User</h1>
  )
}


export default User



/*

### **Your `UseContextHook` Component**

* ✅ `createContext()` is used correctly to create a `ThemeContext`.
* ✅ You wrapped children with `<ThemeContext.Provider>` so that all nested components can access the `theme` without prop drilling.
* ✅ `useState` is used to maintain the `theme` (`light` or `dark`).
* ✅ `toggleTheme` correctly updates the state with a functional update (`curr => ...`).
* ⚠️ **Note**: Right now, you only pass `{ theme }` into `value`. If you also want children components (like `User`) to toggle the theme, you should pass both `theme` and `toggleTheme`.

👉 Example fix:

```jsx
<ThemeContext.Provider value={{ theme, toggleTheme }}>
    <button onClick={toggleTheme}>Toggle Theme</button>
    <h1>UseContextHook</h1>
    <Component />
</ThemeContext.Provider>
```

---

### **Your `User` Component**

* ✅ You correctly used `useContext(ThemeContext)` to access `theme`.
* ✅ Styling logic is correct — background and text color change based on theme.
* ✅ `console.log('theme in User - ', theme)` is useful for debugging.

👉 If you also need the `toggleTheme`, you could access it like:

```jsx
const { theme, toggleTheme } = useContext(ThemeContext);

return (
  <>
    <h1 style={textStyle}>User</h1>
    <button onClick={toggleTheme}>Toggle Theme in User</button>
  </>
);
```

---

### **Your Understanding (from comments in code)**

* ✔️ Correct: Context avoids prop drilling.
* ✔️ Correct: Only the components wrapped inside `<ThemeContext.Provider>` can access the context.
* ✔️ Correct: The `value` prop of Provider is how you share state.

---

*/
