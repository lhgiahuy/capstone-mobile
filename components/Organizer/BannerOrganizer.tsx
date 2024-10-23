import { View, Text, Image, ImageBackground } from "react-native";
import React from "react";
// import { LinearGradient } from "expo-linear-gradient";

export default function BannerOrganizer() {
  return (
    <View className="bg-white h-[330px] w-[342px] mt-4 mx-2 rounded-[30px] items-center">
      <Image
        source={require("../../assets/images/banner2.png")}
        className="h-[240px] w-[342px] rounded-[26px] "
      />

      <View className="flex-row">
        <View className="bg-gray-100 translate-y-[-60px] p-2  ml-2 rounded-[70px] justify-center items-center">
          <Image
            source={require("@/assets/images/logo2.png")}
            className="h-[120px] w-[120px] rounded-[60px] "
          />
        </View>

        <Text className="text-[#228B22] w-[180px] ml-2 text-[16px] my-4 font-bold mx-2">
          Phòng CTSV FPT University Campus HCM
        </Text>
      </View>
    </View>
  );
}
