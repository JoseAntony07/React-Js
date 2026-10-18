
import { createContext, useContext } from "react";

const ThemeContext = createContext("light");

const Theme = () => {  // share the current theme
  return (
    <ThemeContext value="dark">
      <Header />
    </ThemeContext>
  );
}

function Header() {
  const theme = useContext(ThemeContext);
  console.log(theme)
  return <header className={theme}>My Shop</header>;
}


export default Theme


// Header reads the theme from a parent without receiving it as a prop.