import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#007BFF", dark: "#007BFF" }}
      headerImage={
        <Image
          source={require("@/assets/images/MFA_Auth_App.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Register</ThemedText>
        <ThemedText>
          Create an account with username and password. Then scan the QR code
          with your Authenticator app.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Login with MFA</ThemedText>
        <ThemedText>
          Enter your credentials and 6-digit OTP from your Authenticator to
          securely sign in.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Dashboard</ThemedText>
        <ThemedText>
          Access your dashboard to change your password, delete your account, or
          log out.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Cross-Platform Ready</ThemedText>
        <ThemedText>
          Built with React Native and Express backend, supports Android, iOS,
          and Web.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    marginTop: 16,
    gap: 8,
  },
  reactLogo: {
    height: 100,
    width: 200,
    resizeMode: "contain",
    alignSelf: "flex-start",
  },
});
