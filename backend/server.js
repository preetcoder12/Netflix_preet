require('dotenv').config();
const express = require("express");
const authrouter = require("./routes/auth")
const { connectDB } = require("./config/db")






const app = express();
const port = process.env.port || 10000;

app.use(express.json());

app.get('/', (req, res) => {
    return res.send("home page");
});

app.use('/user', authrouter);
app.listen(port, () => {
    console.log(`server started at port:  http://localhost:${port}`);
    connectDB();

})