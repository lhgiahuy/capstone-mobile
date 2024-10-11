import { View, Text, Image } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";

export default function SpecialEvent() {
  return (
    <View>
      <Text className=" ml-4 text-[#CAFF4C] text-xl font-bold">
        Sự kiện đặc biệt
      </Text>
      <View>
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
          <Image
            source={require("../assets/images/light-event.jpg")}
            className="h-64"
          />
          <Image
            source={require("../assets/images/light-event.jpg")}
            className="h-64"
          />
        </Swiper>
      </View>
    </View>
  );
}
