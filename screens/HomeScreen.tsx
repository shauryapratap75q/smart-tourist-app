import React, { JSX, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import * as Location from "expo-location";

const theme = {
  colors: {
    backgroundGradient: {
      start: "#4361EE",
      end: "#4895EF",
    },
    danger: "#F72F5F",
    success: "#0E954E",
    accent: "#4895EF",
    text: "#FFFFFF",
    textSecondary: "#E5E7EB",
  },
};

type ModalContent = {
  emoji: string;
  title: string;
  text: string;
} | null;

export default function HomeScreen(): JSX.Element {
  const [modalContent, setModalContent] = useState<ModalContent>(null);

  const handleSOS = () => {
    setModalContent({
      emoji: "🚨",
      title: "Emergency Alert Sent!",
      text: "Your location has been shared with authorities.",
    });
  };

  const handleShareLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required!");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setModalContent({
        emoji: "📍",
        title: "Location Shared!",
        text: `Your real-time location:\nLat: ${latitude}\nLon: ${longitude}`,
      });
    } catch (err) {
      Alert.alert("Error", "Unable to fetch location.");
    }
  };

  const handleCheckIn = () => {
    setModalContent({
      emoji: "✅",
      title: "Checked In!",
      text: "Your contacts have been notified that you are safe.",
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello, Sarah</Text>
        <Text style={styles.safeText}>🟢 You are safe</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Emergency CTA */}
        <View style={[styles.card, { backgroundColor: theme.colors.danger }]}>
          <Text style={styles.cardTitle}>Feeling Unsafe?</Text>
          <Text style={styles.cardSubtitle}>
            Tap this button to alert emergency services and share your location.
          </Text>
          <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
            <Text style={styles.sosText}>🚨 SOS</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.quickCard} onPress={handleShareLocation}>
            <Text style={styles.quickIcon}>📍</Text>
            <Text style={styles.quickTitle}>Share My Location</Text>
            <Text style={styles.quickSubtitle}>
              Instantly share your real-time location.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickCard} onPress={handleCheckIn}>
            <Text style={styles.quickIcon}>✅</Text>
            <Text style={styles.quickTitle}>Check-in</Text>
            <Text style={styles.quickSubtitle}>
              Let contacts know you’re safe.
            </Text>
          </TouchableOpacity>
        </View>

        {/* Alerts Section */}
        <View style={styles.alertCard}>
          <Text style={styles.alertTitle}>Local Alerts</Text>

          <View style={[styles.alertBox, { backgroundColor: "#FEF3C7" }]}>
            <Text style={styles.alertEmoji}>🌧️</Text>
            <View>
              <Text style={styles.alertHeading}>Weather Advisory</Text>
              <Text style={styles.alertText}>
                Heavy rain expected tonight. Stay safe.
              </Text>
            </View>
          </View>

          <View style={[styles.alertBox, { backgroundColor: "#E5E7EB" }]}>
            <Text style={styles.alertEmoji}>🔒</Text>
            <View>
              <Text style={styles.alertHeading}>Security Tips</Text>
              <Text style={styles.alertText}>
                Secure your belongings & stay aware.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal visible={!!modalContent} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {modalContent && (
              <>
                <Text style={styles.modalEmoji}>{modalContent.emoji}</Text>
                <Text style={styles.modalTitle}>{modalContent.title}</Text>
                <Text style={styles.modalText}>{modalContent.text}</Text>
              </>
            )}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setModalContent(null)}
            >
              <Text style={{ fontWeight: "bold" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#4361EE" },
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  safeText: { fontSize: 14, color: "#0E954E" },
  card: { padding: 20, borderRadius: 20, marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  cardSubtitle: { fontSize: 14, color: "#fce7f3", marginBottom: 12 },
  sosButton: {
    backgroundColor: "#7f1d1d",
    padding: 16,
    borderRadius: 50,
    alignItems: "center",
  },
  sosText: { fontSize: 24, color: "#fff", fontWeight: "bold" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  quickCard: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 16,
    alignItems: "center",
  },
  quickIcon: { fontSize: 22 },
  quickTitle: { fontWeight: "bold", color: "#333", marginTop: 6 },
  quickSubtitle: { fontSize: 12, color: "#555", textAlign: "center" },
  alertCard: { backgroundColor: "#fff", padding: 16, borderRadius: 16 },
  alertTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  alertBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  alertEmoji: { fontSize: 18, marginRight: 8 },
  alertHeading: { fontSize: 14, fontWeight: "600" },
  alertText: { fontSize: 12 },
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
  modalEmoji: { fontSize: 40, marginBottom: 10 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 6 },
  modalText: { fontSize: 14, textAlign: "center", marginBottom: 16 },
  closeBtn: {
    backgroundColor: "#e5e7eb",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});
