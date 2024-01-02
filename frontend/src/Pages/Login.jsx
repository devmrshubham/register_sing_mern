import React from 'react'
import "../Css/register.css";
import { Link } from 'react-router-dom';
import { login } from '../Api/Api';
import { toast } from "react-toastify"


const Login = () => {
    const FormData = async (e) => {
        e.preventDefault()

        const data = {

            gmail: e.target.gmail.value,
            password: e.target.password.value,
        }

        login(data)
            .then(
                (success) => {
                    console.log(success)
                    if (success.data.status === 1) {
                        toast.success(success.data.msg, { position: "bottom-left" })
                        e.target.reset()
                        localStorage.setItem("token", success.data.token)
                    } else {
                        toast.error(success.data.msg)
                    }
                }
            ).catch(
                (error) => {
                    console.log(error)
                }
            )






    }
    return (
        <div className="register">
            <p>Login</p>
            <form onSubmit={(e) => FormData(e)} encType='multipart/form-data'>

                <div className="">
                    <label htmlFor="">Email:</label><br />
                    <input type="email" name="gmail" placeholder="Enter Your Email" />
                </div>
                <div className="">
                    <label htmlFor="">Password:</label><br />
                    <input type="password" name="password" placeholder="Enter Your Password" />
                </div>
                <Link to="/forgate_password">
                    forgate password
                </Link>

                <div className="">
                    <button type="submit">Submit</button>
                </div>

            </form>

        </div>
    )
}

export default Login
