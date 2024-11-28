import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { EventDetail } from "@/constants/model/EventDetail";
import { getEvent } from "@/api/event";
import { router } from "expo-router";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatDate, formatDateTime } from "@/lib/utils/date-time";

export default function CurrentEvent() {
  const status = "InProgress";
  const {
    data: events,
    isLoading,
    error,
  } = useQuery<EventDetail, Error>({
    queryKey: ["events", status],
    queryFn: () => getEvent({ Status: status }),
  });

  const NavListEvent = (status: string) => {
    if (!status) {
      Alert.alert("Thông báo", "Không tìm thấy thông tin tổ chức.");
    } else {
      router.push({
        pathname: "/events/list-event",
        params: { status: status },
      });
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <ActivityIndicator size="large" color="#CAFF4C" />
        <Text className="text-white mt-2">Đang tải sự kiện...</Text>
      </SafeAreaView>
    );
  }
  if (error) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <ActivityIndicator size="large" color="#CAFF4C" />
        <Text className="text-white mt-2">Sự kiện không tải lên được...</Text>
      </SafeAreaView>
    );
  }

  if (!events || !events.items || events.items.length === 0) {
    return (
      <SafeAreaView className=" justify-center">
        <Text className="ml-4 text-[#CAFF4C] text-xl font-bold">
          Sự kiện đang diễn ra
        </Text>
        <Text className="text-white text-[16px] font-lexend text-center mt-2">
          Chưa có sự kiện đang diễn ra trong hôm nay
        </Text>
        <Image
          source={require("../assets/images/Coming Soon.png")}
          className=" h-[300px] w-full rounded-[16px] mx-2 items-center"
        />
      </SafeAreaView>
    );
  }
  return (
    <>
      <View className="py-2">
        <View className="flex-row  justify-between items-center">
          <Text className=" ml-4 text-[#CAFF4C] text-xl font-bold">
            Sự kiện đang diễn ra
          </Text>

          <Pressable
            className="flex-row mr-2"
            onPress={() => NavListEvent(status)}
          >
            <Text className="text-[#CAFF4C] text-[14px] font-lexend">
              Xem thêm{" "}
            </Text>
            <Ionicons
              name="chevron-forward-outline"
              size={23}
              color={"#CAFF4C"}
            />
          </Pressable>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12, gap: 16 }}
          className="mt-6"
        >
          {events?.items?.map((event) => (
            <TouchableOpacity
              className="px-1 h-[220px]"
              key={event.eventId}
              onPress={() => router.push(`/events/${event.eventId}`)}
            >
              <Image
                source={{ uri: event.thumbnailImg }}
                className="h-[140px] w-[230px] rounded-[20px]"
              />

              <View className="h-[60px] w-[230px] mt-2 px-1">
                <Text
                  className="text-white font-bold mt-2 h-[36px]"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {event.eventName}
                </Text>
                <View className="flex-row mt-1">
                  <Ionicons name="calendar" size={20} color={"#CAFF4C"} />
                  <Text className="text-white ml-2 font-lexend">
                    {formatDate(event.startTime)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
}
