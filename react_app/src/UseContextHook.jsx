import React, {useState, createContext} from 'react'
import Component from './Component'


export const ThemeContext = createContext() // Create the context
                                            // to avoid pass props to multiple nested component(to avoid react drilling)
                                            // so context is only accessed by component which needs

const UseContextHook = () => {

  const [theme, setTheme] = useState('light')
  console.log('theme in UseContextHook - ', theme)

  const toggleTheme = () => {
    setTheme((curr) => {
        console.log('curr - ', curr)
        return curr === 'light' ? 'dark': 'light'
    })
  }

  return (
    // ThemeContext.Provider - I cover all my application code into my context code
    //  I store common required state data in context
    // so that context covered all component can use the context data

    <ThemeContext.Provider  value={{theme}}>  
        <button onClick={toggleTheme}>Toggle Theme</button>
        <h1>UseContextHook</h1>
        <Component />
    </ThemeContext.Provider>
  )
}



export default UseContextHook

