import React from "react";
import { getEvent, getEventsByKeyword } from "@/api/event";
import { EventDetail } from "@/constants/model/EventDetail";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
// import { useState } from "react";

// import { Button } from "react-native";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { formatDateTime } from "@/lib/utils/date-time";

export default function ListEvent() {
  // const pageSize = 3;
  // const [pageNumber, setPageNumber] = useState<number>(1);
  const { status } = useLocalSearchParams();
  const statusValue = status as string | undefined;
  console.log(statusValue);

  const {
    data: events,
    isLoading,
    error,
  } = useQuery<EventDetail, Error>({
    queryKey: ["list-event", status],
    queryFn: () =>
      getEvent({
        Status: statusValue,
        // PageNumber: pageNumber,
        // PageSize: pageSize,
      }),
  });

  const statusText =
    statusValue === "InProgress"
      ? "Sự kiện đang diễn ra"
      : statusValue === "upcoming"
        ? "Sự kiện sắp diễn ra"
        : "Danh sách sự kiện";

  if (isLoading) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <ActivityIndicator size="large" color="#CAFF4C" />
        <Text className="text-white mt-2">Đang tải sự kiện...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return <Text>Error fetching events: {error.message}</Text>;
  }

  // const handleNextPage = () => {
  //   if (events && events.pageNumber < events.totalPages) {
  //     setPageNumber((prev) => prev + 1);
  //   }
  // };

  // const handlePreviousPage = () => {
  //   if (pageNumber > 1) {
  //     setPageNumber((prev) => prev - 1);
  //   }
  // };

  if (!events || !events.items || events.items.length === 0) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <Text className="text-white font-bold text-lg text-center">
          Hiện tại chưa có sự kiện
        </Text>
        <Image
          source={require("../../assets/images/not-found.png")}
          className=" h-[320px] w-full rounded-[16px]"
        />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className="flex-1 bg-primary h-full p-1">
      <ScrollView className="p-1">
        <Text className="text-white text-[18px] font-lexend ml-3 mt-8 mb-3 text-center">
          {statusText}
        </Text>
        {events?.items?.map((event) => (
          <TouchableOpacity
            // className="h-[220px] justify-center my-2 p-2 border-line border-[1px]"
            className="flex-row  h-[260px] bg-gray-950 p-3 rounded-[20px] border-y-1 border-black px-1 my-2"
            key={event?.eventId}
            onPress={() => router.push(`/events/${event?.eventId}`)}
          >
            <Image
              source={{ uri: event.thumbnailImg }}
              className="h-[240px] w-[160px] rounded-[16px]"
            />
            <View className="w-[204px] items-center px-1 ">
              <Text
                className="text-white w-[160px] font-bold font-inter text-[16px] text-center mt-6"
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {event?.eventName}
              </Text>
              <View className="flex-row mt-4">
                <Ionicons name="calendar" size={20} color={"#CAFF4C"} />
                <Text className="text-white ml-2">
                  {formatDateTime(event.startTime)}
                </Text>
              </View>

              {!event.location ? (
                <View className="flex-row mt-4 w-[80%] justify-center items-center p-1">
                  <Ionicons name="link-outline" size={22} color={"#CAFF4C"} />
                  <Text
                    className="text-white font-lexend text-[14px] text-center"
                    numberOfLines={3}
                    ellipsizeMode="tail"
                  >
                    Link tham gia: {event.linkEvent}
                  </Text>
                </View>
              ) : (
                <View className="flex-row mt-4 w-[80%] justify-center items-center">
                  <Ionicons
                    name="location-outline"
                    size={22}
                    color={"#CAFF4C"}
                  />
                  <Text
                    className="text-white font-lexend text-[14px] text-center"
                    numberOfLines={3}
                    ellipsizeMode="tail"
                  >
                    {event.location}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
