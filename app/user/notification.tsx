import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  // Pressable,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Notification } from "@/constants/model/Notification";
import { getNotifications } from "@/api/user";

export default function Notify() {
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
    <ScrollView className="flex-1 bg-[#d8f3f3] opacity-70">
      {notification?.map((notify) => (
        <View
          className="bg-white h-[140px] w-full  rounded-[20px] justify-center mt-2 p-2 border-[1px] "
          key={notify.notiId}
        >
          <View className="mt-2 mx-2 flex-row w-[320px]  items-center ">
            <View className="flex-row items-center w-[60%] bg-green-50 rounded-lg">
              <Ionicons
                name="notifications-circle-outline"
                size={20}
                color={"#255740"}
              />
              <Text className="font-bold text-[18px] ml-2">
                Sắp có event mới !
              </Text>
            </View>
            <Text className="w-[40%] ">{formatDateTime(notify.sendTime)}</Text>
          </View>

          <Text className="mx-2 mb-2 w-[320px] h-[60px] p-2 ">
            {notify.message}
          </Text>

          <TouchableOpacity className="  py-2 rounded-md items-center w-auto flex-row ml-6 ">
            <Ionicons name="checkmark-outline" size={18} color={"#22d334d2"} />
            <Text className="ml-1 text-green-500 font-bold  ">
              Đánh giấu đã xem
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity className=" px-4 py-2 rounded-md items-center w-[100px] ml-4">
              <Text className="text-black font-bold">Coi chi tiết</Text>
            </TouchableOpacity> */}
        </View>
      ))}
    </ScrollView>
  );
}
