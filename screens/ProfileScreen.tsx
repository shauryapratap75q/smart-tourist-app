// screens/ProfileScreen.tsx
import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../theme";
import { AuthContext } from "../App";

export default function ProfileScreen() {
  const auth = useContext(AuthContext)!;

  return (
    <LinearGradient
      colors={[
        theme.colors.backgroundGradient.start,
        theme.colors.backgroundGradient.end,
      ]}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>👤 Your Profile</Text>
        <Text style={styles.subHeader}>Manage your personal details & account</Text>
      </View>

      {/* Profile Info Card */}
      <View style={styles.card}>
        <Text style={styles.info}>📛 Name: John Doe</Text>
        <Text style={styles.info}>📞 Phone: +91 9876543210</Text>
        <Text style={styles.info}>🛠 Role: Volunteer</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.card}>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.success }]}>
          <Text style={styles.btnText}>✏️ Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.danger }]}
          onPress={auth.signOut}
        >
          <Text style={styles.btnText}>🚪 Log Out</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { marginTop: 40, marginBottom: 20, alignItems: "center" },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: theme.colors.text },
  subHeader: { fontSize: 14, color: theme.colors.textSecondary, marginTop: 4, textAlign: "center" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  info: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginVertical: 8,
  },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
