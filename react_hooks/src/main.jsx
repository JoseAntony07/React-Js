import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SearchBox from './useStateHook.jsx'
import Cart from './useEffectHook.jsx'
import Theme from './useContextHook.jsx'
import InputSearchBox from './useRefHook.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchBox />
    <Cart />
    <Theme />
    <InputSearchBox />
  </StrictMode>,
)
