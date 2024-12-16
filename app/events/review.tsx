import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Review } from "@/constants/model/Comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postReviewEvent } from "@/api/event";
import { useLocalSearchParams } from "expo-router";

import ReviewModal from "@/components/Modal/ReviewModal";
import ErrorModal from "@/components/Modal/ErrorModal";

export default function ReviewEvent() {
  const { eventId } = useLocalSearchParams();

  const queryClient = useQueryClient();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false);

  const mutation = useMutation<any, Error, Review>({
    mutationFn: (review: Review) => postReviewEvent(review),
    onSuccess: () => {
      console.log("Review submitted successfully!");
      setModalVisible(true);
      setRating(0);
      setComment("");

      queryClient.invalidateQueries({
        queryKey: ["reviews", eventId],
      });
      queryClient.invalidateQueries({
        queryKey: ["events", eventId],
      });
    },
    onError: (error) => {
      console.error("Error submitting review:", error);
    },
  });

  const handleSubmit = () => {
    if (rating === 0 && comment.trim() === "") {
      setErrorModalVisible(true);
      return;
    }

    mutation.mutate({
      rating,
      comment,
      eventId: eventId as string,
    });
  };

  return (
    <View className="bg-primary flex-1  ">
      <View className=" rounded-[20px] p-4">
        <Text className="font-bold font-inter text-[24px] text-center mt-4 mb-3 text-gray-200">
          Đánh giá của bạn về sự kiện
        </Text>

        <View
          style={{ flexDirection: "row", marginTop: 8 }}
          className="flex-row items-center mt-4 justify-center"
        >
          {[...Array(5)].map((_, index) => (
            <Ionicons
              key={index}
              name={index < rating ? "star" : "star-outline"}
              size={42}
              color="#FFD700"
              style={{ marginHorizontal: 2 }}
              onPress={() => setRating(index + 1)}
            />
          ))}
        </View>
        <View className=" mt-4 ">
          <Text className="m-2 text-gray-200 text-[16px] font-lexend">
            Hãy đưa ra đánh giá của bạn ở dưới đây :
          </Text>
          <TextInput
            className="mt-2 bg-[#fefefe] border border-gray-300 rounded-lg p-4 font-lexend
            text-base h-[180px]  focus:border-black focus:outline-none"
            placeholder="Nhập nội dung của bạn..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={comment}
            onChangeText={setComment}
          />
        </View>
      </View>
      <View className="mt-[40px] justify-center">
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-[#CAFF4C] items-center mx-20 h-[48px] justify-center rounded-[20px]"
        >
          <Text className="text-center font-bold text-[21px] font-lexend">
            Gửi
          </Text>
        </TouchableOpacity>
      </View>
      <ReviewModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        message="Cảm ơn bạn đã gửi đánh giá!"
      />
      <ErrorModal
        visible={errorModalVisible}
        onClose={() => setErrorModalVisible(false)}
        message="Bạn cần phải nhập đánh giá và vote sao!"
      />
    </View>
  );
}
