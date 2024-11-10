import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function EventLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="[eventId]"
          options={{
            headerTitle: () => (
              <View>
                <Text className="font-bold text-[18px] text-[#000]">
                  Chi tiết sự kiện
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
          name="list-event"
          options={{
            headerTitle: () => (
              <View>
                <Text className="font-bold text-[18px] text-[#000]">
                  Sự kiện đang diễn ra
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
          name="review"
          options={{
            headerTitle: () => (
              <View>
                <Text className="font-bold text-[18px] text-[#000]">
                  Chia sẻ trải nghiệm
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
          name="list-review"
          options={{
            headerTitle: () => (
              <View>
                <Text className="font-bold text-[18px] text-[#000]">
                  Danh sách chia sẻ
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
    </>
  );
}
