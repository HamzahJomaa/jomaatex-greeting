

const { Schema, model } = require("mongoose")
const UserSchema = Schema({
    fullName: {
        type: String,
        required: [true, "firstName is required"],
    },
    phoneNumber: {
        type: String,
        required: [true, "lastName is required"],
    },
    city: {
        type: String,
        required: [true, "country is required"],
    },
    promoCode: {
        type: String,
        required: [true, "country is required"],
    },
    instagram:{
        type: String,
            required: [true, "Instagram is Required2"]
    }
},{ timestamps: true })


module.exports = model("User", UserSchema)