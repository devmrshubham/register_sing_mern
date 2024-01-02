const UserDB = require("../Model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer');


class Controller {

    register = (data) => {
        return new Promise(async (resolve, rejected) => {

            const { name, gmail, password } = data


            try {
                if (!name || !gmail || !password) {
                    rejected(
                        {
                            msg: "please fill the data",
                            status: 0
                        }
                    )
                } else {
                    const exist = await UserDB.findOne({ gmail });
                    if (exist) {
                        rejected(
                            {
                                msg: "uesr already axist",
                                status: 0
                            }
                        )
                    } else {
                        const newUser = new UserDB(
                            {
                                name, gmail, password
                            }
                        )

                        newUser.save()
                            .then(
                                (success) => {
                                    resolve(
                                        {
                                            msg: "User register successfully",
                                            status: 1,
                                            User: newUser
                                        }
                                    )

                                    const transporter = nodemailer.createTransport({
                                        service: 'gmail',
                                        auth: {
                                            user: 'sd053366@gmail.com',
                                            pass: 'jrjzexhmdjhvgujt'
                                        }
                                    });

                                    const mailOptions = {
                                        from: 'sd053366@gmail.com',
                                        to: data.gmail,
                                        subject: 'Sending Email using Node.js',
                                        text: 'app regiter ho chuke ho yar'
                                    };

                                    transporter.sendMail(mailOptions, function (error, info) {
                                        if (error) {
                                            console.log(error);
                                        } else {
                                            console.log('Email sent: ' + info.response);
                                        }
                                    });

                                }
                            ).catch(
                                (error) => {
                                    console.log(error)
                                    rejected(
                                        {
                                            msg: "Unable to Add data",
                                            status: 0,

                                        }
                                    )
                                }
                            )
                    }
                }

            } catch (error) {
                console.log(error)
                rejected(
                    {
                        msg: "internal server error",
                        status: 0
                    }
                )
            }
        })

    }

    getUser = (id) => {
        return new Promise(async (resolve, rejected) => {

            try {
                if (id !== undefined) {
                    let data = await UserDB.findById(id).select("-password")
                    if (data == null) {
                        rejected(
                            {
                                msg: "user not found",
                                status: 0
                            }
                        )
                    } else {
                        resolve(
                            {
                                UserData: data,
                                status: 1
                            }
                        )
                    }

                } else {
                    let data = await UserDB.find();
                    resolve(
                        {
                            UserData: data,
                            status: 1
                        }
                    )
                }

            } catch (error) {
                resolve(
                    {
                        msg: "User not aurthorazation" + error.message,
                        status: 0
                    }
                )
            }
        })
    }

    loginUser = (data) => {

        return new Promise(async (resolve, rejected) => {
            const { gmail, password } = data

            try {
                if (!gmail || !password) {
                    rejected(
                        {
                            msg: "please fill the data",
                            status: 0
                        }
                    )
                } else {
                    const exist = await UserDB.findOne({ gmail });
                    if (exist) {
                        const mactchpassword = await bcrypt.compare(password, exist.password)
                        if (mactchpassword) {
                            const token = jwt.sign({ gmail }, "sdfhsdfoewfewsifdsf", { expiresIn: "15d" })
                            resolve(
                                {
                                    msg: "user loged in",
                                    User: exist,
                                    token: token,
                                    status: 1
                                }
                            )
                        } else {
                            rejected(
                                {
                                    msg: "password not matched",
                                    status: 0
                                }
                            )
                        }
                    } else {
                        rejected(
                            {
                                msg: "user not exist",
                                status: 0
                            }
                        )
                    }
                }
            } catch (error) {

                rejected(
                    {
                        msg: "Internal server error",
                        status: 0
                    }
                )
            }
        })
    }

    Forgate = (gmail) => {
        console.log(gmail)

        return new Promise(async (resolve, rejected) => {
            try {
                if (!gmail) {
                    rejected(
                        {
                            msg: "please fill the email",
                            status: 0
                        }
                    )
                } else {
                    const user = await UserDB.findOne({ gmail });
                    if (!user) {
                        rejected(
                            {
                                msg: "User not exist",
                                status: 0
                            }
                        )
                    } else {
                        const token = jwt.sign({ id: user._id }, "sdfhsdfoewfewsifdsf", { expiresIn: "1d" });

                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'sd053366@gmail.com',
                                pass: 'jrjzexhmdjhvgujt'
                            }
                        });

                        const mailOptions = {
                            from: 'sd053366@gmail.com',
                            to: gmail,
                            subject: 'reset password link',
                            text: `http://localhost:3000/reset_password/${user.id}/${token}`
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                                rejected(
                                    {
                                        msg: "password not forgate internal server error ",
                                        status: 0
                                    }
                                )
                            } else {
                                console.log('Email sent: ' + info.response);
                                resolve(
                                    {
                                        msg: "password forgate successfully go to gmail and reset password  ",
                                        status: 1
                                    }
                                )
                            }
                        });

                    }
                }

            } catch (error) {
                console.log(error)
                rejected(
                    {
                        msg: "Internal server error",
                        status: 0
                    }
                )
            }
        })
    }

    ResetPassword = (password, id) => {
        return new Promise(async (resolve, rejected) => {
            try {
                if (!password) {
                    rejected(
                        {
                            msg: "please fill the password",
                            status: 0
                        }
                    )
                } else {
                    const genratePassword = await bcrypt.hash(password, 10)
                    UserDB.findByIdAndUpdate({ _id: id }, { password: genratePassword })
                        .then(
                            (success) => {
                                resolve(
                                    {
                                        msg: "password reset successsfully please logged in",
                                        status: 1,
                                        password: success
                                    }
                                )
                            }
                        ).catch(
                            (error) => {

                                rejected(
                                    {
                                        msg: "Unable to reset password",
                                        status: 0,
                                        error: error.message
                                    }
                                )
                            }
                        )
                }

            } catch (error) {
                rejected(
                    {
                        msg: "internal server errro",
                        status: 0
                    }
                )
            }
        })

    }

}
module.exports = { Controller }