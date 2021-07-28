require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const usersRouter = require("./routes/user");
const authRouter = require("./routes/auth");

const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }); 
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));

app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", usersRouter);

app.listen(process.env.PORT, () => console.log(`server has started at port ${process.env.PORT}`));