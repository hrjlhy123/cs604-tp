const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const { authenticator } = require("otplib");
const qrcode = require("qrcode");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = [];

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const secret = authenticator.generateSecret(); // 为每个用户生成一个 secret

  const otpauth = authenticator.keyuri(username, "MFA-Demo", secret);
  const qrCodeDataURL = await qrcode.toDataURL(otpauth); // 生成二维码图像URL

  users.push({ username, password: hashedPassword, secret });

  res.json({ message: "Scan this QR code", qr: qrCodeDataURL });
});

app.post("/login", (req, res) => {
  const { username, password, otp } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(401).json({ message: "User not found" });

  const validPassword = bcrypt.compareSync(password, user.password);
  const validOTP = authenticator.check(otp, user.secret); // 验证动态6位密码

  if (!validPassword || !validOTP) {
    return res.status(401).json({ message: "Invalid credentials or OTP" });
  }

  res.json({ message: "Login successful with MFA" });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));