import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readNotification, removeNotification } from "@/api/notification";
import { ButtonRead } from "@/constants/model/Notification";

export default function ButtonReadNoti({ notiId, readStatus }: ButtonRead) {
  const queryClient = useQueryClient();
  const ReadNoti = useMutation({
    mutationFn: (notiId: string) => readNotification(notiId),
    onSuccess: () => {
      console.log("Success");
      queryClient.invalidateQueries({
        queryKey: ["notification"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user", "StatusNoti"],
      });
    },
    onError: (error) => {
      console.error("Error submitting review:", error);
    },
  });

  const RemoveNoti = useMutation({
    mutationFn: (notiId: string) => removeNotification(notiId),
    onSuccess: () => {
      console.log("Success to remove");
      queryClient.invalidateQueries({
        queryKey: ["notification"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user", "StatusNoti"],
      });
    },
    onError: (error) => {
      console.error("Error submitting review:", error);
    },
  });

  const HandleRead = () => {
    ReadNoti.mutate(notiId);
  };

  const HandleRemove = () => {
    RemoveNoti.mutate(notiId);
  };

  return (
    <View className="flex-1 justify-center mb-2">
      {readStatus === "Unread" ? (
        <TouchableOpacity
          className="rounded-md items-center  w-auto flex-row ml-6 "
          // onPress={() => router.push("/notificationsss/test")}
          onPress={() => HandleRead()}
        >
          <Ionicons name="checkmark-outline" size={18} color={"#22d334d2"} />
          <Text
            className=" ml-1 font-bold font-lexend   
        text-[#22d334d2] "
          >
            Đánh dấu đã xem
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="rounded-md items-center  w-auto flex-row ml-6 "
          onPress={() => HandleRemove()}
        >
          <Ionicons name="remove-circle-outline" size={18} color={"#FF4C4C"} />
          <Text
            className="ml-1 font-bold font-lexend   
       text-[#FF4C4C]"
          >
            Ẩn thông báo
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
