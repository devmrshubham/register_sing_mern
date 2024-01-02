const express = require("express");
const { Controller } = require("../Controller/User")
const Router = express.Router();
const jwt = require("jsonwebtoken")

Router.post("/user", (req, res) => {
    try {
        const response = new Controller().register(req.body)
        response.then(
            (success) => {
                res.send(success)
            }
        ).catch(
            (error) => {
                res.send(error)
            }
        )
    } catch (error) {
        res.send(error)
    }

})

Router.get("/user/:id?", (req, res) => {
    const token = req.headers.authorization
    try {
        jwt.verify(token, "sdfhsdfoewfewsifdsf")
        const response = new Controller().getUser(req.params?.id)
        response.then(
            (success) => {
                res.send(success)
            }
        ).catch(
            (error) => {
                res.send(error)
            }
        )
    } catch (error) {
        res.send(error)
    }

})

Router.post("/login", (req, res) => {
    try {
        const response = new Controller().loginUser(req.body)
        response.then(
            (success) => {
                res.send(success)
            }
        ).catch(
            (error) => {
                res.send(error)
            }
        )
    } catch (error) {
        res.send(error)
    }

})

Router.post("/forgate_password", (req, res) => {
    try {
        const response = new Controller().Forgate(req.body?.gmail)
        response.then(
            (success) => {
                res.send(success)
            }
        ).catch(
            (error) => {
                res.send(error)
            }
        )
    } catch (error) {
        res.send(error)
    }

})

Router.post("/reset_password/:id/:token", (req, res) => {
    const { id, token } = req.params
    const { password } = req.body
    try {
        jwt.verify(token, "sdfhsdfoewfewsifdsf", (error, decoded) => {
            if (error) {
                res.send(
                    {
                        msg: "error with token",
                        status: 0
                    }
                )
            } else {
                const response = new Controller().ResetPassword(password, id)
                response.then(
                    (success) => {
                        res.send(success)
                    }
                ).catch(
                    (error) => {
                        res.send(error)
                    }
                )
            }
        })

    } catch (error) {
        res.send(error)
    }

})



module.exports = Router