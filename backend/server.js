const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleWare/errorMiddleWare")
const cookieParser = require("cookie-parser")
const productRoute = require("./routes/productRoute");

const app = express()

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());



//Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

// Routes
app.get("/", (req, res) => {
    res.send("Home Page");
  });


// Error Middleware
app.use(errorHandler);

// Routes
app.get("/", (req, res) => {
      res.send("Home Page");
})

// Connect to DB and start server

const PORT = process.env.PORT || 5000;

// Connect to DB and start server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        app.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}`);
        });

    })

    .catch((err) => console.log(err))