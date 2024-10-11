import { View, Text, ScrollView } from "react-native";
import React from "react";
import Banner from "@/components/Banner";
import SpecialEvent from "@/components/SpecialEvent";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="h-[200px]">
          <Banner />
        </View>

        <View className="w-[100%] justify-center items-center my-4">
          <Text className="text-white">home</Text>
        </View>
        <SpecialEvent />
      </ScrollView>
    </SafeAreaView>
  );
}
