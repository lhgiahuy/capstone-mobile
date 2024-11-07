import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
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
    <SafeAreaProvider className="flex-1 bg-primary  ">
      <SafeAreaView>
        <View className="justify-center  mt-8 mx-2">
          <Text className="text-white  ml-4 my-2 font-bold text-[18px]">
            Tên tài khoản
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
        <View className="justify-center items-center">
          <TouchableOpacity
            onPress={() => router.push("/user/edit-profile")}
            className="bg-[#CAFF4C] justify-center items-center w-[220px] h-[50px] rounded-[25px] mt-[60px]"
          >
            <Text className="text-[#214C53] text-[18px]">
              Cập nhật thông tin
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}