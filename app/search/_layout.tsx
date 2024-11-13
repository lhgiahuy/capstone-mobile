import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function SearchLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: () => (
              <View>
                <Text className="font-bold text-[18px] text-[#000]">
                  Tìm kiếm
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
          name="result"
          options={{
            headerTitle: () => (
              <View>
                <Text className="font-bold text-[18px] text-[#000]">
                  Kết quả tìm kiếm
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
          name="event-tag"
          options={{
            headerTitle: () => (
              <View>
                <Text className="font-bold text-[18px] text-[#000]">
                  Danh sách sự kiện theo thể loại
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
