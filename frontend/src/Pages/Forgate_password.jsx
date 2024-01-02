import React from 'react'
import "../Css/register.css";
import { Forgate } from '../Api/Api';
import { toast } from "react-toastify"



const Forgate_password = () => {

  const FormData = (e) => {
    e.preventDefault()

    const data = {
      gmail: e.target.gmail.value,

    }

    Forgate(data)
      .then(
        (success) => {
          console.log(success)
          if (success.data.status === 1) {
            toast.success(success.data.msg, { position: "bottom-left" })
            e.target.reset()


          } else {
            toast.error(success.data.msg)
          }
        }
      ).catch(
        (error) => {

        }
      )






  }
  return (
    <div className="register">
      <p>Forgate Password</p>
      <form onSubmit={(e) => FormData(e)} encType='multipart/form-data'>

        <div className="">
          <label htmlFor="">Email:</label><br />
          <input type="email" name="gmail" placeholder="Enter Your Email" />
        </div> <br />


        <div className="">
          <button type="submit">Submit</button>
        </div>

      </form>

    </div>
  )
}

export default Forgate_password
