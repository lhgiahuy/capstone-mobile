import React from "react";
import { View, Image } from "react-native";
import Swiper from "react-native-swiper";

export default function Banner() {
  return (
    <View className="h-[200px] w-full">
      <Swiper
        showsButtons={false}
        dot={
          <View className="bg-gray-400 opacity-40 w-2.5 h-2.5 rounded-full m-1" />
        }
        activeDot={<View className="bg-[#CAFF4C] w-3 h-3 rounded-full m-1" />}
        autoplay={true}
        autoplayTimeout={3}
        paginationStyle={{ bottom: -20 }}
      >
        <View className="flex-1 justify-center items-center">
          <Image
            source={require("../assets/images/banner1.png")}
            className="w-full h-full object-cover rounded-md"
          />
        </View>
        <View className="flex-1 justify-center items-center">
          <Image
            source={require("../assets/images/event.png")}
            className="w-full h-full object-cover rounded-md"
          />
        </View>
        <View className="flex-1 justify-center items-center">
          <Image
            source={require("../assets/images/banner1.png")}
            className="w-full h-full object-cover rounded-md"
          />
        </View>
      </Swiper>
    </View>
  );
}
