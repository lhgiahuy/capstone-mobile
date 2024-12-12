// import { useEffect } from "react";

import { getEvent, getEventsByKeyword } from "@/api/event";
import DateTime from "@/components/Search/DateTime";
import { EventDetail } from "@/constants/model/EventDetail";
import { formatDateTime } from "@/lib/utils/date-time";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

import { Button } from "react-native";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

export default function Result() {
  const { keyword } = useLocalSearchParams();
  console.log(keyword);

  const { tagName } = useLocalSearchParams();
  console.log(tagName);

  const pageSize = 3;
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const { data, isLoading, error } = useQuery<EventDetail, Error>({
    queryKey: [
      "events",
      keyword,
      tagName,
      selectedMonth,
      selectedYear,
      pageNumber,
      pageSize,
    ],
    queryFn: () =>
      getEvent({
        SearchKeyword: keyword as string,
        eventTag: tagName as string,
        inMonth: selectedMonth as number,
        inYear: selectedYear as number,
        PageNumber: pageNumber,
        PageSize: pageSize,
      }),
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
    <SafeAreaView className="flex-1 bg-primary h-full p-3">
      <ScrollView>
        <Text className="text-white font-lexend text-[18px] mt-3 ml-4">
          Danh sách sự kiện : {keyword || tagName}
        </Text>
        <DateTime
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={setSelectedMonth}
          onYearChange={setSelectedYear}
        />
        {data?.items?.map((event) => (
          <View
            className="flex-row w-full h-[260px] bg-[#171717] p-1 rounded-[20px] border-y-1 border-black mt-3 "
            key={event?.eventId}
          >
            <View className="relative w-[48%] h-[100%]">
              <Image
                source={{ uri: event.thumbnailImg }}
                className="h-[100%] rounded-[16px]"
              />
              <View
                className={`absolute top-2 right-1 px-2 py-1 rounded-md ${
                  event.status === "Upcoming"
                    ? "bg-blue-500"
                    : event.status === "InProgress"
                      ? "bg-[#CAFF4C]"
                      : event.status === "Completed"
                        ? "bg-orange-500"
                        : "bg-gray-500"
                }`}
              >
                <Text className="text-black font-lexend text-[12px]">
                  {event.status === "Upcoming"
                    ? "Sắp diễn ra"
                    : event.status === "InProgress"
                      ? "Đang diễn ra"
                      : event.status === "Completed"
                        ? "Đã kết thúc"
                        : ""}
                </Text>
              </View>
            </View>
            <View className="p-3  w-[52%] h-[100%]  ">
              <Text
                className="text-white w-[100%] font-bold text-[17px]  px-1"
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {event?.eventName}
              </Text>
              <View className="flex-row mt-6 h-[10%] ">
                <Ionicons name="calendar" size={20} color={"#CAFF4C"} />
                <Text className="text-white font-lexend ml-2">
                  {formatDateTime(event.startTime)}
                </Text>
              </View>

              <View className="flex-row h-[20%] items-center">
                <Ionicons name="location-outline" size={20} color={"#CAFF4C"} />
                <Text
                  className="text-white font-lexend ml-2 w-[120px] "
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {event.location}
                </Text>
              </View>
              {/* <Text className="text-white font-lexend ml-2 w-[100%] text-center my-2 h-[10%] ">
                {event.eventTypeName}
              </Text> */}

              <View className="  items-center justify-center w-[100%] p-2 mt-2">
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
                >
                  {event.eventTags.map((tag, index) => (
                    <Text
                      key={index}
                      className="bg-[#CAFF4C] text-[#000000d6]  text-[14px] font-lexend  px-2 rounded-[20px] "
                    >
                      {tag}
                    </Text>
                  ))}
                </ScrollView>
              </View>
              <TouchableOpacity
                className="flex-row justify-center items-center mt-3 w-[100%] h-[10%]"
                onPress={() => router.push(`/events/${event?.eventId}`)}
              >
                <Text className="text-[#CAFF4C] font-bold font-lexend text-[16px] text-center">
                  Xem chi tiết
                </Text>
                <Ionicons
                  className="items-center justify-center"
                  name="chevron-forward-outline"
                  color={"#CAFF4C"}
                  size={22}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View className="flex-row justify-between p-4 mt-4">
          <Text className="text-white font-bold font-lexend text-[16px]">
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
