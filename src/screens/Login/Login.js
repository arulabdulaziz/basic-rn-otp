import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Container } from "../../components";
import {
  validateEmailUtils,
  validatePasswordUtils,
  checkUserData,
} from "../../utils";
import axios from "../../axios";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkUserData(navigation, "Login");
  }, []);

  const handleLogin = async () => {
    const emailErrorUtils = validateEmail();
    const passwordErrorUtils = validatePassword();
    if (!emailErrorUtils && !passwordErrorUtils) {
      try {
        setLoading(true);
        const { data } = await axios.get("/users", { params: { email } });
        if (data.length === 0) {
          throw "User not Found";
        }
        const user = data[0];
        if (user.password !== password) {
          throw "Wrong Password!";
        }
        await AsyncStorage.setItem("user", JSON.stringify(user));
        navigation.replace("MainPage");
      } catch (error) {
        Alert.alert("Error", JSON.stringify(error));
      } finally {
        setLoading(false);
      }
    }
  };

  const validateEmail = () => validateEmailUtils(email, setEmailError);

  const validatePassword = () =>
    validatePasswordUtils(password, setPasswordError);

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <Container>
      <View style={styles.formContainer}>
        <Text style={styles.titleText}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
          onBlur={validateEmail}
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
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? "...." : "Login"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.registerText}>
            Don't have an account? Register here
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
  loginButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    color: "#3498db",
    marginTop: 15,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginScreen;
