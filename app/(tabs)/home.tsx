import { View, ScrollView } from "react-native";
import React from "react";
import Banner from "@/components/Banner";
import SpecialEvent from "@/components/SpecialEvent";
import { SafeAreaView } from "react-native-safe-area-context";
import TrendEvent from "@/components/TrendEvent";
import Talkshow from "@/components/Talkshow";

export default function Home() {
  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="h-[258px]">
          <Banner />
        </View>
        <SpecialEvent />
        <TrendEvent />
        <Talkshow />
      </ScrollView>
    </SafeAreaView>
  );
}
