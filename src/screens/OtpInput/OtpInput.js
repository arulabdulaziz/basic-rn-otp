import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Spinner from "react-native-loading-spinner-overlay";

import axios from "../../axios";

const OtpInput = (props) => {
  const { navigation } = props;
  const { email, password } = props.route.params;
  const timeToSendOtp = 30;
  const correctOtp = '111111'

  const [timer, setTimer] = useState(timeToSendOtp);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const onCodeFilled = async (code) => {
    try {
      setLoading(true);
      if (code !== correctOtp) {
        throw "Otp code is not correct"
      }
      await axios.post("/users", { email, password });
      Alert.alert("Success", "Register Success, Please Login");
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("Error", JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setTimer(timeToSendOtp);
  };

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={styles.otpStyle}>
        <Spinner visible={loading} textContent={"Loading..."} />
        <Text style={styles.otpTitleStyle}>Enter Authentication Code</Text>
        <Text style={styles.otpSubtitleStyle}>
          Enter the 6-digit that we have sent via the email to{" "}
          <Text style={styles.otpSubtitleEmailStyle}>{`user1@mail.com`}</Text>
        </Text>
        <OTPInputView
          pinCount={6}
          style={styles.otpInputStyle}
          autoFocusOnLoad
          codeInputFieldStyle={styles.codeInputFieldStyle}
          codeInputHighlightStyle={styles.codeInputHighlightStyle}
          onCodeFilled={onCodeFilled}
        />
      </View>
      <View style={styles.footerStyle}>
        <Text style={styles.coundownText}>
          {timer > 0 ? `Resend OTP in ${timer}s` : "Ready to Resend"}
        </Text>
        {timer === 0 && (
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendCodeText}>Resend Code</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#f5f5f5",
    marginTop: StatusBar.currentHeight * 2,
  },
  otpStyle: {
    flex: 8,
    alignItems: "center",
    textAlign: "center",
  },
  otpTitleStyle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  otpInputStyle: {
    width: "90%",
  },
  codeInputFieldStyle: {
    color: "black",
    fontWeight: "bold",
    borderRadius: 25,
  },
  codeInputHighlightStyle: {
    borderColor: "green",
  },
  otpSubtitleStyle: {
    color: "gray",
    textAlign: "center",
  },
  otpSubtitleEmailStyle: {
    fontWeight: "bold",
  },
  footerStyle: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  resendCodeText: {
    fontWeight: "bold",
    color: "gray",
  },
  coundownText: {
    color: "gray",
  },
});

export default OtpInput;
