import { StyleSheet, Text, View, Button, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Container } from "../../components";
import { checkUserData } from "../../utils";

const MainPage = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkUserData(navigation, 'MainPage');
  }, []);

  const onLogout = async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem("user");
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("Error", JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <View style={styles.loggedContainer}>
        <Text style={styles.welcomeText}>Welcome, User!</Text>
        <Button
          title={loading ? "..." : "Logout"}
          onPress={onLogout}
          disabled={loading}
        />
      </View>
    </Container>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  loggedContainer: {
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
