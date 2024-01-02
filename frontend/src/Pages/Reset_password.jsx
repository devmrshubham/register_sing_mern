import React from "react";
import "../Css/register.css";
import { ResetPassword } from "../Api/Api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const Reset_password = () => {
    const { id, token } = useParams()
    const Navigate = useNavigate();

    const FormData = async (e) => {
        e.preventDefault();

        const password = {
            password: e.target.password.value,
        };

        ResetPassword(password, id, token)
            .then((success) => {
                console.log(success);
                if (success.data.status === 1) {
                    toast.success(success.data.msg, { position: "bottom-left" });
                    e.target.reset();
                    Navigate("/login");
                } else {
                    toast.error(success.data.msg);
                }
            })
            .catch((error) => { });
    };
    return (
        <div className="register">
            <p>Reset Password</p>
            <form onSubmit={(e) => FormData(e)} encType="multipart/form-data">
                <div className="">
                    <label htmlFor=""> New Password:</label>
                    <br />
                    <input type="password" name="password" placeholder="Enter Your Password" />
                </div>
                <br />
                <div className="">
                    <button type="submit">Update</button>
                </div>
            </form>
        </div>
    );
};

export default Reset_password;
