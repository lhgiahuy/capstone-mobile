import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

interface NotificationIconProps {
  isHaveUnreadNoti: boolean;
}

export default function NotificationIcon({
  isHaveUnreadNoti,
}: NotificationIconProps) {
  return (
    <View className="relative">
      <Ionicons name="notifications" size={24} color="black" />

      {isHaveUnreadNoti && (
        <View className="absolute -top-0.5 -right-0.5 bg-red-500 w-2.5 h-2.5 rounded-full border border-white" />
      )}
    </View>
  );
}
