const fs = require("fs");
const https = require("https");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const { authenticator } = require("otplib");
const qrcode = require("qrcode");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB setup
const uri = "mongodb://hrjlhy:19940823@34.212.130.14:27017/UserAuth?authSource=admin";
const client = new MongoClient(uri);
let usersCollection;

client.connect().then(() => {
  const db = client.db("UserAuth");
  usersCollection = db.collection("users");
  console.log("✅ Connected to MongoDB");
}).catch(console.error);

// Registration route
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

// Login route
app.post("/login", async (req, res) => {
  const { username, password, otp } = req.body;

  const user = await usersCollection.findOne({ username });
  if (!user) return res.status(401).json({ message: "User not found" });

  const validPassword = bcrypt.compareSync(password, user.password);
  const validOTP = authenticator.check(otp, user.secret);

  if (!validPassword || !validOTP) {
    return res.status(401).json({ message: "Invalid credentials or OTP" });
  }

  res.json({ message: "Login successful with MFA" });
});

// HTTPS setup
const options = {
  key: fs.readFileSync("../ssl/key.pem"),
  cert: fs.readFileSync("../ssl/cert.pem"),
};

https.createServer(options, app).listen(3001, () => {
  console.log("🚀 HTTPS Server running at https://localhost:3001");
});
