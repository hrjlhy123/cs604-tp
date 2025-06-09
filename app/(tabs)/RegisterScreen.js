import axios from "axios";
import { useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState(null);

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:3001/register", {
        username,
        password,
      });

      setQrCodeUrl(res.data.qr);
      Toast.show({
        type: "success",
        text1: "Registration Successful",
        text2: "Scan the QR code below with your Authenticator App",
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Register Failed",
        text2: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        onChangeText={setUsername}
        value={username}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Enter password"
        onChangeText={setPassword}
        value={password}
      />

      <View style={styles.buttonWrapper}>
        <Button title="Register" onPress={handleRegister} />
      </View>

      {qrCodeUrl && (
        <View style={styles.qrContainer}>
          <Text style={styles.qrText}>Scan this QR Code:</Text>
          <Image source={{ uri: qrCodeUrl }} style={styles.qrImage} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    marginBottom: 6,
    marginTop: 14,
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
  qrContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  qrText: {
    marginBottom: 10,
    fontSize: 16,
  },
  qrImage: {
    width: 250,
    height: 250,
    borderRadius: 12,
  },
});
