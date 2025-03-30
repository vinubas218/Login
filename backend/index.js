require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const db = process.env.MONGO_DB

const app = express()
app.use(cors())
app.use(express.json())

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
const User = mongoose.model('logs', UserSchema)

app.get("/dashboard", async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "your_secret_key"); 
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user });
    } catch (error) {
        console.error("JWT verification error:", error);
        return res.status(403).json({ success: false, message: "Invalid or expired token" });
    }
});

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; 
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token, jwtSecret);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

app.post("/createaccount", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.json({ success: true, message: "Account created successfully" });
});

app.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt for:", email);

    const user = await User.findOne({ email });
    if (!user) {
        console.log("User not found");
        return res.status(401).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
        console.log("Incorrect password for:", email);
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "your_secret_key", { expiresIn: "1h" });
    console.log("Login successful for:", email, "Token:", token);

    res.json({ success: true, token, user });
});


app.get("/dashboard", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ message: "Welcome", user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

app.get('/dashboard', authMiddleware, (req, res) => {
    res.json({message: "Welcome", user: req.user})
})

const connected = async () => {
    try {
        await mongoose.connect(db)
        console.log("Server connected to DB")
    } catch {
        console.log("Db connection not successful")
        process.exit(1)
    }
}

app.listen(process.env.PORT, async () => {
    await connected()
    console.log("Server connected to port 8000")
})