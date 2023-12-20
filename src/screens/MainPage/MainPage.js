import { StyleSheet, Text, View, Button, Alert } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Container } from "../../components";

const MainPage = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const onLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      navigation.replace('Login');
    } catch (error) {
      Alert.alert("Error", JSON.stringify(error));
    }
  };

  return (
    <Container>
      <View style={styles.loggedContainer}>
        <Text style={styles.welcomeText}>Welcome, User!</Text>
        <Button title={loading ? '...' : 'Logout'} onPress={onLogout} disabled={loading}/>
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
