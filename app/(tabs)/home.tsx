import { View, ScrollView, BackHandler, RefreshControl } from "react-native";
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
import { useQueryClient } from "@tanstack/react-query";

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const queryClient = useQueryClient();

  const onRefresh = async () => {
    setRefreshing(true);

    await queryClient.invalidateQueries({
      queryKey: ["notification"],
    });
    await queryClient.invalidateQueries({
      queryKey: ["user", "StatusNoti"],
    });
    await queryClient.invalidateQueries({
      queryKey: ["events", "upcoming"],
    });
    await queryClient.invalidateQueries({
      queryKey: ["events", "InProgress"],
    });
    await queryClient.invalidateQueries({
      queryKey: ["events", "banner-recomemended"],
    });

    setRefreshing(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        setIsModalVisible(true);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("authToken");
    queryClient.removeQueries();
    router.replace("/");
  };

  return (
    <SafeAreaView className="bg-black flex-1 px-2">
      <ScrollView
        className="flex-1 bg-primary"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="h-[258px]">
          <BannerEvent />
        </View>
        <SpecialEvent />
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
