import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavOrganizerProps } from "@/constants/model/Organizer";
import { EventData } from "@/constants/model/EventDetail";
import { useQuery } from "@tanstack/react-query";
import { getEventOfOrganizer } from "@/api/organizer";
import { SafeAreaView } from "react-native-safe-area-context";
import HTMLView from "react-native-htmlview";
import { router } from "expo-router";

export default function Ended({ organizerId }: NavOrganizerProps) {
  const status = "Completed";
  const { data, isLoading, error } = useQuery<EventData[], Error>({
    queryKey: ["event-organizer", organizerId, status],
    queryFn: () => getEventOfOrganizer(organizerId as string, status),
  });
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
        <Text className="text-white mt-2">Đang tải sự kiện...</Text>
      </SafeAreaView>
    );
  }

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);

    const hours = date.getHours();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${hours}:00 , ${day}/${month}/${year}`;
  };
  if (!data || data.length === 0) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <Text className="text-white font-bold text-lg text-center">
          Chưa có sự kiện
        </Text>
        <Image
          source={require("../../assets/images/not-found.png")}
          className=" h-[320px] w-full rounded-[16px]"
        />
      </SafeAreaView>
    );
  }

  return (
    <ScrollView className="mt-2 mb-4 mx-1">
      {data?.map((event) => (
        <View
          className="flex-row w-full h-[260px] bg-gray-900 p-2 rounded-[28px] my-2 "
          key={event?.eventId}
        >
          <Image
            source={{ uri: event.thumbnailImg }}
            // source={require("../../assets/images/fcode.png")}
            className="h-[240px] w-[160px] rounded-[16px] items-center"
          />
          <View className="h-auto  items-center  p-2 mr-1 ">
            <Text
              className="text-white w-[160px] font-bold text-[16px] text-center"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {event.eventName}
            </Text>
            <View className="flex-row mt-4">
              <Ionicons name="calendar" size={20} color={"#CAFF4C"} />
              <Text className="text-white font-lexend ml-1 ">
                {formatDateTime(event.startTime)}
              </Text>
            </View>
            <View className="flex-row mt-4  h-">
              <Ionicons name="location-outline" size={20} color={"#CAFF4C"} />
              <Text
                className="text-white font-lexend ml-2 w-[120px] "
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {event.location}
              </Text>
            </View>

            <View className="  items-center justify-center w-[178px] px-2">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
              >
                {event.eventTags.map((tag, index) => (
                  <Text
                    key={index}
                    className="text-[#797777d6] text-[14px] font-lexend  px-2 rounded-[20px] mt-3"
                  >
                    {tag}
                  </Text>
                ))}
              </ScrollView>
            </View>

            <TouchableOpacity
              className="flex-row justify-center items-center mt-2"
              onPress={() => router.push(`/events/${event.eventId}`)}
            >
              <Text className="text-[#CAFF4C] font-bold font-lexend text-[16px] ">
                Xem chi tiết
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                color={"#CAFF4C"}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
