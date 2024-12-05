import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavRating, Rating } from "@/constants/model/EventDetail";
import { getEventRating } from "@/api/event";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

export default function RatingEvent({ eventId, status }: NavRating) {
  console.log("alo", eventId);

  const { data } = useQuery<Rating, Error>({
    queryKey: ["rating", eventId],
    queryFn: () => getEventRating(eventId as string),
  });

  const navListReview = (eventId: string) => {
    if (!eventId) {
      Toast.show({
        type: "error",
        text1: "Danh sách chia sẻ sẽ hiện đang trống!",
        text1Style: {
          fontSize: 16,
          fontWeight: "bold",
        },
      });
      return;
    }
    if (status !== "Completed") {
      Toast.show({
        type: "error",
        text1: "Vui lòng chờ tới khi sự kiện kết thúc",
        text2: "Danh sách chia sẻ sẽ được cập nhật",
        text1Style: {
          fontSize: 16,
          fontWeight: "bold",
        },
        text2Style: {
          fontSize: 14,
        },
      });
      return;
    }
    {
      router.push({
        pathname: "/events/list-review",
        params: { eventId },
      });
    }
  };

  return (
    <View className="mt-3 w-full justify-center items-center">
      <TouchableOpacity
        className="flex-row items-center justify-center"
        onPress={() => navListReview(eventId)}
      >
        <Ionicons name="star-outline" size={20} color={"#CAFF4C"} />
        <Text className="text-white ml-1 font-itim text-[16px] mt-1">
          {data?.avgRate?.toFixed(1) || 0}/5 ({data?.totalRate || "0"} lượt đánh
          giá)
        </Text>
      </TouchableOpacity>
    </View>
  );
}
