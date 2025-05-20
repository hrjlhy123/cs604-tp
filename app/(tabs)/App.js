import { useState } from 'react';
import { Button, View } from 'react-native';
import Toast from 'react-native-toast-message';
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

export default function App() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <>
      <View style={{ flex: 1 }}>
        {isRegistering ? <RegisterScreen /> : <LoginScreen />}
        <View style={{ padding: 10 }}>
          <Button
            title={isRegistering ? "Go to Login" : "Go to Register"}
            onPress={() => setIsRegistering(!isRegistering)}
          />
        </View>
      </View>
      <Toast />
    </>
  );
}