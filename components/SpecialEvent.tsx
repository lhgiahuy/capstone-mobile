import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";

export default function SpecialEvent() {
  return (
    <View className="py-2">
      <Text className=" ml-4 text-[#CAFF4C] text-xl font-bold">
        Sự kiện đặc biệt
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
        className="mt-6"
      >
        <Image
          source={require("../assets/images/special1.png")}
          className="h-[320px] w-[208px]  rounded-[16px]"
        />
        <Image
          source={require("../assets/images/special2.png")}
          className="h-[320px] w-[208px] rounded-[16px]"
        />
        <Image
          source={require("../assets/images/banner1.png")}
          className="h-[320px] w-[208px]  rounded-[16px]"
        />
      </ScrollView>
    </View>
  );
}
