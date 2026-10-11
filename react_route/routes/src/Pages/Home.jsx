import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUsers } from '../slices/userSlice'


const Home = () => {
 const dispatch = useDispatch() // dispatch the action

 const [formInput, setformInput] = useState({
  name: "",
  age: "",
  email: "",
  contact: ""
 })

 const handleChange = (event) => {
  const {name, value} = event.target
  console.log(name, value)

  setformInput((currInput) => {

    // it processes it in order from top to bottom (left to right inside the object literal).
    return {
      ...currInput,  // spreading
      [name]: value  // This adds or updates a property dynamically.
    }
  })
 }

//  console.log('formInput -> ',formInput)

  const addUser = (event) => {
    event.preventDefault() // to stop refresh
    dispatch(setUsers(formInput))
  }

  return (
    <div>
      <form action="">
        <label>Name</label>
        <br />
        <input name='name' type="text" value={formInput.name} onChange={handleChange}/>
        <br />
        <label>Age</label>
        <br />
        <input name='age' type="number" value={formInput.age} onChange={handleChange} />
        <br />
        <label>Email</label>
        <br />
        <input name='email' type="email" value={formInput.email} onChange={handleChange} />
        <br />
        <label>Contact</label>
        <br />
        <input name='contact' type="text" value={formInput.contact} onChange={handleChange} />
        <br />
        <br />
        <button onClick={addUser}>Add</button>
      </form>
    </div>
  )
}

export default Home
