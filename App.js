import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "./src/screens/Register";
import Login from "./src/screens/Login";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          option={{ title: "Login" }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          option={{ title: "Register" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
