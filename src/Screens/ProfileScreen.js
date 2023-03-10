import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../ConfigurationFirebase/config";
import { AuthenticatedUserContext } from "../../Context/AuthenticationContext";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(AuthenticatedUserContext);

  const Deconnexion = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigation.navigate("Login");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };
  return (
    <View>
      <TouchableOpacity
        onPress={Deconnexion}
        className="bg-[#fac25a] py-2 rounded-md mx-10 mt-10 mb-3"
      >
        <Text className="text-center font-semibold text-white text-lg">
          Se deconnecter
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
