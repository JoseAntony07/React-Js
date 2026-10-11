

function Detail({fullname, age, education}) {  // destructure - {fullname, age, education}
                                               // props always a object
  return (
    <>
    <h1> User Detail</h1>
    <h2>Full Name - {fullname}</h2>
    <h2>Age  - {age}</h2>
    <h2>Education  - {education}</h2>
    </>
  )
}   

function Detail2(props) {   // props always a object
  let {name, age} = props

  return (
    <>
    <h1> User Detail 2</h1>
    <h2>Full Name - {name}</h2>
    <h2>Age  - {age}</h2>
    </>
  )
}  


export {Detail, Detail2}
