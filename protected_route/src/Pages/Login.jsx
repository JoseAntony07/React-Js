import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";



const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = () => {
            dispatch( 
                setUser({
                    name: "Antony", email: "antony@gmail.com"
                })
            )
            navigate('/')
        }

    return (
        <div>
            <h1>Login</h1>
            <button onClick={login}>Login</button>
        </div>
    )
}


export default Login;