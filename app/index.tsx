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
    <View className="flex-1">
      <ImageBackground
        className="flex-1 justify-center h-full"
        source={require("../assets/images/dark_background.png")}
        resizeMode="cover"
      >
        <View className="px-4">
          <Text className="text-[52px]  text-[#CAFF4C] font-bold font-lexend text-center">
            FVENT
          </Text>

          <Text className="text-[48px] text-center  font-inter font-bold text-white ">
            CHÀO MỪNG
          </Text>

          <Text className="text-[18px] text-center  font-lexend  text-white mt-1">
            {/* Sự kiện yêu thích trong tầm tay với Fvent! */}
            Tìm kiếm sự kiện yêu thích với Fvent!
          </Text>

          <View className="flex-row mt-12 justify-center">
            <TouchableOpacity
              className="bg-[#CAFF4C] w-[60%] h-[46px] rounded-[26px] justify-center py-2"
              onPress={() => router.push("/sign-up")}
            >
              <Text className="text-center font-bold font-lexend text-[18px] text-black ">
                Tạo tài khoản
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row mt-4 justify-center">
            <TouchableOpacity
              className="bg-[#CAFF4C] w-[60%] h-[46px] rounded-[26px] justify-center py-2"
              onPress={() => router.push("/sign-in")}
            >
              <Text className="text-center  font-bold font-lexend text-[18px] text-black ">
                Đăng nhập
              </Text>
            </TouchableOpacity>
          </View>

          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    </View>
  );
}
