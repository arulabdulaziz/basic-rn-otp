import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { validateEmailUtils, validatePasswordUtils } from "../../utils";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = () => validateEmailUtils(email, setEmailError);

  const validatePassword = () => validatePasswordUtils(password, setPasswordError);

  const handleRegister = () => {
    // In a real-world scenario, you would perform registration logic here.
    // For simplicity, we'll just set a flag to indicate a successful registration.
  };

  const handleLogin = () => {
    navigation.goBack();
  };

  const disabled = (emailError || !email) && (passwordError || !password);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.titleText}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
          onBlur={validateEmail}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          onBlur={validatePassword}
        />
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
          disabled={disabled}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginText}>
            Already have an account? Login here
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  registerButton: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    color: "#3498db",
    marginTop: 15,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default RegisterScreen;
