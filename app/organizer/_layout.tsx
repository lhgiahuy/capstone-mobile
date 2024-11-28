import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function SearchLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="infor"
          options={{
            headerTitle: () => (
              <View>
                <Text className="font-bold text-[18px] text-[#000]">
                  Ban tổ chức
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
