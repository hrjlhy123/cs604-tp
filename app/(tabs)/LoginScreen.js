import axios from "axios";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://localhost:3001/login", {
        username,
        password,
        otp,
      });

      Toast.show({
        type: "success",
        text1: "🎉 Login Successful",
        text2: res.data.message,
        position: "top",
        visibilityTime: 5000,
      });
      alert(`Login Successful!`);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: err.response?.data?.message || "Something went wrong",
        position: "top",
        visibilityTime: 5000,
      });
      alert(`Login failed!`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        placeholder="Enter username"
        value={username}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
        placeholder="Enter password"
        value={password}
      />

      <Text style={styles.label}>PIN</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        onChangeText={setOtp}
        placeholder="Enter PIN"
        value={otp}
      />

      <View style={styles.buttonWrapper}>
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },

  buttonWrapper: {
    marginTop: 30,
  },
});
