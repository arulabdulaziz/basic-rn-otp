import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

import { Container } from "../../components";

const MainPage = () => {
  return (
    <Container>
      <View style={styles.loggedContainer}>
        <Text style={styles.welcomeText}>Welcome, User!</Text>
        <Button title="Logout" onPress={() => {}} />
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
