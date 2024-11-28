import { useEffect, useState } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

export default function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [devicePushToken, setDevicePushToken] = useState("");

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      try {
        if (Platform.OS === "android") {
          // Create default notification channel
          await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
          });
        }

        // Request permissions for notifications
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          console.warn("Push notification permissions denied.");
          return;
        }

        // Fetch Expo Push Token
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ||
          Constants?.easConfig?.projectId;
        const token = (await Notifications.getExpoPushTokenAsync({ projectId }))
          .data;

        console.log("Expo Push Token:", token);
        setExpoPushToken(token);

        // Fetch Device Token (FCM/APNs token)
        if (Platform.OS === "android" || Platform.OS === "ios") {
          const deviceToken = (await Notifications.getDevicePushTokenAsync())
            .data;

          console.log("Device Push Token:", deviceToken);
          setDevicePushToken(deviceToken);
        }
      } catch (error) {
        console.error("Error fetching Expo Push Token:", error);
      }
    };

    registerForPushNotificationsAsync();
  }, []);

  return { expoPushToken, devicePushToken };
}
