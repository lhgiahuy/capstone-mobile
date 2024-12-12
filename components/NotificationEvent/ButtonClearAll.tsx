import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { clearAllNotification } from "@/api/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export default function ButtonClearAll() {
  const queryClient = useQueryClient();
  const ClearAllNoti = useMutation({
    mutationFn: () => clearAllNotification(),
    onSuccess: () => {
      console.log("Success to remove");
      queryClient.invalidateQueries({
        queryKey: ["notification"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user", "StatusNoti"],
      });
      Toast.show({
        type: "success",
        text1: "Xóa tất cả thông báo thành công",
        text1Style: {
          fontSize: 16,
          fontWeight: "bold",
        },
      });
    },
    onError: (error) => {
      console.error("Error submitting review:", error);
      Toast.show({
        type: "error",
        text1: "Xóathông báo không thành công",
        text1Style: {
          fontSize: 16,
          fontWeight: "bold",
        },
      });
    },
  });

  const HandleClearAll = () => {
    ClearAllNoti.mutate();
  };

  return (
    <View className="flex-1 my-3 ">
      <TouchableOpacity
        className="flex-row rounded-[12px] p-2 bg-[#1F1F1F] w-[220px] justify-center items-center"
        onPress={HandleClearAll}
      >
        <Ionicons name="trash-bin-outline" size={18} color={"#f2d3d3"} />
        <Text className="text-[16px] text-[#f2d3d3] text-center font-lexend ml-2">
          Xóa tất cả thông báo
        </Text>
      </TouchableOpacity>
    </View>
  );
}
