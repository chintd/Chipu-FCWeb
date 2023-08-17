const express = require("express");
const shopRouter = require("./router/main");
const userRouter = require("./router/user")
const app = express();
const cors = require('cors');
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(shopRouter);
app.use("/user", userRouter)
app.listen(5000);
