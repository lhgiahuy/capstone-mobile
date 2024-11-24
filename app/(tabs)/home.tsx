import { View, ScrollView } from "react-native";
import React from "react";

import SpecialEvent from "@/components/SpecialEvent";
import { SafeAreaView } from "react-native-safe-area-context";
// import TrendEvent from "@/components/UpcomingEvent";

import UpcomingEvent from "@/components/UpcomingEvent";
import CurrentEvent from "@/components/CurrentEvent";
import BannerEvent from "@/components/Banner";

export default function Home() {
  return (
    <SafeAreaView className="bg-black flex-1 ">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="h-[258px]">
          <BannerEvent />
        </View>
        <SpecialEvent />
        {/* <TrendEvent /> */}
        <UpcomingEvent />
        <CurrentEvent />
      </ScrollView>
    </SafeAreaView>
  );
}
