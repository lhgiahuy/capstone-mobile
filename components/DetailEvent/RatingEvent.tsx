import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ButtonProps, Rating } from "@/constants/model/EventDetail";
import { getEventRating } from "@/api/event";
import { useQuery } from "@tanstack/react-query";

export default function RatingEvent({ eventId }: ButtonProps) {
  const { data } = useQuery<Rating, Error>({
    queryKey: ["rating", eventId],
    queryFn: () => getEventRating(eventId as string),
  });

  const renderStars = (avgRate: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= avgRate ? "star" : "star-outline"}
          size={25}
          color="#FFD700"
        />
      );
    }
    return stars;
  };
  return (
    <View className=" mt-4 w-full ">
      <View className="flex-row items-center justify-center">
        <Ionicons name="star-outline" size={20} color={"#CAFF4C"} />
        <Text className="text-white ml-2">
          {data?.avgRate?.toFixed(1) || 0}/5 (219 lượt đánh giá)
        </Text>
      </View>
      <View className="flex-row bg-white h-[60px] rounded-[16px] p-4 mt-8 items-center justify-between">
        <Text className="font-bold text-[17px]"> Đánh giá</Text>
        <Text> {renderStars(data?.avgRate || 0)}</Text>
      </View>
    </View>
  );
}
