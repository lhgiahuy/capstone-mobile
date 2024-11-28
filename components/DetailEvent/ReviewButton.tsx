import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { EventData } from "@/constants/model/EventDetail";

interface ReviewButtonProps {
  eventId: string;
  data: EventData;
}

export default function ReviewButton({ eventId, data }: ReviewButtonProps) {
  console.log(data.canReview);

  const handlePress = () => {
    if (data.canReview === true && data.isReviewed === false) {
      router.push({
        pathname: "/events/review",
        params: { eventId: eventId },
      });
    } else {
      router.push({
        pathname: "/events/list-review",
        params: { eventId: eventId },
      });
    }
  };

  return (
    <View className="flex-1">
      <TouchableOpacity
        onPress={handlePress}
        className="align-middle bg-[#4CAF50] w-[320px] h-[50px] rounded-[18px] items-center justify-center opacity-90"
        style={{
          position: "absolute",
          bottom: 10,
          alignSelf: "center",
        }}
      >
        <Text className="text-black text-[20px] font-bold">
          {data.canReview === true && data.isReviewed === false
            ? "Đánh giá sự kiện"
            : "Xem đánh giá"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
