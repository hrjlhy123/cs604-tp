const fs = require("fs");
const https = require("https");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const { authenticator } = require("otplib");
const qrcode = require("qrcode");
const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_super_secret_key"; 

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB setup
const uri =
  "mongodb://hrjlhy:19940823@34.212.130.14:27017/UserAuth?authSource=admin";
const client = new MongoClient(uri);
let usersCollection;

client
  .connect()
  .then(() => {
    const db = client.db("UserAuth");
    usersCollection = db.collection("users");
    console.log("✅ Connected to MongoDB");
  })
  .catch(console.error);

// Middleware: JWT Token Verification
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Missing token" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user; // ✅ Inject username from token
    next();
  });
}

// Registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await usersCollection.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const secret = authenticator.generateSecret();
  const otpauth = authenticator.keyuri(username, "MFA-Demo", secret);
  const qrCodeDataURL = await qrcode.toDataURL(otpauth);

  await usersCollection.insertOne({
    username,
    password: hashedPassword,
    secret,
  });

  res.json({ message: "Scan this QR code", qr: qrCodeDataURL });
});

// Login + Token
app.post("/login", async (req, res) => {
  const { username, password, otp } = req.body;

  const user = await usersCollection.findOne({ username });
  if (!user) return res.status(401).json({ message: "User not found" });

  const validPassword = bcrypt.compareSync(password, user.password);
  const validOTP = authenticator.check(otp, user.secret);

  if (!validPassword || !validOTP) {
    return res.status(401).json({ message: "Invalid credentials or OTP" });
  }

  // ✅ Generate JWT token
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ message: "Login successful with MFA", token });
});

// Change password (auth required)
app.post("/change-password", authenticateToken, async (req, res) => {
  const { newPassword } = req.body;
  const username = req.user.username;

  if (!newPassword) {
    return res.status(400).json({ message: "Missing new password" });
  }

  const user = await usersCollection.findOne({ username });
  if (!user) return res.status(404).json({ message: "User not found" });

  const newHashedPassword = bcrypt.hashSync(newPassword, 10);
  await usersCollection.updateOne(
    { username },
    { $set: { password: newHashedPassword } }
  );

  res.json({ message: "Password updated successfully" });
});

// Delete user (auth required)
app.post("/delete-user", authenticateToken, async (req, res) => {
  const username = req.user.username;

  const result = await usersCollection.deleteOne({ username });

  if (result.deletedCount === 1) {
    return res.json({ message: "User deleted successfully" });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

// HTTPS server
const options = {
  key: fs.readFileSync("../ssl/localhost+1-key.pem"),
  cert: fs.readFileSync("../ssl/localhost+1.pem"),
};

https.createServer(options, app).listen(3001, () => {
  console.log("🚀 HTTPS Server running at https://localhost:3001");
});
