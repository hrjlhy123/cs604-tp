# 🔐 MFA Auth App

A cross-platform authentication app with built-in Multi-Factor Authentication (MFA) using TOTP (Time-Based One-Time Passwords), built with React Native and Express.js.

## 🚀 Features

- ✅ **Register with username & password**
- 🔐 **Scan QR Code with Microsoft/Google Authenticator**
- 🔒 **Login using MFA (OTP + Password)**
- 🧑‍💼 **Dashboard with:**
  - Change Password
  - Delete Account
  - Logout
- 📱 **Responsive UI for iOS, Android & Web**
- 📦 Secure token storage using `SecureStore` (native) or `localStorage` (web)

## 🛠 Tech Stack

### Frontend
- React Native (Expo)
- Expo Router
- Toast Notifications
- SecureStore (Expo)
- React Native Vector Icons

### Backend
- Express.js
- MongoDB
- bcrypt for password hashing
- otplib for TOTP
- QRCode generation

## 📸 Screens

- Register → Scan QR
- Login → Enter password + OTP
- Dashboard → Manage your account

## 🧪 Usage

### 1. Start Backend

```bash
cd server
npm install
node server.js
```

### 2. Start Frontend

```bash
npx expo start
```

> ⚠️ Make sure MongoDB is running and the backend server URL is correctly set in your frontend code (switch between `http` and `https` as needed).

## 📂 Folder Structure

```
/server
  └── server.js, routes, DB setup, auth logic
/frontend
  ├── app/(tabs)/login.tsx
  ├── app/(tabs)/register.tsx
  ├── app/(tabs)/dashboard.tsx
  └── components/, constants/, hooks/
```

## 🔐 Security Notes

- All credentials are securely hashed.
- OTP secrets are generated per user.
- JWT is used for session management.

## ✨ Future Ideas

- Email verification
- Password reset via email
- Fingerprint / FaceID integration

## 📄 License

MIT License

---

Built with ❤️ by Jack Hao


<!-- Security scan triggered at 2026-09-05 07:55:16 -->