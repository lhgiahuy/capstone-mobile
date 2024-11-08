import React from "react";
import { getEventsByKeyword } from "@/api/event";
import { EventDetail } from "@/constants/model/EventDetail";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

// import { Button } from "react-native";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

export default function ListEvent() {
  const keyword = "A";
  const pageSize = 3;
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { data, isLoading, error } = useQuery<EventDetail, Error>({
    queryKey: ["events", keyword, pageNumber, pageSize],
    queryFn: () => getEventsByKeyword(keyword, pageNumber as number, pageSize),
  });

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);

    const hours = date.getHours();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${hours}:00 | ${day}/${month}/${year}`;
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
    return <Text>Error fetching events: {error.message}</Text>;
  }

  const handleNextPage = () => {
    if (data && data.pageNumber < data.totalPages) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  if (!data || !data.items || data.items.length === 0) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <Text className="text-white font-bold text-lg text-center">
          Không tìm thấy sự kiện mà bạn đang tìm kiếm
        </Text>
        <Image
          source={require("../../assets/images/not-found.png")}
          className=" h-[320px] w-full rounded-[16px]"
        />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className="flex-1 bg-primary h-full">
      <ScrollView>
        {data?.items?.map((event) => (
          <TouchableOpacity
            // className="h-[220px] justify-center my-2 p-2 border-line border-[1px]"
            className="flex-row w-full h-[260px] bg-gray-950 p-2 rounded-[20px] border-y-1 border-black"
            key={event?.eventId}
            onPress={() => router.push(`/events/${event?.eventId}`)}
          >
            <Image
              source={{ uri: event.posterImg }}
              className="h-[240px] w-[160px] rounded-[16px]"
            />
            <View className="mt-6 h-[60px] w-[204px]  items-center ">
              <Text
                className="text-white w-[160px] font-bold text-[18px] text-center"
                numberOfLines={2}
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

              <Text
                className="text-white h-[60px] mt-4 text-[14px] mx-2 overflow-hidden text-ellipsis whitespace-nowrap"
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                FPT University HCM đang nóng lên từng ngày trước thềm Lễ Tôn
                Vinh Top 100 Sinh Viên Xuất Sắc
              </Text>
              {/* <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
              >
                <View className="flex-row mt-2">
                  {event.eventTags.map((tag, index) => (
                    <Text
                      key={index}
                      className="text-white text-[14px] bg-[#797777d6] mx-1 px-2 rounded"
                    >
                      {tag}
                    </Text>
                  ))}
                </View>
              </ScrollView> */}

              <View className="flex-row justify-center items-center mt-2">
                <Text className="text-[#CAFF4C] font-bold text-[16px] ">
                  Xem chi tiết
                </Text>
                <Ionicons
                  name="chevron-forward-outline"
                  color={"#CAFF4C"}
                  size={20}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View className="flex-row justify-between p-4">
          <Text className="text-white font-bold text-[16px]">
            Trang {data.pageNumber || 1} / {data.totalPages || 1}
          </Text>
          <View className="flex-row ">
            <Ionicons
              name="chevron-back-outline"
              size={22}
              color={"#CAFF4C"}
              onPress={handlePreviousPage}
              disabled={pageNumber === 1}
            />
            <Ionicons
              name="chevron-forward-outline"
              size={22}
              color={"#CAFF4C"}
              onPress={handleNextPage}
              disabled={data?.pageNumber === data?.totalPages}
              style={{ marginLeft: 16 }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
