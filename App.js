import { Image, StatusBar, Text, View } from "react-native";
import LoginScreen from "./src/Screens/LoginScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/Screens/HomeScreen";
import AuthenticatedUserProvider, {
  AuthenticatedUserContext,
} from "./Context/AuthenticationContext";
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./ConfigurationFirebase/config";
import ProfileScreen from "./src/Screens/ProfileScreen";
import SearchScreen from "./src/Screens/SearchScreen";
import ChatScreen from "./src/Screens/ChatScreen";
const loadingGif = require("./assets/loading.gif");

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerTitle: "WhatsApp",
          // headerTintColor: "red",
          // headerStyle: { backgroundColor: "black" },
        }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: "Rechercher" }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
        // ...
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  // console.log("user = ", user);

  return (
    <NavigationContainer>
      {isLoading === true && !user ? (
        <Image source={loadingGif} className="h-full w-full" />
      ) : isLoading === false && !user ? (
        <AuthStack />
      ) : (
        <MainStack />
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
      <StatusBar barStyle={"default"} />
    </AuthenticatedUserProvider>
  );
}
