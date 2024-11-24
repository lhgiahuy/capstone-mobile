import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  Pressable,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import RatingEvent from "@/components/DetailEvent/RatingEvent";

import { getEventById } from "@/api/event";
import { EventData } from "@/constants/model/EventDetail";
import SubscribeButton from "@/components/DetailEvent/SubscribeButton";

import CardOrganizer from "@/components/DetailEvent/CardOrganizer";

import { useWindowDimensions } from "react-native";

import Description from "@/components/DetailEvent/Description";
import { formatDateTime } from "@/lib/utils/date-time";

export default function DetailEvent() {
  const { eventId } = useLocalSearchParams();
  const { width } = useWindowDimensions();

  const { data, isLoading, error } = useQuery<EventData, Error>({
    queryKey: ["events", eventId],
    queryFn: () => getEventById(eventId as string),
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
  const baseStyle = {
    fontFamily: "lexend",
    fontSize: 16,
    color: "#000000",
  };

  return (
    <View className="flex-1 bg-primary ">
      <ScrollView contentContainerStyle={{ paddingBottom: 62 }}>
        <LinearGradient
          colors={[
            "rgba(102, 102, 102, 0.63)",
            "rgba(0, 0, 0, 0.63)",
            "rgba(102, 102, 102, 0.2)",
          ]}
          className=" items-center p-3"
        >
          <Image
            source={{ uri: data.posterImg }}
            className="h-[260px] w-[330px] rounded-[20px] mt-6 opacity-75"
          />
          <Text className="text-[#CAFF4C] font-bold font-inter text-[22px] my-2 text-center mx-2">
            {data.eventName}
          </Text>

          <View className="flex-row">
            <Ionicons
              name="calendar-clear-outline"
              size={20}
              color={"#CAFF4C"}
            />
            <Text className="text-white ml-3 font-lexend text-[16px]">
              Bắt đầu : {formatDateTime(data.startTime)}
            </Text>
          </View>
          <View className="flex-row ">
            <Ionicons name="calendar-outline" size={20} color={"#CAFF4C"} />
            <Text className="text-white ml-2 font-lexend text-[16px]">
              Kết thúc : {formatDateTime(data.endTime)}
            </Text>
          </View>

          <View className="flex-row mt-4 w-[80%] justify-center items-center">
            <Ionicons name="location-outline" size={22} color={"#CAFF4C"} />
            <Text className="text-white ml-2 font-lexend text-[16px] text-center">
              {data.location}
            </Text>
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
                  className="text-white text-[14px] bg-[#797777d6] mx-1 px-2 rounded font-lexend"
                >
                  {tag}
                </Text>
              ))}
            </View>
          </ScrollView>
          <RatingEvent eventId={data.eventId} status={data.status} />
          <View className="bg-white w-full rounded-[24px] p-4 mt-4">
            <Text className="font-bold font-inter text-[18px] mb-2">
              Giới thiệu
            </Text>
            <View style={{ flex: 1 }}>
              <Description description={data.description} />
            </View>
          </View>
          <CardOrganizer
            organizerName={data.organizerName}
            organizerId={data.organizerId}
          />
        </LinearGradient>
      </ScrollView>

      <SubscribeButton
        eventId={eventId as string}
        register={data.isRegistered}
        status={data.status}
        form={data.form}
      />
    </View>
  );
}
