import axios from "axios";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://www.hrjlhy.com/api/login", {
        username,
        password,
        otp,
      });

      const { token, message } = res.data;

      if (Platform.OS === "web") {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
      } else {
        await SecureStore.setItemAsync("token", token);
        await SecureStore.setItemAsync("username", username);
      }

      Toast.show({
        type: "success",
        text1: "🎉 Login Successful",
        text2: message,
        position: "top",
        visibilityTime: 5000,
      });

      router.replace("../home");
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: err.response?.data?.message || "Something went wrong",
        position: "top",
        visibilityTime: 5000,
      });
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
        placeholder="Enter 6-digit code"
        value={otp}
      />

      <View style={styles.buttonWrapper}>
        <Pressable style={styles.customButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
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
    alignItems: "center",
  },
  customButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
