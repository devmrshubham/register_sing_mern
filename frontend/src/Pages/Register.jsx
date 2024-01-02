import React from 'react'
import "../Css/register.css";
import { Link, useNavigate } from 'react-router-dom';
import { sendData } from '../Api/Api';
import { toast } from "react-toastify"



const Register = () => {
    const Navigate = useNavigate()
    const FormData = async (e) => {
        e.preventDefault()

        const data = {
            name: e.target.name.value,
            gmail: e.target.gmail.value,
            password: e.target.password.value,
        }

        sendData(data)
            .then(
                (success) => {
                    if (success.data.status === 1) {
                        toast.success(success.data.msg, { position: "bottom-left" })
                        e.target.reset()
                        Navigate("/login")
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
            <p>Register</p>
            <form onSubmit={(e) => FormData(e)} encType='multipart/form-data'>
                <div className="">
                    <label htmlFor="">Name:</label><br />
                    <input type="text" name="name" placeholder="Enter Your Name" />
                </div>
                <div className="">
                    <label htmlFor="">Email:</label><br />
                    <input type="email" name="gmail" placeholder="Enter Your Email" />
                </div>
                <div className="">
                    <label htmlFor="">Password:</label><br />
                    <input type="password" name="password" placeholder="Enter Your Password" />
                </div>
                <Link to="/login">
                    User Login
                </Link>

                <div className="">
                    <button type="submit">Submit</button>
                </div>

            </form>

        </div>
    )
}

export default Register
