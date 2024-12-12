import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readNotification, removeNotification } from "@/api/notification";
import { ButtonRead } from "@/constants/model/Notification";

export default function ButtonReadNoti({
  notiId,
  readStatus,
  eventId,
}: ButtonRead) {
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
    // if (!eventId) {
    //   ReadNoti.mutate(notiId);
    // } else
    if (!eventId) {
      ReadNoti.mutate(notiId);
      return;
    } else router.push(`/events/${eventId}`);
    ReadNoti.mutate(notiId);
    // router.push(`/events/${eventId}`);
  };

  const HandleRemove = () => {
    RemoveNoti.mutate(notiId);
  };

  return (
    <View className="flex-1 justify-center my-2 items-center">
      {readStatus === "Unread" ? (
        <TouchableOpacity
          className="rounded-md items-center  w-auto flex-row  "
          onPress={() => HandleRead()}
        >
          <Ionicons name="send-outline" size={16} color={"#CAFF4C"} />
          <Text
            className=" ml-1  font-lexend   
        text-[#CAFF4C] "
          >
            Xem chi tiết sự kiện
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="rounded-md items-center  w-auto flex-row  "
          onPress={() => HandleRemove()}
        >
          <Ionicons name="remove-circle-outline" size={18} color={"#f2d3d3"} />
          <Text
            className="ml-1  font-lexend   
       text-[#f2d3d3] "
          >
            Xóa
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
