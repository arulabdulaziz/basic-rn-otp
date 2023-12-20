import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Register from "./src/screens/Register";
import Login from "./src/screens/Login";
import OtpInput from "./src/screens/OtpInput";
import MainPage from "./src/screens/MainPage";

export default function App() {
  const Stack = createStackNavigator();

  const optionScreens = {
    headerShown: false,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OtpInput">
        <Stack.Screen name="Login" component={Login} options={optionScreens} />
        <Stack.Screen
          name="Register"
          component={Register}
          options={optionScreens}
        />
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={optionScreens}
        />
        <Stack.Screen
          name="OtpInput"
          component={OtpInput}
          options={optionScreens}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
