import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import theme from "../theme";

export default function EmergencyScreen() {
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const showModal = (message: string) => {
    setModalMessage(message);
  };

  const closeModal = () => {
    setModalMessage(null);
  };

  const sendSOS = () => {
    showModal("🚨 SOS Sent!\n\nAuthorities (Police, Fire, Rangers) have been notified.");
  };

  const sendEmergency = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location permission is required!");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const message = `📍 Emergency Sent!\n\nYour location has been shared:\nLat: ${location.coords.latitude}, Lon: ${location.coords.longitude}`;
    showModal(message);
  };

  const sendHelp = () => {
    showModal("🤝 Help Request!\n\nNearby volunteers have been alerted to assist you.");
  };

  return (
    <LinearGradient
      colors={[theme.colors.backgroundGradient.start, theme.colors.backgroundGradient.end]}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🚨 Emergency Actions</Text>
        <Text style={styles.subHeader}>Choose the type of alert you want to send</Text>
      </View>

      {/* Emergency Buttons */}
      <View style={styles.card}>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.colors.danger }]} onPress={sendSOS}>
          <Text style={styles.btnText}>🚨 SOS Alert</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.colors.warning }]} onPress={sendEmergency}>
          <Text style={styles.btnText}>📍 Share Location</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.colors.success }]} onPress={sendHelp}>
          <Text style={styles.btnText}>🤝 Request Help</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for confirmation */}
      <Modal visible={modalMessage !== null} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={closeModal}>
              <Text style={{ fontWeight: "bold" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { marginTop: 40, marginBottom: 20, alignItems: "center" },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: theme.colors.text },
  subHeader: { fontSize: 14, color: theme.colors.textSecondary, marginTop: 4, textAlign: "center" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  actionBtn: {
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginVertical: 10,
  },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
  },
  modalText: { fontSize: 16, textAlign: "center", marginBottom: 16 },
  closeBtn: {
    backgroundColor: "#e5e7eb",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});
