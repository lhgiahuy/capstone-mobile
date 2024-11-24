import { View, Text, Button } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";

export default function Pushnotifcation() {
  const [deviceToken, setDeviceToken] = useState("");

  // Lấy device push token khi component được render
  useEffect(() => {
    const getDevicePushToken = async () => {
      try {
        const token = (await Notifications.getDevicePushTokenAsync()).data;
        console.log("Device Push Token: ", token);
        setDeviceToken(token); // Lưu token vào state
      } catch (e) {
        console.error("Error getting device push token: ", e);
      }
    };
    getDevicePushToken();
  }, []);

  return (
    <View>
      <Text>index</Text>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
      <Text>Device Push Token: {deviceToken}</Text>
      {/* Hiển thị token nếu cần */}
    </View>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here", test: { test1: "more data" } },
    },
    trigger: { seconds: 2 },
  });
}
