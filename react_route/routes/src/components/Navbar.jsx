import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'


const Navbar = () => {
  const navigate = useNavigate() // hook

  const handleClick = () => {  // call the api, before navigate to another page
      // first api call

      // second click operation
      navigate("/version")
  }


  return (
    <nav>
        <h1>Techky Jose</h1>
        <ul>
            {/* navigate when click */}
            <Link to='/'>Home</Link>
            <Link to='/users'>Users</Link> 
            <Link to='/about'>About</Link>
            <Link to='/contact'>Contact</Link>

            {/* Do any work, before navigate to another page */}
            {/* <li onClick={()=> navigate("/version")}>Version</li> */}
            <li onClick={handleClick}>Version</li>
        </ul>
    </nav>
  )
}


export default Navbar

