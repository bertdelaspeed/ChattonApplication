import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../ConfigurationFirebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
const backImage = require("../../assets/background_signup.jpg");

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const HandleRegister = () => {
    if (email !== "" && password !== "") {
      if (password !== confirmPassword) {
        Alert.alert("Error", "Les mots de passe ne sont pas identiques");
        return;
      } else {
        createUserWithEmailAndPassword(auth, email, password)
          .then(Alert.alert("Info", "Compte cree avec succes"))
          .catch((error) => {
            Alert.alert("error", error.message);
          });
      }
    }
  };

  // console.log("password = ", password);

  return (
    <KeyboardAwareScrollView className="bg-black">
      <View>
        <Image source={backImage} className="object-cover h-80 w-full" />
      </View>
      <View className="bg-white h-screen rounded-t-3xl">
        <Text className="text-[#d60e45] text-3xl font-semibold text-center py-3 mt-3">
          S'inscrire
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
          <TextInput
            className="tracking-widest bg-gray-100 rounded-lg w-80 text-base py-2 px-1 mx-5 mb-5"
            placeholder="Confirmer mot de passe"
            autoCapitalize="none"
            secureTextEntry={true}
            autoCorrect={false}
            textContentType="password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
        <TouchableOpacity
          onPress={HandleRegister}
          className="bg-[#fac25a] py-2 rounded-md mx-10 mt-10 mb-3"
        >
          <Text className="text-center font-semibold text-white text-lg">
            S'inscrire
          </Text>
        </TouchableOpacity>
        <View className="flex-row space-x-2 justify-center">
          <Text className="font-light tracking-wider">
            Avez vous deja un compte ?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className="font-medium text-[#d60e45]">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;
