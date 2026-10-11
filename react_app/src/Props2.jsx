
// type -> rfce -> press 'Enter' - shortcut to create component

// Props in React


import React from 'react'
import {Detail, Detail2} from './Props'


function User() {

  const userData = {
    fullname: "Mahesh",
    age: 28,
    education: "B.E"
  }

  return (
    <Detail {...userData}/>  // props - {...userData} -> pass data to function/component (Detail)
                             // {... } - spread operator
  )
}

function User2() {

    const userData = {
      fullname: "Siva",
      age: 29,
      education: "B.E"
    }
  
    return (
      <Detail2 name={userData.fullname} age={userData.age} />  // props - {userData.fullname} age={userData.age} -> pass data to function/component(Detail2)
    )
  }


export {User, User2}


