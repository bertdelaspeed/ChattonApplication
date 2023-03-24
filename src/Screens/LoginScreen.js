import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../ConfigurationFirebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { processAuthError } from "../Utils";
import { registerIndieID } from "native-notify";

const backImage = require("../../assets/background_signin.jpg");

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // console.log("user = ", user);

  const HandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => registerIndieID(`${email}`, 6887, "mcb8UbHtYmKsvGClKWjJHY"))
        .catch((error) => {
          processAuthError(error);
        });
    }
  };

  return (
    <KeyboardAwareScrollView className="bg-black">
      <View>
        <Image source={backImage} className="object-cover h-80 w-full" />
      </View>
      <View className="bg-white h-screen rounded-t-3xl">
        <Text className="text-[#d60e45] text-3xl font-semibold text-center py-3 mt-3">
          Se connecter
        </Text>
        <View className="mt-10 items-center">
          <TextInput
            className="tracking-widest bg-gray-100 rounded-lg w-80 text-base py-2 px-1 mx-5 mb-5"
            placeholder="Entrer email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            className="tracking-widest bg-gray-100 rounded-lg w-80 text-base py-2 px-1 mx-5 mb-5"
            placeholder="Entrer mot de passe"
            autoCapitalize="none"
            secureTextEntry={true}
            autoCorrect={false}
            textContentType="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity
          onPress={HandleLogin}
          className="bg-[#fac25a] py-2 rounded-md mx-10 mt-10 mb-3"
        >
          <Text className="text-center font-semibold text-white text-lg">
            Se connecter
          </Text>
        </TouchableOpacity>
        <View className="flex-row space-x-2 justify-center">
          <Text className="font-light tracking-wider">Nouveau ici ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text className="font-medium text-[#d60e45]">Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
