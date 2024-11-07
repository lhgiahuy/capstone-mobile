import { View, TextInput, SafeAreaView } from "react-native";
import React from "react";

import SearchBar from "@/components/Search/SearchBar";
import EventTag from "@/components/Search/EventTag";
import RecomentEvent from "@/components/Search/RecomentEvent";
// import DateTimePicker from "@react-native-community/datetimepicker";

export default function search() {
  return (
    <SafeAreaView className="bg-black h-full">
      <SearchBar />
      <EventTag />
      <RecomentEvent />
    </SafeAreaView>
  );
}
