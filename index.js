require('dotenv').config();
const express = require("express");
const authRouter = require("./routes/authRouter");
const errorMiddleware = require("./middlewares/error-middleware");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const taskRouter = require('./routes/taskRouter');

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(cookieParser())
app.use(cors({ origin: true }))
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);
app.use(errorMiddleware);

const start = () => {
    try {
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log("Server started on port: " + PORT))
    } catch (e) {
        console.log(e);
    }
}

start();
