import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthContext } from "../App";
import theme from "../theme";

export default function RegistrationScreen({ navigation }: any) {
  const auth = useContext(AuthContext)!;
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [idType, setIdType] = useState("Aadhar");
  const [idNumber, setIdNumber] = useState("");

  const [healthCondition, setHealthCondition] = useState("No");
  const [healthDescription, setHealthDescription] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  const onSignUp = async () => {
    if (!email || !password || !idNumber || !name) return;

    if (idType === "Aadhar" && idNumber.length !== 12) {
      alert("Aadhar number must be 12 digits");
      return;
    }
    if (mobile && mobile.length !== 10) {
      alert("Mobile number must be 10 digits");
      return;
    }
    if (emergencyContact.length !== 10) {
      alert("Emergency contact must be 10 digits");
      return;
    }

    await auth.signUp(email);
  };

  return (
    <LinearGradient
      colors={[
        theme.colors.backgroundGradient.start,
        theme.colors.backgroundGradient.end,
      ]}
      style={{ flex: 1 }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formBox}>
          <Text style={styles.logo}>Create Account</Text>

          <TextInput
            style={styles.input}
            placeholder="Full name (as per ID)"
            placeholderTextColor={theme.colors.subtleText}
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Mobile number"
            placeholderTextColor={theme.colors.subtleText}
            keyboardType="phone-pad"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
          />

          <Text style={styles.label}>Select ID Type</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={idType}
              dropdownIconColor={theme.colors.text}
              style={{ color: theme.colors.text }}
              onValueChange={(val: string) => {
                setIdType(val);
                setIdNumber("");
              }}
            >
              <Picker.Item label="Aadhar Card" value="Aadhar" />
              <Picker.Item label="Passport" value="Passport" />
              <Picker.Item label="Driving License" value="Driving License" />
              <Picker.Item label="Voter ID" value="Voter ID" />
            </Picker>
          </View>

          <TextInput
            style={styles.input}
            placeholder={`Enter ${idType} number`}
            placeholderTextColor={theme.colors.subtleText}
            keyboardType="default"
            maxLength={idType === "Aadhar" ? 12 : undefined}
            value={idNumber}
            onChangeText={setIdNumber}
          />

          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor={theme.colors.subtleText}
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={theme.colors.subtleText}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* ✅ Health condition */}
          <Text style={styles.label}>Any health condition?</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={healthCondition}
              dropdownIconColor={theme.colors.text}
              style={{ color: theme.colors.text }}
              onValueChange={(val: string) => {
                setHealthCondition(val);
                if (val === "No") setHealthDescription("");
              }}
            >
              <Picker.Item label="No" value="No" />
              <Picker.Item label="Yes" value="Yes" />
            </Picker>
          </View>

          {healthCondition === "Yes" && (
            <TextInput
              style={[styles.input, { height: 80, textAlignVertical: "top" }]}
              placeholder="Describe your health condition"
              placeholderTextColor={theme.colors.subtleText}
              value={healthDescription}
              onChangeText={setHealthDescription}
              multiline
            />
          )}

          {/* ✅ Emergency Contact */}
          <TextInput
            style={styles.input}
            placeholder="Emergency contact (10 digits)"
            placeholderTextColor={theme.colors.subtleText}
            keyboardType="phone-pad"
            maxLength={10}
            value={emergencyContact}
            onChangeText={setEmergencyContact}
          />

          <TouchableOpacity style={styles.signupBtn} onPress={onSignUp}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>

          <View style={styles.bottomBar}>
            <Text style={{ color: theme.colors.subtleText }}>
              Have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.replace("Login")}>
              <Text style={styles.login}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: theme.spacing.large,
  },
  formBox: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.large,
    padding: theme.spacing.large,
    ...theme.shadow.default,
  },
  logo: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: theme.spacing.large,
    color: theme.colors.primary,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: theme.colors.text,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.medium,
    marginBottom: 12,
    backgroundColor: theme.colors.input,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.medium,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
    backgroundColor: theme.colors.input,
    color: theme.colors.text,
  },
  signupBtn: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: theme.radius.large,
    alignItems: "center",
    marginTop: 8,
    ...theme.shadow.default,
  },
  signupText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  login: { color: theme.colors.accent, fontWeight: "700" },
});
