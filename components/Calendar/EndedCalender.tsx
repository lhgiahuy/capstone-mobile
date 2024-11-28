import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { EventData } from "@/constants/model/EventDetail";
import { getUserParticipant } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { formatDateTime, getDay, getMonth } from "@/lib/utils/date-time";

export default function EndedCalender() {
  const { data, isLoading, error } = useQuery<EventData[], Error>({
    queryKey: ["events", "calendar", "completed"],
    queryFn: () => getUserParticipant(true),
  });

  if (isLoading) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <ActivityIndicator size="large" color="#CAFF4C" />
        <Text className="text-white mt-2">Đang tải sự kiện...</Text>
      </SafeAreaView>
    );
  }
  if (error) return <Text>Error loading event details</Text>;

  if (!data || data.length === 0) {
    return (
      <SafeAreaView className="bg-primary justify-center items-center">
        <Text className="text-white font-bold text-lg text-center">
          Chưa có sự kiện đăng ký
        </Text>
        <Image
          source={require("../../assets/images/not-found.png")}
          className=" h-[320px] w-full rounded-[16px]"
        />
      </SafeAreaView>
    );
  }
  const NavReview = (eventId: string) => {
    if (!eventId) {
      Toast.show({
        type: "error",
        text1: "Không tìm thấy dữ liệu về sự kiện này",

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
    <ScrollView className="bg-primary flex-1 mx-2 p-1">
      <Text className="text-[#CAFF4C] text-[19px] font-inter font-bold mt-7 ">
        Đã kết thúc
      </Text>
      {data?.map((event) => (
        <TouchableOpacity
          className="flex-row  h-[160px] my-2"
          key={event.eventId}
          onPress={() => router.push(`/events/${event.eventId}`)}
        >
          <View className="bg-[#373737] w-[30%] h-full first-letter:text-center items-center justify-center rounded-l-[12px] rounded-r-[22px] ">
            <Text className=" w-[120px] font-lexend text-[26px] p-2 text-center text-[#CAFF4C]">
              {getDay(event.startTime)}
            </Text>
            <Text className="w-[120px] font-lexend text-[17px] text-center">
              {getMonth(event.startTime)}
            </Text>
          </View>
          <View
            className="border-t border-[#373737] my-4"
            style={{ borderStyle: "dashed", borderWidth: 1 }}
          />
          <View className="bg-[#373737] w-[70%] p-4 justify-center rounded-l-[20px] rounded-r-[12px] ">
            <Text
              className="text-[#CAFF4C] font-bold font-inter w-[200px] text-center text-[14px]"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {event.eventName}
            </Text>
            <View className="flex-row mt-4 ">
              <Ionicons name="calendar" size={20} color={"#CAFF4C"} />
              <Text className="text-white ml-2 font-lexend text-[12px] ">
                {formatDateTime(event.startTime)}
              </Text>
            </View>

            <View className="flex-row mt-2">
              <Ionicons name="location-outline" size={20} color={"#CAFF4C"} />
              <Text className="text-white ml-2 font-lexend  text-[12px]">
                {event.location}
              </Text>
            </View>

            <TouchableOpacity
              className="rounded-[24px] p-1 mt-3 mb-2 flex-row justify-center items-center"
              onPress={() => NavReview(event.eventId)}
            >
              <Ionicons
                name="arrow-forward-outline"
                size={20}
                color={"#CAFF4C"}
              />
              <Text className="font-lexend text-center text-[16px] text-[#CAFF4C] ml-2">
                {event.canReview ? "Xem đánh giá" : "Đánh giá sự kiện"}
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
