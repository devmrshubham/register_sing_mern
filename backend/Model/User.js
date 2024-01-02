const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    gmail: {

        type: String, required: true, index: true, unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

//password hosing
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next()
})



const userInfo = mongoose.model("userInfo", UserSchema)
module.exports = userInfo