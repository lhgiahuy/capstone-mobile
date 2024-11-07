import { View, Text, ImageBackground } from "react-native";
import React from "react";

export default function Success() {
  return (
    <ImageBackground
      className="flex-1 justify-center items-center h-full"
      source={require("../../assets/images/background-dark.png")}
      resizeMode="cover"
    >
      <View>
        <Text className="text-white text-[60px] font-premanent">ALL DONE!</Text>
        <Text className="text-white  font-premanent">
          Get started to find your favorite event with us!
        </Text>
      </View>
    </ImageBackground>
  );
}
