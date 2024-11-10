import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import BannerOrganizer from "@/components/Organizer/BannerOrganizer";

import Nav from "@/components/Organizer/Nav";
import Ended from "@/components/Organizer/Ended";
import Upcoming from "@/components/Organizer/Upcoming";

import { useLocalSearchParams } from "expo-router";
import Ongoing from "@/components/Organizer/Ongoing";

export default function Infor() {
  const { organizerId } = useLocalSearchParams();
  console.log(organizerId);

  const [selectedTab, setSelectedTab] = useState<
    "upcoming" | "ended" | "ongoing"
  >("upcoming");

  return (
    <View className="flex-1 bg-black ">
      <ScrollView>
        <LinearGradient
          colors={["#2B2B2B", "#A8E063", "#000000"]}
          locations={[0, 0.2, 0.4]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="flex-1"
        >
          <BannerOrganizer organizerId={organizerId as string} />
          <Nav selectedTab={selectedTab} onSelectTab={setSelectedTab} />
          <View className="flex-1  ">
            {selectedTab === "upcoming" && (
              <Upcoming organizerId={organizerId as string} />
            )}

            {selectedTab === "ongoing" && (
              <Ongoing organizerId={organizerId as string} />
            )}
            {selectedTab === "ended" && (
              <Ended organizerId={organizerId as string} />
            )}
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}
