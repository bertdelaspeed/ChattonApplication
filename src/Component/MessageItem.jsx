import { View, Text } from "react-native";
import React from "react";

const MessageItem = ({ item, sender }) => {
  return (
    <View
      className={`flex-row ${
        item.sender === sender ? "justify-end" : "justify-start"
      } p-[10px]`}
    >
      <View
        className={`${
          item.sender === sender ? "bg-[#dcf8c6]" : "bg-[#fff]"
        } p-[10px] rounded-lg max-w-[80%] mx-[10px]`}
      >
        <Text className="text-gray-500 text-sm">{item.sender}</Text>
        <Text className="text-gray-700 text-base">{item.message}</Text>
      </View>
    </View>
  );
};

export default MessageItem;
