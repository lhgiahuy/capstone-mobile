import { View, TextInput, SafeAreaView } from "react-native";
import React from "react";

import SearchBar from "@/components/Search/SearchBar";

import RecomentEvent from "@/components/Search/RecomentEvent";
import EventTag from "@/components/Search/EventTag";

// import DateTimePicker from "@react-native-community/datetimepicker";

export default function search() {
  return (
    <SafeAreaView className="bg-black h-full p-3">
      <SearchBar />
      <EventTag />
      <RecomentEvent />
    </SafeAreaView>
  );
}
