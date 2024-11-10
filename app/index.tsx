import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  // Dimensions,
  // Image,
} from "react-native";
import React from "react";
// import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { ScrollView } from "react-native";

export default function App() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1">
      {/* <ScrollView
        contentContainerStyle={{
          height: "100%",
          justifyContent: "space-between",
        }}
      > */}

      <ImageBackground
        className="flex-1 justify-center h-full"
        source={require("../assets/images/dark_background.png")}
        resizeMode="cover"
      >
        <View className="px-4 pt-4">
          <Text className="text-[52px]  text-[#CAFF4C]  font-itim text-center">
            FVENT
          </Text>

          <Text className="text-[80px] text-center  font-pacifo text-white ">
            Welcome
          </Text>

          <Text className="text-[18px] text-center font-dancing  text-white">
            Find your favorite event with Fvent!
            {/* Tìm kiếm sự kiện yêu thích với Fvent */}
          </Text>

          <View className="flex-row mt-12 justify-center">
            <TouchableOpacity
              className="bg-[#CAFF4C] w-[70%] h-[46px] rounded-[26px]"
              onPress={() => router.push("/sign-up")}
            >
              <Text className="text-center font-bold text-[18px] text-black p-2">
                Tạo tài khoản
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row mt-4 justify-center">
            <TouchableOpacity
              className="bg-[#CAFF4C] w-[70%] h-[46px] rounded-[26px]"
              onPress={() => router.push("/sign-in")}
            >
              <Text className="text-center font-bold text-[18px] text-black p-2">
                Đăng nhập
              </Text>
            </TouchableOpacity>
          </View>

          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
