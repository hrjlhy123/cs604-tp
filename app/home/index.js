import { useNavigation } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [showSettings, setShowSettings] = useState(false);
  const [showChangeForm, setShowChangeForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Dashboard",
    });
  }, [navigation]);

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const savedToken =
          Platform.OS === "web"
            ? localStorage.getItem("token")
            : await SecureStore.getItemAsync("token");

        const savedUsername =
          Platform.OS === "web"
            ? localStorage.getItem("username")
            : await SecureStore.getItemAsync("username");

        if (savedToken && savedUsername) {
          setToken(savedToken);
          setUsername(savedUsername);
        } else {
          Toast.show({
            type: "error",
            text1: "Missing auth info",
            text2: "Please login again",
          });
          navigation.replace("/");
        }
      } catch (err) {
        console.error("Error loading auth:", err);
      }
    };

    loadAuth();
  }, []);

  const handleLogout = () => {
    if (Platform.OS === "web") {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      window.location.href = "http://localhost:8081/";
    } else {
      SecureStore.deleteItemAsync("token");
      SecureStore.deleteItemAsync("username");
      navigation.replace("/");
    }
  };

  const handleChangePassword = async () => {
    try {
      const res = await fetch("https://localhost:3001/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newPassword,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        Toast.show({
          type: "success",
          text1: "Password Updated",
          text2: data.message,
        });
        setShowChangeForm(false);
        setNewPassword("");
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Failed",
        text2: err.message,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <Text style={styles.text}>🎉 Welcome, {username}!</Text>
      </View>

      <View style={styles.settingsButtonBox}>
        <Pressable
          style={styles.customButton}
          onPress={() => {
            setShowSettings((prev) => !prev);
            setShowChangeForm(false);
            setShowDeleteConfirm(false);
          }}
        >
          <Text style={styles.buttonText}>Settings</Text>
        </Pressable>

        {showSettings && (
          <View style={styles.settingsBox}>
            {!showChangeForm && !showDeleteConfirm && (
              <>
                <Pressable
                  style={styles.customButton}
                  onPress={() => setShowChangeForm(true)}
                >
                  <Text style={styles.buttonText}>Change Password</Text>
                </Pressable>
                <Pressable
                  style={styles.customButton}
                  onPress={() => setShowDeleteConfirm(true)}
                >
                  <Text style={styles.buttonText}>Delete Account</Text>
                </Pressable>
              </>
            )}

            {showChangeForm && (
              <>
                <Text style={styles.breadcrumb}>
                  Settings &gt; Change Password
                </Text>

                <Text style={{ marginTop: 10 }}>Username (read-only)</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: "#eee" }]}
                  value={username}
                  editable={false}
                />

                <Text style={{ marginTop: 10 }}>New Password</Text>
                <TextInput
                  secureTextEntry
                  style={styles.input}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="Enter new password"
                />

                <Pressable style={styles.customButton} onPress={handleChangePassword}>
                  <Text style={styles.buttonText}>Confirm</Text>
                </Pressable>
              </>
            )}

            {showDeleteConfirm && (
              <>
                <Text style={styles.breadcrumb}>
                  Settings &gt; Delete Account
                </Text>
                <Text
                  style={{ color: "red", fontWeight: "bold", marginBottom: 10 }}
                >
                  ⚠️ Are you sure you want to delete this account?
                </Text>
                <Pressable
                  style={[styles.customButton, { backgroundColor: "red" }]}
                  onPress={async () => {
                    try {
                      const res = await fetch(
                        "https://localhost:3001/delete-user",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );

                      const data = await res.json();
                      if (res.ok) {
                        Toast.show({
                          type: "success",
                          text1: "Account Deleted",
                          text2: data.message,
                        });

                        if (Platform.OS === "web") {
                          localStorage.removeItem("token");
                          localStorage.removeItem("username");
                          window.location.href = "http://localhost:8081/";
                        } else {
                          await SecureStore.deleteItemAsync("token");
                          await SecureStore.deleteItemAsync("username");
                          navigation.replace("/");
                        }
                      } else {
                        throw new Error(data.message);
                      }
                    } catch (err) {
                      Toast.show({
                        type: "error",
                        text1: "Delete Failed",
                        text2: err.message,
                      });
                    }
                  }}
                >
                  <Text style={styles.buttonText}>Confirm Delete</Text>
                </Pressable>
              </>
            )}
          </View>
        )}
      </View>

      <Pressable style={styles.customButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  topBox: {
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  settingsButtonBox: {
    flexGrow: 1,
    alignSelf: "center",
    marginTop: 20,
  },
  settingsBox: {
    width: "100%",
    maxWidth: 320,
    alignSelf: "center",
    marginTop: 12,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  breadcrumb: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  customButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
