import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { ListReviewData } from "@/constants/model/Comment";
import { getListReview } from "@/api/event";

import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { formatDateTime } from "@/lib/utils/date-time";

export default function ListReview() {
  const { eventId } = useLocalSearchParams();
  console.log("lisReview", eventId);

  const { data, isLoading, error } = useQuery<ListReviewData[], Error>({
    queryKey: ["reviews", eventId],
    queryFn: () => getListReview(eventId as string),
  });

  if (isLoading) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <ActivityIndicator size="large" color="#CAFF4C" />
        <Text className="text-white mt-2">Đang tải các bài chia sẻ...</Text>
      </SafeAreaView>
    );
  }
  if (error) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <ActivityIndicator size="large" color="#CAFF4C" />
        <Text className="text-white mt-2">Đang tải các bài đánh giá...</Text>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView className="flex-1 bg-black bg-opacity-50">
      <SafeAreaView className="flex-1 px-2 w-full bg-black justify-center">
        <Text className="text-[17px] text-white font-bold font-inter ml-2 ">
          Các bài đánh giá về sự kiện :
        </Text>

        <View className="mt-4">
          {data?.map((review) => (
            <View
              className="border border-gray-300 rounded-lg p-4 text-base my-2"
              key={review.reviewId}
            >
              <View className="flex-row items-center justify-between ">
                <View className="flex-row items-center">
                  <Image
                    source={{
                      uri:
                        review?.avatar ||
                        require("../../assets/images/profile.jpg"),
                    }}
                    className="h-[60px] w-[60px] rounded-[40px] border-gray-400 border-[1px]"
                  />
                  <View className="ml-6 justify-center items-center ">
                    <Text className="text-white w-full">{review.fullname}</Text>

                    <View style={{ flexDirection: "row", marginTop: 8 }}>
                      {[...Array(5)].map((_, index) => (
                        <Ionicons
                          key={index}
                          name={index < review.rating ? "star" : "star-outline"}
                          size={18}
                          color="#FFD700"
                          style={{ marginHorizontal: 2 }}
                        />
                      ))}
                    </View>
                  </View>
                </View>
              </View>
              <Text className="text-white mt-3 ">
                {formatDateTime(review.reviewDate)}
              </Text>
              <Text className="mt-3 text-white ">{review.comment}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
