const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const UserRouter = require("./Router/User")
const app = express()
const port = 5000;
//middleware
app.use(express.json())
app.use(cors())
//Router
app.use("/", UserRouter)


mongoose.connect("mongodb+srv://shubhamdewangan:1997@cluster0.dhzvpk4.mongodb.net/?retryWrites=true&w=majority")
    .then(
        (success) => {
            console.log("yess database connected")
            app.listen(port, () => {
                console.log(`this server is runnning on at http://localhost:${port}`)
            })
        }
    ).catch(
        (error) => {
            console.log("database not connected")
        }
    )



