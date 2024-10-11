import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";

export default function App() {
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <ImageBackground
          source={require("../assets/images/light-event.jpg")}
          className="flex-1 justify-center"
          resizeMode="cover"
        >
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold text-white text-center">
              Khám phá những sự kiện mới ở trường đại học FPT!
            </Text>

            <Text className="text-[16px] text-center font-semibold text-white mt-4">
              Trải nghiệm và tìm kiếm những sự kiện liên quan tới chuyên ngành
              và sở thích của bạn
            </Text>
            <View className="flex-row mt-12 justify-center">
              <TouchableOpacity className="bg-gray-200 w-[70%] h-[46px] rounded-[8px] ">
                <Text className="text-center font-bold text-[18px] text-black p-2">
                  <Link href="/sign-in">Khám phá ngay</Link>
                </Text>
              </TouchableOpacity>
            </View>

            <StatusBar style="auto" />
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}
