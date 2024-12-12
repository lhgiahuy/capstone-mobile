import { getListBanner } from "@/api/event";
import { Banner } from "@/constants/model/Banner";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import {
  View,
  Image,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

export default function BannerEvent() {
  const { data, isLoading, error } = useQuery<Banner[]>({
    queryKey: ["banner"],
    queryFn: () => getListBanner(),
  });

  if (isLoading) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <ActivityIndicator size="large" color="#CAFF4C" />
        <Text className="text-white mt-2">Đang tải ảnh sự kiện...</Text>
      </SafeAreaView>
    );
  }
  if (error) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <ActivityIndicator size="large" color="#CAFF4C" />
        <Text className="text-white mt-2">Ảnh sự kiện đăng gặp vấn đề...</Text>
      </SafeAreaView>
    );
  }

  return (
    <View className="h-[240px] w-full">
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
        {data?.map((banner) => (
          <TouchableOpacity
            className="flex-1 justify-center items-center"
            key={banner?.eventId}
            onPress={() => router.push(`/events/${banner.eventId}`)}
          >
            <Image
              source={
                banner?.posterImg
                  ? { uri: banner.posterImg }
                  : require("../assets/images/banner1.png")
              }
              className="w-full h-full object-cover rounded-md"
            />
          </TouchableOpacity>
        ))}
      </Swiper>
    </View>
  );
}
