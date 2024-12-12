import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  Button,
  // Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Notification } from "@/constants/model/Notification";

import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonReadNoti from "@/components/NotificationEvent/ButtonReadNoti";
import { getNotifications, readNotification } from "@/api/notification";
import ButtonClearAll from "@/components/NotificationEvent/ButtonClearAll";

export default function ListNotifications() {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  // const [showFullDescription, setShowFullDescription] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  // const [expanded, setExpanded] = useState(false);

  const {
    data: notification,
    isLoading,
    error,
    refetch,
  } = useQuery<Notification[]>({
    queryKey: ["notification"],
    queryFn: getNotifications,
  });

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${hours}:${minutes}, ${day}/${month}/${year}`;
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await queryClient.invalidateQueries({
        queryKey: ["user", "StatusNoti"],
      });
      await refetch();
    } finally {
      setRefreshing(false);
    }
  };
  const toggleExpand = (notiId: string) => {
    setExpandedId((prev) => (prev === notiId ? null : notiId));
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
        <Text className="text-white font-lexend text-lg text-center">
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

  const handleNoticationDetail = (eventId: string) => {
    if (!eventId) {
      return;
    } else router.push(`/events/${eventId}`);
  };

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        className="flex-1 bg-primary px-3 mb-2"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ButtonClearAll />
        {notification?.map((notify) => (
          <TouchableOpacity
            className="bg-[#1F1F1F]  w-full  rounded-[20px] justify-center my-2 p-2 border-[1px] "
            key={notify.notiId}
            onPress={() => handleNoticationDetail(notify.eventId)}
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
            <Text className="mx-2 mb-2 font-lexend text-white">
              {expandedId === notify.notiId
                ? notify.message
                : notify.message.slice(0, 120)}
              {notify.message.length > 120 &&
                expandedId !== notify.notiId &&
                "..."}
            </Text>
            {notify.message.length > 120 && (
              <TouchableOpacity
                className="px-3"
                onPress={() => toggleExpand(notify.notiId)}
              >
                <Text className="text-[#CAFF4C] font-lexend">
                  {expandedId === notify.notiId ? "Rút gọn" : "Xem thêm"}
                </Text>
              </TouchableOpacity>
            )}
            <ButtonReadNoti
              notiId={notify.notiId}
              readStatus={notify.readStatus}
              eventId={notify.eventId}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
