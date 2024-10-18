import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface RatingStars {
  rating: number;
}

export default function RatingEvent({ rating }: RatingStars) {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
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
        <Text className="text-white ml-2">4.8/5 (219 lượt đánh giá)</Text>
      </View>
      <View className="flex-row bg-white h-[60px] rounded-[16px] p-4 mt-8 items-center justify-between">
        <Text className="font-bold text-[17px] "> Đánh giá</Text>
        <Text> {renderStars(rating)}</Text>
      </View>
    </View>
  );
}
