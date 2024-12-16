import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { EventData } from "@/constants/model/EventDetail";
import { router } from "expo-router";
import { formatDateTime, getDay, getMonth } from "@/lib/utils/date-time";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQueryClient } from "@tanstack/react-query";

interface dataProps {
  data: EventData[];
}

export default function EndedCard({ data }: dataProps) {
  if (!data || data.length === 0) {
    return (
      <SafeAreaView className="bg-primary justify-center items-center mt-3">
        <Text className="text-white font-bold text-lg text-center mt-8">
          Chưa có sự kiện đã tham gia
        </Text>
        <Image
          source={require("../../assets/images/not-found.png")}
          className=" h-[320px] w-full rounded-[16px]"
        />
      </SafeAreaView>
    );
  }
  return (
    <ScrollView className="bg-primary flex-1 mx-2 p-1 mb-3">
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
            <Text className="w-[120px] font-lexend text-[17px] text-center text-white">
              {getMonth(event.startTime)}
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
              <Text className="text-white ml-2 font-lexend text-[12px] ">
                {formatDateTime(event.startTime)}
              </Text>
            </View>

            {/* <View className="flex-row mt-2">
              <Ionicons name="location-outline" size={20} color={"#CAFF4C"} />
              <Text className="text-white ml-2 font-lexend text-[12px]">
                {event.location}
              </Text>
            </View> */}
            {!event.location ? (
              <View className=" flex-row mt-2">
                <Ionicons name="link-outline" size={20} color={"#CAFF4C"} />
                <Text
                  className="text-white ml-2 font-lexend text-[12px] "
                  numberOfLines={3}
                  ellipsizeMode="tail"
                >
                  Link tham gia: {event.linkEvent}
                </Text>
              </View>
            ) : (
              <View className="flex-row mt-2">
                <Ionicons name="location-outline" size={20} color={"#CAFF4C"} />
                <Text
                  className="text-white ml-2 font-lexend text-[12px]"
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
  );
}
