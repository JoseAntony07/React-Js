import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Settings from "./Pages/Settings"
import Navbar from './components/Navbar/Navbar'
import {Provider} from "react-redux"
import store from './app/store'
import PrivateRoute from './components/PrivateRoute'


const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route element={<PrivateRoute />}>
                <Route path='/settings' element={<Settings />} />
            </Route>
            
        </Routes>
      </BrowserRouter>
     </Provider>
  )
}

export default App