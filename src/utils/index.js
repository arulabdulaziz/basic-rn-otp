import AsyncStorage from "@react-native-async-storage/async-storage";

import { emailRegex, passwordRegex } from "../constants";

export const validateEmailUtils = (email, setEmailError) => {
  if (!emailRegex.test(email)) {
    const message = "Please enter a valid email address.";
    setEmailError(message);
    return message;
  } else {
    setEmailError("");
    return "";
  }
};

export const validatePasswordUtils = (password, setPasswordError) => {
  if (password.length < 8) {
    const message = "Password must contain at least 8 characters.";
    setPasswordError(message);
    return message;
  } else {
    setPasswordError("");
    return "";
  }
};

export const checkUserData = async (navigation, currentPage) => {
  try {
    const userDataString = await AsyncStorage.getItem("user");

    if (userDataString) {
      const userData = JSON.parse(userDataString) || {};
      if (userData.id && userData.email && currentPage !== "MainPage") {
        navigation.replace("MainPage");
      }
    } else if (currentPage !== "Login") {
      navigation.replace("Login");
    }
  } catch (error) {
    console.error(
      "Error retrieving user data from AsyncStorage:",
      error.message
    );
  }
};
