import { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

export default function App() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <>
      <View style={styles.container}>
        {isRegistering ? <RegisterScreen /> : <LoginScreen />}
        <View style={styles.switchContainer}>
          <Button
            title={isRegistering ? "Go to Login" : "Go to Register"}
            onPress={() => setIsRegistering(!isRegistering)}
          />
        </View>
      </View>
      <Toast position="top" topOffset={50} visibilityTime={5000} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  switchContainer: {
    padding: 10,
    alignItems: "center",
  },
});
