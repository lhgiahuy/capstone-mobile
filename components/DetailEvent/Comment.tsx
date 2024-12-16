import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { CommentDetail, CommentProp } from "@/constants/model/Comment";
import { getListComment } from "@/api/event";
import RatingEvent from "./RatingEvent";
import { Ionicons } from "@expo/vector-icons";

export default function Comment() {
  const eventId = "5db174b3-57d0-490c-4725-08dcded406b7";
  const { data, isLoading, error } = useQuery<CommentDetail[], Error>({
    queryKey: ["comments", eventId],
    queryFn: () => getListComment(eventId as string),
  });
  const rating = 5;

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);

    const hours = date.getHours();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${hours}:00 , ${day}/${month}/${year}`;
  };

  if (isLoading) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <ActivityIndicator size="large" color="#CAFF4C" />
        <Text className="text-white mt-2">Đang tải bình luận...</Text>
      </SafeAreaView>
    );
  }
  if (error) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <ActivityIndicator size="large" color="#CAFF4C" />
        <Text className="text-white mt-2">Đang tải bình luận...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-black bg-opacity-50">
      <View className="p-4 w-11/12 bg-black rounded-[18px]">
        <Text className="text-[17px] text-white font-bold ml-2 mb-2">
          Bình luận :
        </Text>

        {data?.map((comment) => (
          <View className="mt-4" key={comment.commentId}>
            <View className="border border-gray-300 rounded-lg p-4 text-base ">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Image
                    source={require("../../assets/images/profile.jpg")}
                    className="h-[40px] w-[40px] rounded-[40px]"
                  />
                  <View className="ml-3 justify-center items-center ">
                    <Text className="text-white"> Nguyen Van B</Text>

                    <View style={{ flexDirection: "row", marginTop: 8 }}>
                      {[...Array(5)].map((_, index) => (
                        <Ionicons
                          key={index}
                          name={index < rating ? "star" : "star-outline"} // Hiển thị sao đầy hoặc sao rỗng dựa trên rating
                          size={18}
                          color="#FFD700"
                          style={{ marginHorizontal: 2 }}
                        />
                      ))}
                    </View>
                  </View>
                </View>
                <Text className="text-white">
                  {formatDateTime(comment.createAt)}
                </Text>
              </View>

              <Text className="mt-3 text-white">{comment.commentText}</Text>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}
