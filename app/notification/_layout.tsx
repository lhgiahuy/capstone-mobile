import { View, Text, Platform } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Stack } from "expo-router";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function NotficationLayout() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const [fcmToken, setFcmToken] = useState("");
  // const notificationListener = useRef<Notifications.Subscription>();
  // const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token ?? "")
    );

    // Gọi getDevicePushTokenAsync() để lấy token từ APNs hoặc FCM
    const getDevicePushToken = async () => {
      try {
        const token = (await Notifications.getDevicePushTokenAsync()).data;
        console.log("Device Push Token: ", token);
        // Lưu token vào state hoặc gửi đến server nếu cần
        setExpoPushToken(token); // Ví dụ lưu vào state
      } catch (e) {
        console.error("Error getting device push token: ", e);
      }
    };

    getDevicePushToken(); // Gọi hàm để lấy device push token

    // .catch((error: any) => setExpoPushToken(`${error}`));
  }, []);
  console.log("Token", expoPushToken);

  return (
    <>
      <Stack>
        <Stack.Screen
          name="list-notification"
          options={{
            headerTitle: () => (
              <View>
                <Text className="font-bold text-[18px] text-[#000]">
                  Thông báo
                </Text>
              </View>
            ),
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#CAFF4C",
            },
          }}
        />
        <Stack.Screen
          name="test"
          options={{
            headerTitle: () => (
              <View>
                <Text className="font-bold text-[18px] text-[#000]">
                  Chỉnh sửa hồ sơ
                </Text>
              </View>
            ),
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#CAFF4C",
            },
          }}
        />
      </Stack>

      {/* <Loader isLoading={loading} />
      <StatusBar backgroundColor="#161622" style="light" /> */}
    </>
  );
}

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}
