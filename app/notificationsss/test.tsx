import { View, Text, Button } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import usePushNotifications from "@/lib/utils/push-notification";

export default function Pushnotifcation() {
  const { expoPushToken, devicePushToken } = usePushNotifications();

  return (
    <View>
      <Text>Log token</Text>

      <Text>Expo Push Token:</Text>
      <Text className="text-black">{expoPushToken || "Fetching..."}</Text>
      <Text className="text-black">{devicePushToken || "Fetching..."}</Text>

      {/* Hiển thị token nếu cần */}
    </View>
  );
}
