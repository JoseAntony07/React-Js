import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { App1, App2 as Jose } from './Home.jsx'
import {User, User2} from './Props2.jsx'
import {About, About2, WithState, CartCounter} from './UseStateHook.jsx'
import {UseEffectHook, UseEffectHook2, UseEffectHook3, UserFetcher} from './UseEffectHook.jsx'
import {FocusExample, UseRefExample} from './UseRefHook.jsx'
import UseMemoHook from './UseMemoHook.jsx'
import {UseCallBackHook, UseCallbackDemo, WithoutUseCallback, WithUseCallback} from './UseCallBackHook.jsx'
// import UseContextHook from './UseContextHook.jsx'
import {UseReducerHookState} from './UseReducerHook.jsx'
import UseLayoutEffectHook from './UseLayoutEffectHook.jsx'


// createRoot(document.getElementById('root')).render(<h1>New React App</h1>) // we can only give single html tag


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//     <App1/>
//     <Jose />
//     <User/>
//     <User2/>
//     <About/>
//     <About2/>
//     <WithState/>
//     <UseEffectHook/>
//     <UseEffectHook2/>
//   </StrictMode>,
// )


createRoot(document.getElementById('root')).render(
  <>
  {/* <UseEffectHook3/> */}
  {/* <UserFetcher/>   */}
  {/* <CartCounter/> */}
  {/* <FocusExample/> */}
  {/* <UseRefExample/> */}
  {/* <UseMemoHook/> */}
  {/* <UseCallBackHook /> */}
  {/* <UseCallbackDemo /> */}
  {/* <WithoutUseCallback /> */}
  {/* <WithUseCallback /> */}
  {/* <UseContextHook /> */}
  {/* <UseReducerHookState/> */}
  <UseLayoutEffectHook/>
  </>
)


