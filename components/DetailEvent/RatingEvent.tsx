import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ButtonProps, Rating } from "@/constants/model/EventDetail";
import { getEventRating } from "@/api/event";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";

export default function RatingEvent({ eventId }: ButtonProps) {
  console.log("alo", eventId);

  const { data } = useQuery<Rating, Error>({
    queryKey: ["rating", eventId],
    queryFn: () => getEventRating(eventId as string),
  });

  const navListReview = (eventId: string) => {
    if (!eventId) {
      Alert.alert("Thông báo", "Không tìm thấy list event");
    } else {
      router.push({
        pathname: "/events/list-review",
        params: { eventId },
      });
    }
  };

  return (
    <View className=" mt-4 w-full ">
      <TouchableOpacity
        className="flex-row items-center justify-center"
        onPress={() => navListReview(eventId)}
      >
        <Ionicons name="star-outline" size={20} color={"#CAFF4C"} />
        <Text className="text-white ml-2">
          {data?.avgRate?.toFixed(1) || 0}/5 (219 lượt đánh giá)
        </Text>
      </TouchableOpacity>
    </View>
  );
}
