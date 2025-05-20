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
      const res = await axios.post("https://b4c3705d7215.ngrok.app/register", {
        username,
        password,
      });

      setQrCodeUrl(res.data.qr); // 后端返回的二维码 URL
      Toast.show({
        type: "success",
        text1: "Registration Successful",
        text2: "Scan the QR code below with Authenticator App",
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
      <Text>Username</Text>
      <TextInput style={styles.input} onChangeText={setUsername} value={username} />

      <Text>Password</Text>
      <TextInput
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />

      <Button title="Register" onPress={handleRegister} />

      {qrCodeUrl && (
        <View style={styles.qrContainer}>
          <Text style={{ marginVertical: 10 }}>Scan this QR Code:</Text>
          <Image source={{ uri: qrCodeUrl }} style={styles.qrImage} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  qrContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  qrImage: {
    width: 250,
    height: 250,
  },
});
