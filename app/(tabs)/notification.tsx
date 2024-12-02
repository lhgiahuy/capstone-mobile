import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  // Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Notification } from "@/constants/model/Notification";

import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonReadNoti from "@/components/NotificationEvent/ButtonReadNoti";
import { getNotifications } from "@/api/notification";

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
    <View className="flex-1 bg-primary">
      <ScrollView className="flex-1 bg-primary px-3 mb-2">
        {notification?.map((notify) => (
          <TouchableOpacity
            className="bg-[#1F1F1F]  w-full  rounded-[20px] justify-center my-2 p-2 border-[1px] "
            key={notify.notiId}
            onPress={() => router.push(`/events/${notify?.eventId}`)}
          >
            <View className="mt-2 mx-2 flex-row items-center  ">
              <View className="flex-row items-center    ">
                <Ionicons
                  name="notifications-circle-outline"
                  size={20}
                  color={"#CAFF4C"}
                />
                <Text className="font-bold font-inter text-[18px] ml-2 text-[#CAFF4C]">
                  {notify.title}
                </Text>
              </View>
            </View>
            <Text className=" font-lexend p-2 text-white">
              {formatDateTime(notify.sendTime)}
            </Text>
            <Text className="mx-2 mb-2  font-lexend text-white">
              {notify.message}
            </Text>

            <ButtonReadNoti
              notiId={notify.notiId}
              readStatus={notify.readStatus}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
