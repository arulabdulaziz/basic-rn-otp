import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "./src/screens/Register";
import Login from "./src/screens/Login";

export default function App() {
  const Stack = createStackNavigator();

  const optionScreens = {
    headerShown: false,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={optionScreens}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={optionScreens}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
