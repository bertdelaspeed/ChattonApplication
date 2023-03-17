import { View, Text } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Alert } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../ConfigurationFirebase/config";
import { ActivityIndicator } from "react-native";
import { FlatList } from "react-native";
import { Image } from "react-native";
const userAvatar = require("../../assets/man.png");
const ecureuil = require("../../assets/squirrel-no-bg.png");
import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const navigation = useNavigation();

  const [searchFriend, setSearchFriend] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [found, setFound] = useState(false);
  const [searchedFriendName, setSearchedFriendName] = useState([]);

  const HandleSearch = async () => {
    if (searchFriend === "") {
      setSearchedFriendName([]);
      Alert.alert("Veuillez entrer un nom d'utilisateur ");
    } else {
      setIsLoading(true);
      const UserRef = collection(db, "Users");
      const queryResult = query(
        UserRef,
        where("username", ">=", searchFriend.trim()),
        where("username", "<=", searchFriend.trim(), "\uf8ff")
      );

      const querySnapshot = await getDocs(queryResult);

      if (!querySnapshot.empty) {
        let friends = [];
        querySnapshot.forEach((document) => {
          const { profilePic, username } = document.data();
          friends.push({ profilePic, username });
        });
        setSearchedFriendName(friends);
        setFound(true);
      } else {
        setFound(false);
      }
      setIsLoading(false);
    }
  };
  return (
    <View className="bg-gray-200 flex-1">
      <View className="flex-row items-center my-3 mx-3 mb-5">
        <TextInput
          onSubmitEditing={HandleSearch}
          className="tracking-widest bg-gray-100 rounded-lg  text-base py-2 px-1 mx-2 w-[85%]"
          placeholder="Rechercher un utilisateur"
          autoCapitalize="none"
          keyboardType="default"
          autoFocus={true}
          value={searchFriend}
          onChangeText={(text) => setSearchFriend(text)}
          textContentType="name"
        />
        <TouchableOpacity
          onPress={HandleSearch}
          className="bg-orange-500 w-10 h-11 rounded-lg items-center justify-center"
        >
          <SimpleLineIcons name="magnifier" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="gray" />
      ) : found ? (
        <View className="mx-6">
          <FlatList
            data={searchedFriendName}
            // showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.username}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Chat", {
                    friendName: item.username,
                    friendAvatar: item.profilePic,
                  })
                }
              >
                <View className="flex-row items-center space-x-4 bg-gray-100 px-2 py-2 rounded-lg">
                  {item.profilePic !== undefined ? (
                    <Image
                      source={{ uri: item.profilePic }}
                      className="h-12 w-12 rounded-full"
                    />
                  ) : (
                    <Image
                      source={userAvatar}
                      className="h-12 w-12 rounded-full"
                    />
                  )}
                  <Text className="text-lg tracking-widest text-gray-500">
                    {item.username}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View className="mx-5 items-center">
          <Image source={ecureuil} className="h-auto w-auto mb-3" />
          <Text className="text-2xl font-bold text-gray-500">
            Aucun utilisateur trouvé
          </Text>
        </View>
      )}
    </View>
  );
};

export default SearchScreen;
