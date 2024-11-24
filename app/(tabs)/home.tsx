import { View, ScrollView, BackHandler } from "react-native";
import React, { useState } from "react";

import SpecialEvent from "@/components/SpecialEvent";
import { SafeAreaView } from "react-native-safe-area-context";
// import TrendEvent from "@/components/UpcomingEvent";

import UpcomingEvent from "@/components/UpcomingEvent";
import CurrentEvent from "@/components/CurrentEvent";
import BannerEvent from "@/components/Banner";
import LogoutModal from "@/components/Modal/LogoutModal";
import { router, useFocusEffect } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        setIsModalVisible(true);
        return true; // Chặn hành động quay lại
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("authToken");
    router.replace("/");
  };

  return (
    <SafeAreaView className="bg-black flex-1 px-2">
      <ScrollView className="flex-1 bg-primary">
        <View className="h-[258px]">
          <BannerEvent />
        </View>
        <SpecialEvent />
        {/* <TrendEvent /> */}
        <UpcomingEvent />
        <CurrentEvent />
      </ScrollView>

      <LogoutModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onLogout={handleLogout}
      />
    </SafeAreaView>
  );
}
