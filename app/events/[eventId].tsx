import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  Pressable,
  SafeAreaView,
  Alert,
  Dimensions,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import RatingEvent from "@/components/DetailEvent/RatingEvent";
import Comment from "@/components/DetailEvent/Comment";
import { getEventById } from "@/api/event";
import { EventData } from "@/constants/model/EventDetail";
import SubscribeButton from "@/components/DetailEvent/SubscribeButton";
import HTMLView from "react-native-htmlview";
// import RenderHtml from "react-native-render-html";

export default function DetailEvent() {
  const { eventId } = useLocalSearchParams();
  const { data, isLoading, error } = useQuery<EventData, Error>({
    queryKey: ["events", eventId],
    queryFn: () => getEventById(eventId as string),
  });

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);

    const hours = date.getHours();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${hours}:00 , ${day} Tháng ${month} , ${year}`;
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
        <Text className="text-white mt-2">Đang tải sự kiện...</Text>
      </SafeAreaView>
    );
  }

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

  const NavInforOrganizer = (organizerId: string) => {
    if (!organizerId) {
      Alert.alert("Thông báo", "Không tìm thấy thông tin tổ chức.");
    } else {
      router.push({
        pathname: "/organizer/infor",
        params: { organizerId: organizerId },
      });
    }
  };
  // const contentWidth = Dimensions.get("window").width;

  return (
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: 62 }}>
        <LinearGradient
          colors={[
            "rgba(102, 102, 102, 0.63)",
            "rgba(0, 0, 0, 0.63)",
            "rgba(102, 102, 102, 0.2)",
          ]}
          className=" items-center "
        >
          <Image
            source={{ uri: data.thumbnailImg }}
            className="h-[260px] w-[330px] rounded-[20px] mt-6 opacity-75"
          />
          <Text className="text-[#CAFF4C] font-bold text-[22px] mt-2 text-center mx-2">
            {data.eventName}
          </Text>
          <View className="flex-row mt-4">
            <Ionicons name="calendar" size={20} color={"#CAFF4C"} />
            <Text className="text-white ml-2">
              {formatDateTime(data.startTime)}
            </Text>
          </View>
          <View className="flex-row mt-4">
            <Ionicons name="location-outline" size={20} color={"#CAFF4C"} />
            <Text className="text-white ml-2">{data.location}</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
          >
            <View className="flex-row mt-3 items-center justify-center">
              {data.eventTags.map((tag, index) => (
                <Text
                  key={index}
                  className="text-white text-[14px] bg-[#797777d6] mx-1 px-2 rounded"
                >
                  {tag}
                </Text>
              ))}
            </View>
          </ScrollView>
          <RatingEvent eventId={data.eventId} />
          <View className="bg-white w-full rounded-[24px] p-4 mt-4">
            <Text className="font-bold text-[17px] mb-2"> Giới thiệu</Text>
            {/* <Text> {data.description}</Text> */}
            {/* <RenderHtml
              source={{ html: data?.description }}
              contentWidth={contentWidth}
            /> */}
            <HTMLView value={data.description} />
          </View>

          <View className="bg-white w-full rounded-[24px] p-4 mt-4 mb-2">
            <Text className="font-bold text-[17px] mb-2">Ban tổ chức</Text>
            <View className="flex-row justify-center items-center">
              <Pressable onPress={() => NavInforOrganizer(data.organizerId)}>
                <Image
                  source={require("../../assets/images/fpt.png")}
                  className="h-[60px] w-[140px] rounded-[40px]"
                />
              </Pressable>

              <Text className="ml-6 font-pacifo w-[120px] text-center text-[20px]">
                {data.organizerName}
              </Text>
            </View>
          </View>
          <Comment />
        </LinearGradient>
      </ScrollView>

      <SubscribeButton
        eventId={eventId as string}
        register={data.isRegistered}
      />
    </View>
  );
}
