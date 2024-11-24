import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { EventData } from "@/constants/model/EventDetail";
import { getUserParticipant } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

export default function EndedCalender() {
  const { data, isLoading, error } = useQuery<EventData[], Error>({
    queryKey: ["events"],
    queryFn: () => getUserParticipant(true),
    // refetchOnWindowFocus: true,
    // refetchOnMount: true,
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
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <ActivityIndicator size="large" color="#CAFF4C" />
        <Text className="text-white mt-2">Đang tải sự kiện...</Text>
      </SafeAreaView>
    );
  }
  if (error) return <Text>Error loading event details</Text>;

  if (!data) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Event Not Found
        </Text>
        <Text>This event does not exist or has been removed.</Text>
      </View>
    );
  }
  const NavReview = (eventId: string) => {
    if (!eventId) {
      Toast.show({
        type: "error",
        text1: "Không tìm tháya dữ liệu về sự kiên này",

        text1Style: {
          fontSize: 16,
          fontWeight: "bold",
        },
      });
    } else {
      router.push({
        pathname: "/events/review",
        params: { eventId: eventId },
      });
    }
  };
  return (
    <ScrollView className="bg-primary flex-1 mx-2 ">
      <Text className="text-[#CAFF4C] text-[19px] font-inter font-bold mt-7 ">
        Sự kiện bạn đã tham gia
      </Text>
      {data?.map((event) => (
        <TouchableOpacity
          className="flex-row  h-[200px] my-2"
          key={event.eventId}
          onPress={() => router.push(`/events/${event.eventId}`)}
        >
          <View className="bg-[#373737] w-[30%] h-full first-letter:text-center items-center justify-center rounded-l-[12px] rounded-r-[22px] ">
            <Text className="text-white w-[120px] font-lexend text-[17px] p-2 text-center">
              {formatDateTime(event.startTime)}
            </Text>
          </View>
          <View
            className="border-t border-[#373737] my-4"
            style={{ borderStyle: "dashed", borderWidth: 1 }}
          />
          <View className="bg-[#373737] w-[70%] p-4 justify-center rounded-l-[20px] rounded-r-[12px] ">
            <Text
              className="text-[#CAFF4C] font-bold font-inter w-[200px] text-center text-[16px]"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {event.eventName}
            </Text>
            <View className="flex-row mt-4 ">
              <Ionicons name="calendar" size={20} color={"#CAFF4C"} />
              <Text className="text-white ml-2 font-lexend  ">
                {formatDateTime(event.startTime)}
              </Text>
            </View>

            <View className="flex-row mt-2">
              <Ionicons name="location-outline" size={20} color={"#CAFF4C"} />
              <Text className="text-white ml-2 font-lexend  ">
                {event.location}
              </Text>
            </View>
            <View className="flex-row mt-2">
              <Ionicons
                name="person-circle-outline"
                size={20}
                color={"#CAFF4C"}
              />
              <Text className="text-white ml-2 font-lexend  ">
                {event.organizerName}
              </Text>
            </View>
            <TouchableOpacity
              className="rounded-[24px] p-1 mt-4 mb-2 flex-row justify-center items-center"
              onPress={() => NavReview(event.eventId)}
            >
              <Ionicons
                name="arrow-forward-outline"
                size={20}
                color={"#CAFF4C"}
              />
              <Text className="font-lexend text-center text-[18px] text-[#CAFF4C] ml-2">
                Chia sẻ trải nghiệm
              </Text>
            </TouchableOpacity>
            {/* <View className="flex-row mt-4 justify-center ">
              {event.eventTags.map((tag, index) => (
                <Text
                  key={index}
                  className="text-white text-[14px] bg-[#797777d6] mx-1 px-2 rounded"
                >
                  {tag}
                </Text>
              ))}
            </View> */}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
