import { emailRegex, passwordRegex } from "../constants";

export const validateEmailUtils = (email, setEmailError) => {

  if (!emailRegex.test(email)) {
    setEmailError("Please enter a valid email address.");
  } else {
    setEmailError("");
  }
};

export const validatePasswordUtils = (password, setPasswordError) => {
  if (!passwordRegex.test(password)) {
    setPasswordError(
      "Password must contain at least 8 characters, a lowercase letter, an uppercase letter, and a symbol."
    );
  } else {
    setPasswordError("");
  }
};