import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

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
      <View style={styles.content}>

        <View style={styles.card}>
          <ThemedText type="subtitle">Step 1: Register</ThemedText>
          <ThemedText>
            Create an account with username and password. Then scan the QR code
            with your Authenticator app.
          </ThemedText>
        </View>

        <View style={styles.card}>
          <ThemedText type="subtitle">Step 2: Login with MFA</ThemedText>
          <ThemedText>
            Enter your credentials and 6-digit OTP from your Authenticator to
            securely sign in.
          </ThemedText>
        </View>

        <View style={styles.card}>
          <ThemedText type="subtitle">Step 3: Dashboard</ThemedText>
          <ThemedText>
            Access your dashboard to change your password, delete your account,
            or log out.
          </ThemedText>
        </View>

        <View style={styles.card}>
          <ThemedText type="subtitle">Cross-Platform Ready</ThemedText>
          <ThemedText>
            Built with React Native and Express backend, supports Android, iOS,
            and Web.
          </ThemedText>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 100,
    width: 200,
    resizeMode: "contain",
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    gap: 8,
  },
});
