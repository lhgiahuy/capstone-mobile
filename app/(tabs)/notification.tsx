import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  // Pressable,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Notification } from "@/constants/model/Notification";
import { getNotifications } from "@/api/user";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ListNotifications() {
  const {
    data: notification,
    isLoading,
    error,
  } = useQuery<Notification[]>({
    queryKey: ["notification"],
    queryFn: getNotifications,
  });

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);

    const hours = date.getHours();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${hours}:00 , ${day}/${month}/${year}`;
  };

  if (isLoading) {
    return (
      <View className="bg-primary justify-center flex-1">
        <Text className="font-bold text-[18px] items-center">Loading...</Text>
      </View>
    );
  }

  if (!notification || notification.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-primary justify-center items-center">
        <Text className="text-white font-bold text-lg text-center">
          Hiện tại chưa có thông báo
        </Text>
        <Image
          source={require("../../assets/images/not-found.png")}
          className=" h-[320px] w-full rounded-[16px]"
        />
      </SafeAreaView>
    );
  }
  if (error) {
    return (
      <View className="flex-1 bg-primary justify-center">
        <Text className="text-white font-bold items-center text-center">
          Dữ liệu đang chạy xin vui lòng chờ trong giây lát
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-primary p-3">
      {notification?.map((notify) => (
        <View
          className="bg-[#1F1F1F]  w-full  rounded-[20px] justify-center mt-2 p-2 border-[1px]  "
          key={notify.notiId}
        >
          <View className="mt-2 mx-2 flex-row items-center  ">
            <View className="flex-row items-center w-[60%]   ">
              <Ionicons
                name="notifications-circle-outline"
                size={20}
                color={"#CAFF4C"}
              />
              <Text className="font-bold font-inter text-[18px] ml-2 text-[#CAFF4C]">
                Sắp có event mới !
              </Text>
            </View>
          </View>
          <Text className=" font-lexend p-2 text-white">
            {formatDateTime(notify.sendTime)}
          </Text>
          <Text className="mx-2 mb-2  font-lexend text-white">
            {notify.message}
          </Text>

          <TouchableOpacity className="   rounded-md items-center w-auto flex-row ml-6 ">
            <Ionicons name="checkmark-outline" size={18} color={"#22d334d2"} />
            <Text className="ml-1 text-green-500 font-bold font-lexend mb-2">
              Đánh giấu đã xem
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity className=" py-2 rounded-md items-center w-[100px] ml-4">
            <Text className="text-black font-bold">Coi chi tiết</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            onPress={() => {
              router.push("/notification/test");
            }}
          >
            <Text className="">Aloi</Text>
          </TouchableOpacity> */}
        </View>
      ))}
    </ScrollView>
  );
}
