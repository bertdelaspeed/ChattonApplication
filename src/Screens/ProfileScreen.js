import { View, Text, TouchableOpacity, AlertS, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../../ConfigurationFirebase/config";
import { AuthenticatedUserContext } from "../../Context/AuthenticationContext";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs, query, where } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { setUser, user } = useContext(AuthenticatedUserContext);
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);

  const UserRef = collection(db, "Users");
  const queryResult = query(UserRef, where("email", "==", user.email));

  async function DocFinder(queryResult) {
    const querySnapshot = await getDocs(queryResult);
    querySnapshot.forEach((doc) => {
      if (userEmail === "") {
        const { email, username } = doc.data();
        setUserEmail(email);
        setUsername(username);
      }
    });
  }

  useEffect(() => {
    if (!user) return;
    DocFinder(queryResult);
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };


  const uploadImage = async (image) => {
    try {
      setIsLoading(true)
      const response = await fetch(image)
      const blob = await response.blob()
      const filename = image.substring(image.lastIndexOf('/'))
      const imageRef = ref(storage, `ProfilePictures`)
    } catch (error) {
      Alert.alert('error', error.message)
      setIsLoading(false)
    }
  }

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
      <View className="justify-center items-center my-10">
        <Text className="text-2xl font-medium tracking-widest">
          Bienvenue, <Text className="text-[#d60e45]">{username}</Text>
        </Text>
      </View>

      <TouchableOpacity className=" rounded-md bg-gray-400 items-center justify-center mx-10 mb-10">
        <Ionicons name="camera" size={50} color="white" />
      </TouchableOpacity>

      <View className="items-center">
        <Text className="tracking-widest bg-gray-200 rounded-lg w-80 text-base py-2 px-1 mb-5 text-slate-900 font-light">
          {username}
        </Text>
        <Text className="tracking-widest bg-gray-200 rounded-lg w-80 text-base py-2 px-1 mb-5 text-slate-900 font-light">
          {userEmail}
        </Text>
      </View>

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
