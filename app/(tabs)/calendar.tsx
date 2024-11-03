import { View, Text } from "react-native";
import React, { useState } from "react";
import NavCalender from "@/components/Calendar/NavCalender";
import EndedEvent from "@/components/Calendar/EndedEvent";

import UpcomingCalendar from "@/components/Calendar/UpcomingCalendar";

export default function calendar() {
  const [selectedTab, setSelectedTab] = useState<"upcoming" | "ended">(
    "upcoming"
  );
  return (
    <View className="flex-1 bg-primary ">
      <NavCalender selectedTab={selectedTab} onSelectTab={setSelectedTab} />
      <View className="flex-1  ">
        {selectedTab === "upcoming" ? <UpcomingCalendar /> : <EndedEvent />}
      </View>
    </View>
  );
}
