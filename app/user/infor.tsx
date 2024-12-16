import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/user";
import { User } from "@/constants/model/User";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function UserInfor() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User>({
    queryKey: ["user"],
    queryFn: getUser,
  });

  if (isLoading) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <ActivityIndicator size="large" color="#CAFF4C" />
        <Text className="text-white mt-2">Đang tải sự kiện...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-primary">
        <Text>Error loading user data</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-primary">
      <View className="justify-center  mt-8 mx-2">
        <Text className="text-white  ml-4 my-2 font-bold text-[18px]">
          Họ và tên
        </Text>
        <Text className="bg-[#171717]  h-[54px] w-full p-4 mb-2 rounded-[18px] text-gray-400">
          {user?.username}
        </Text>
      </View>

      <View className="justify-center mx-2">
        <Text className="text-white  ml-4 my-2 font-bold text-[18px]">
          Email
        </Text>
        <Text
          className="bg-[#171717]  h-[54px] w-full  p-4 mb-2 rounded-[18px] text-gray-400"
          // 171717
        >
          {user?.email}
        </Text>
      </View>
      <View className="justify-center mx-2">
        <Text className="text-white  ml-4 my-2 font-bold text-[18px]">
          Mã số sinh viên
        </Text>
        <Text className="bg-[#171717]  h-[54px] w-full  p-4 mb-2 rounded-[18px] text-gray-400">
          {user?.studentId ? user.studentId : "MSSV*"}
        </Text>
      </View>
      <View className="justify-center mx-2">
        <Text className="text-white  ml-4 my-2 font-bold text-[18px]">
          Số điện thoại
        </Text>
        <Text className="bg-[#171717]  h-[54px] w-full  p-4 mb-2 rounded-[18px] text-gray-400">
          {user?.phoneNumber}
        </Text>
      </View>

      <View className="justify-center  mx-2">
        <Text className="text-white my-2 ml-4 font-bold text-[18px]">
          Vai trò
        </Text>
        <Text className="bg-[#171717]  h-[54px] w-full  p-4 mb-2 rounded-[18px] text-gray-400">
          {user?.roleName === "student" ? "Sinh viên" : user?.roleName}
        </Text>
      </View>
      {user?.cardUrl || user?.cardUrl.startsWith("firebase") ? (
        <View className="justify-center items-center px-4 mt-6">
          <Text className="text-white font-bold text-[18px]">Thẻ FPT</Text>
          {/* <Image
          source={{
            uri: user?.cardUrl || require("../../assets/images/profile.jpg"),
          }}
          className="h-[420px] w-full rounded-[12px] justify-center mt-6 "
        /> */}
          <Image
            source={
              { uri: user.cardUrl }
              // : require("../../assets/images/OIP.jpg")
            }
            className="h-[420px] w-full rounded-[12px] justify-center mt-6"
          />
        </View>
      ) : (
        <View></View>
      )}
      <View className="justify-center items-center">
        <TouchableOpacity
          onPress={() => router.push("/user/edit-profile")}
          className="bg-[#CAFF4C] justify-center items-center w-[220px] h-[50px] rounded-[25px] mt-[52px] mb-3"
        >
          <Text className="text-[#214C53] text-[18px]">Cập nhật thông tin</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    //   </SafeAreaView>
    // </SafeAreaProvider>
  );
}
