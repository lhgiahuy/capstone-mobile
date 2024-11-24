import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { EventDetail } from "@/constants/model/EventDetail";
import { getEvent } from "@/api/event";
import { router } from "expo-router";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatDateTime } from "@/lib/utils/date-time";

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

  if (isLoading) return <ActivityIndicator size="large" />;
  if (error) {
    return <Text>Error fetching events: {error.message}</Text>; // Error handling
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
        <View className="flex-row  justify-between">
          <Text className=" ml-4 text-[#CAFF4C] text-xl font-bold">
            Sự kiện đang diễn ra
          </Text>

          <Pressable
            className="flex-row mr-2"
            onPress={() => router.push("/events/list-event")}
          >
            <Text className="text-[#CAFF4C] text-[17px]">Xem thêm </Text>
            <Ionicons name="arrow-forward" size={23} color={"#CAFF4C"} />
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
              className="h-[220px]"
              key={event.eventId}
              onPress={() => router.push(`/events/${event.eventId}`)}
            >
              <Image
                source={{ uri: event.thumbnailImg }}
                className="h-[140px] w-[224px] rounded-[20px]"
              />

              <View className="h-[60px] w-[224px]">
                <Text
                  className="text-white font-bold mx-2 mt-2"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {/* [ORIENTATION WEEK] Tìm kiếm và ứng dụng vào cuộc sống xã hội
              nhânnnnnnnnnn */}
                  {event.eventName}
                </Text>
                <View className="flex-row mt-2">
                  <Ionicons name="calendar" size={20} color={"#CAFF4C"} />
                  <Text className="text-white ml-2 ">
                    {formatDateTime(event.startTime)}
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
