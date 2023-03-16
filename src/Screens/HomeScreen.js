import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

const userAvatar = require("../../assets/man.png");

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image source={userAvatar} className="h-12 w-12" />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View className="flex flex-row-reverse absolute bottom-14 right-5">
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Search")}
          className="bg-orange-500 h-16 w-16 rounded-full items-center justify-center"
        >
          <Entypo name="chat" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
