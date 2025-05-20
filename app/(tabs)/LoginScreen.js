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
      const res = await axios.post("https://b4c3705d7215.ngrok.app/login", {
        username,
        password,
        otp,
      });
      Toast.show({
        type: "success",
        text1: "Success",
        text2: res.data.message,
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text>Username</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
      />
      <Text>Password</Text>
      <TextInput
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />
      <Text>PIN</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        onChangeText={setOtp}
        value={otp}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});
