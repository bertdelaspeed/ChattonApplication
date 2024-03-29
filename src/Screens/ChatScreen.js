import { View, Text } from "react-native";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
const userAvatar = require("../../assets/man.png");
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthenticatedUserContext } from "../../Context/AuthenticationContext";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { chatRef, db } from "../../ConfigurationFirebase/config";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import MessageItem from "../Component/MessageItem";
import axios from "axios";

const ChatScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { friendName, friendAvatar, friendEmail } = route.params;
  const { user } = useContext(AuthenticatedUserContext);
  const sender = user.email.split("@")[0];
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const flatListRef = useRef(null);

  const queryResult = query(
    chatRef,
    where("chatters", "==", `${sender}xx${friendName}`)
  );
  const queryResult2 = query(
    chatRef,
    where("chatters", "==", `${friendName}xx${sender}`)
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View className="flex-row items-center space-x-2">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={30} color="orange" />
          </TouchableOpacity>
          {friendAvatar === undefined ? (
            <Image source={userAvatar} className="h-12 w-12 rounded-full" />
          ) : (
            <Image
              source={{ uri: friendAvatar }}
              className="h-12 w-12 rounded-full"
            />
          )}
          <Text className="text-lg tracking-widest text-gray-500">
            {friendName}
          </Text>
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      const querySnapshot = await getDocs(queryResult);
      const querySnapshot2 = await getDocs(queryResult2);

      if (!querySnapshot.empty || !querySnapshot2.empty) {
        let messages = querySnapshot.docs.map((doc) => doc.data().conversation);
        messages = messages.concat(
          querySnapshot2.docs.map((doc) => doc.data().conversation)
        );
        messages = messages.sort(
          (a, b) => a.timestamp?.seconds - b.timestamp?.seconds
        );

        setAllMessages(messages);
      }
    };

    const unsub1 = onSnapshot(queryResult, (snapshot) => {
      const messages = snapshot.docs.map((doc) => doc.data().conversation);
      setAllMessages(messages);
    });
    const unsub2 = onSnapshot(queryResult2, (snapshot) => {
      const messages = snapshot.docs.map((doc) => doc.data().conversation);
      setAllMessages(messages);
    });

    fetchMessages();
    return () => {
      unsub1();
      unsub2();
    };
  }, []);

  const HandleSubmit = async () => {
    const querySnapshot = await getDocs(queryResult);
    const querySnapshot2 = await getDocs(queryResult2);

    if (!querySnapshot.empty || !querySnapshot2.empty) {
      // console.log("chat existant");
      querySnapshot.forEach((document) => {
        updateDoc(doc(db, "Chats", document.id), {
          conversation: [
            ...document.data().conversation,
            {
              message: message,
              timestamp: Timestamp.now(),
              sender: sender,
            },
          ],
        });
      });

      querySnapshot2.forEach((document) => {
        updateDoc(doc(db, "Chats", document.id), {
          conversation: [
            ...document.data().conversation,
            {
              message: message,
              timestamp: Timestamp.now(),
              sender: sender,
            },
          ],
        });
      });
    } else {
      await addDoc(chatRef, {
        chatters: `${sender}xx${friendName}`,
        conversation: [
          {
            message: message,
            timestamp: Timestamp.now(),
            sender: sender,
          },
        ],
      });
    }

    async function RetryRequest(maxRetries = 3) {
      let retries = 0;
      while (retries < maxRetries) {
        try {
          const response = await axios.post(
            `https://app.nativenotify.com/api/indie/notification`,
            {
              subID: `${friendEmail}`,
              appId: 6887,
              appToken: "mcb8UbHtYmKsvGClKWjJHY",
              title: `${sender} - Chat-ON`,
              message: `${message}`,
            }
          );
          // console.log("Notification effectué avec succès");
          return response;
        } catch (error) {
          // console.log("request failed, retrying ...");
          retries++;
        }
      }
    }

    RetryRequest();
    setMessage("");
  };

  return (
    <View className="flex-1">
      {allMessages[0] !== undefined && (
        <View className="flex-1">
          <KeyboardAwareFlatList
            ref={flatListRef}
            onContentSizeChange={() =>
              flatListRef?.current?.scrollToEnd({ animated: true })
            }
            data={allMessages[0]}
            initialNumTorRender={10}
            keyExtractor={(item) => item.timestamp}
            renderItem={({ item }) => (
              <MessageItem item={item} sender={sender} />
            )}
          />
        </View>
      )}
      <View className="flex-row">
        <TextInput
          className="tracking-widest bg-white rounded-lg w-[80%] text-base py-2 px-1 mx-3 mb-5"
          placeholder="ecrire message ici ..."
          multiline={true}
          keyboardType="default"
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity onPress={HandleSubmit}>
          <MaterialCommunityIcons name="send-circle" size={40} color="orange" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
