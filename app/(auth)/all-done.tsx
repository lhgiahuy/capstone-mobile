import { View, Text, ImageBackground } from "react-native";
import React from "react";

export default function Success() {
  return (
    <ImageBackground
      className="flex-1 justify-center items-center h-full"
      source={require("../../assets/images/background-dark.png")}
      resizeMode="cover"
    >
      <View className="justify-center items-center">
        <Text className="text-white text-[60px] font-inter font-bold">
          ALL DONE!
        </Text>
        <Text className="text-white  font-lexend">
          Get started to find your favorite event with us!
        </Text>
      </View>
    </ImageBackground>
  );
}
