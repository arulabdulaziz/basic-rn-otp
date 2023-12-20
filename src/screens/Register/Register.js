import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Container } from "../../components";
import { validateEmailUtils, validatePasswordUtils } from "../../utils";
import axios from "../../axios";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = () => validateEmailUtils(email, setEmailError);

  const validatePassword = () =>
    validatePasswordUtils(password, setPasswordError);

  const handleRegister = async () => {
    const emailErrorUtils = validateEmail();
    const passwordErrorUtils = validatePassword();
    if (!emailErrorUtils && !passwordErrorUtils) {
      try {
        setLoading(true);
        const { data } = await axios.get("/users", { params: { email } });
        if (data.length !== 0) {
          throw "User Already Exist!";
        }
        navigation.replace('OtpInput', { email, password })
      } catch (error) {
        Alert.alert("Error", JSON.stringify(error));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogin = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <View style={styles.formContainer}>
        <Text style={styles.titleText}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
          onBlur={validateEmail}
          editable={!loading}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          onBlur={validatePassword}
          editable={!loading}
        />
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginText}>
            Already have an account? Login here
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
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
