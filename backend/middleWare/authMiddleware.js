const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protect = asyncHandler (async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            res.status(401)
            throw new Error("No autorizado, porfavor inicie sesión")
        }
        //Verificar el token

        const verified = jwt.verify(token, process.env.JWT_SECRET)

        //Obtener el id del usuario del token
        const user = await User.findById(verified.id).select("-password");

        if(!user) {
            res.status(401)
            throw new Error("El usuario no fue encontrado");
        }
        req.user = user
        next();

    } catch (error) {
        res.status(401)
        throw new Error("Not authorized, please login");
    }
});


module.exports = protect