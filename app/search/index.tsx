import { View, TextInput, SafeAreaView } from "react-native";
import React from "react";

import SearchBar from "@/components/SearchBar";
// import DateTimePicker from "@react-native-community/datetimepicker";

export default function search() {
  return (
    <SafeAreaView className="bg-black h-full">
      <SearchBar />
    </SafeAreaView>
  );
}
