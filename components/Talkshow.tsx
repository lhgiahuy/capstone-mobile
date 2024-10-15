import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Talkshow() {
  return (
    <View className="py-2">
      <View className="flex-row  justify-between">
        <Text className=" ml-4 text-[#CAFF4C] text-xl font-bold">Talkshow</Text>
        <View className="flex-row mr-2">
          <Text className="text-[#CAFF4C] text-[17px]">Xem thêm </Text>
          <Ionicons name="arrow-forward" size={23} color={"#CAFF4C"} />
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12, gap: 16 }}
        className="mt-6"
      >
        <View className="h-[220px]">
          <Image
            source={require("../assets/images/voucher.png")}
            className="h-[140px] w-[224px] rounded-[20px]"
          />
          <View className="h-[60px] w-[224px]">
            <Text
              className="text-white "
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              [ORIENTATION WEEK] Tìm kiếm và ứng dụng vào cuộc sống xã hội
              nhânnnnnnnnnn
            </Text>
            <View className="flex-row mt-2">
              <Ionicons name="calendar" size={20} color={"#CAFF4C"} />
              <Text className="text-white ml-2 ">06 Tháng 10, 2024</Text>
            </View>
          </View>
        </View>
        <View className="h-[220px]">
          <Image
            source={require("../assets/images/special1.png")}
            className="h-[140px] w-[224px] rounded-[20px]"
          />
          <View className="h-[60px] w-[224px]">
            <Text
              className="text-white "
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              [ORIENTATION WEEK] Tìm kiếm và ứng dụng vào cuộc sống xã hội
              nhânnnnnnnnnn
            </Text>
            <View className="flex-row mt-2">
              <Ionicons name="calendar" size={20} color={"#CAFF4C"} />
              <Text className="text-white ml-2 ">06 Tháng 10, 2024</Text>
            </View>
          </View>
        </View>
        <View className="h-[220px]">
          <Image
            source={require("../assets/images/banner1.png")}
            className="h-[140px] w-[224px] rounded-[20px]"
          />
          <View className="h-[60px] w-[224px]">
            <Text
              className="text-white "
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              [ORIENTATION WEEK] Tìm kiếm và ứng dụng vào cuộc sống xã hội
              nhânnnnnnnnnn
            </Text>
            <View className="flex-row mt-2">
              <Ionicons name="calendar" size={20} color={"#CAFF4C"} />
              <Text className="text-white ml-2 ">06 Tháng 10, 2024</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
