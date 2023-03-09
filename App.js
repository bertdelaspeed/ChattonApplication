import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import LoginScreen from "./src/Screens/LoginScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";

export default function App() {
  return (
    <View>
      {/* <LoginScreen /> */}
      <RegisterScreen />
      <StatusBar style="auto" />
    </View>
  );
}
