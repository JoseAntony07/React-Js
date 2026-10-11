import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Users from './Pages/Users'
import User from './Pages/User'
import Contact from './Pages/Contact'
import Error from './Pages/Error'
import Navbar from './components/Navbar'
import Version from './Pages/Version'


// using component and react-router-dom replicate pages in react even its a spa
// entire react application running in single html page(index.html) - spa(single page application)
// normal applicaton - each page has separate html file
// in react with the help of react-router-dom and router concept we show as multiple page in a single html file


function App() {

  return (
    <BrowserRouter>
        {/* navbar - common for all the pages */}
        {/* react will compare existing route with new route and only change new changes, wont render navbar in each screen */}
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/users' element={<Users />} />
            <Route path='/user/:username' element={<User />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/version' element={<Version />} />

            {/* Error Handling */}
            <Route path='*' element={<Error />} />
        </Routes>
    </BrowserRouter>

  )
}

export default App


// - if i use state in app component its available only in app component
// - or also available in child component by passing props (so can access state in child component)
// - when we use router, passing state as probs are very difficult
// - so we use redux to share state to entire react application. redux stores state globally
// - but when you refresh the page, state will be cleared as normal behaviour
// - simply, redux - global state management


// redux store -> stores multiple state data
// redux slice -> control the redux store
// slice has 2 things -> actions and reducers
// each state data has separate slice(action, reducers)
// reducer is a func, it is used to update the state
// action used to trigger or call the reducers(func)
// dispatch(func call) the actions  (call the actions) -> action mapped reducers will call -> reducers will update the state



// action ah dispatch pannanum pothu, antha action entha reducer func odatho. antha reducer func call aehum

