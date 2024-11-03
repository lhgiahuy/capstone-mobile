import { View, Text, TextInput } from "react-native";
import React from "react";

export default function Comment() {
  return (
    <View className="p-2 w-full bg-white h-auto rounded-[18px] mb-2">
      <Text className="text-[17px] font-bold ml-2 mb-2">Bình luận</Text>
      <View>
        <TextInput
          placeholder="Nhập bình luận của bạn..."
          className="border border-gray-300 rounded-lg p-4 text-base "
          multiline
        />
      </View>
    </View>
  );
}
