const User = require("../../backend/models/user")


async function signup(req, res) {
    try {
        const { email, username, password } = req.body;
        if (!username || !email || !password) { return res.status(400).json({ error: "misssing values" }); }
        const emailregx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailregx.test(email)) { return res.status(400).json({ error: "Invalid email" }); }
        if (password.length < 6) { return res.status(400).json({ error: "password must be atleast 6 characters" }); }
        const existinguserByemail = await User.findOne({ email: email });
        if (existinguserByemail) { return res.status(400).json({ error: "Email already exist" }); }
        const existinguserByeusername = await User.findOne({ username: username });
        if (existinguserByeusername) { return res.status(400).json({ error: "Username already exist try another one" }); }

        const PROFILE_PICS = ["./avatar1.png", "./avatar2.png", "./avatar3.png"];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
        const newuser = new User({
            username,
            email,
            password,
            image
        })
        await newuser.save();
    } catch (error) {
        console.error("Signup Error:", error); // Log error to console
        return res.status(500).json({ error: "Internal server error !" });
    }

}
function login(req, res) {
    return res.send("signin page");

}
function logout(req, res) {
    return res.redirect('/');

}

module.exports = {
    signup,
    login,
    logout

}