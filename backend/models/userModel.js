const mongoose = require("mongoose")

const usesrSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Porfavor agrega un nombre"]
    },
    email : {
        type: String,
        required: [true, "Porfavor agrega un email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Porfavor ingresa un Email valido"
        ]
    },
    password: {
        type: String,
        required: [true, "Porfavor agrega una contraseña"],
        minLength: [6, "La contraseña debe tener hasta 6 caracteres"],
        //maxLength: [32, "La contraseña debe tener hasta 6 caracteres"],//
    },
    phone: {
        type: String,
        default: "+234"
    },
    bio: {
        type: String,
        maxLength: [250, "La biografia no debe tener mas de 250 caracteres"],
        default: "bio"
    },
 }, 
 {
    timestamps: true,
 }
);

const User = mongoose.model("User", usesrSchema)
module.exports = User