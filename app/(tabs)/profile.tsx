import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import VerifyInfo from "@/components/User/VerifyInfo";
import Setting from "@/components/User/Setting";

import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/user";
import { User } from "@/constants/model/User";
import Avatar from "@/components/User/Avatar";

export default function Profile() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User>({
    queryKey: ["user"],
    queryFn: getUser,
  });

  if (isLoading) return <ActivityIndicator size="large" />;

  if (error) {
    return (
      <View className="flex-1 bg-primary justify-center">
        <Text className="text-white font-bold items-center">
          Dữ liệu đang chạy xin vui lòng chờ trong giây lát
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-primary ">
      <View className="flex-1  items-center mb-2">
        <Avatar />
        <Text className=" text-white text-[18px] font-bold w-[260px] h-auto text-center mt-2 ">
          {user?.username}
        </Text>
        <Text className=" text-gray-400 text-[16px]  w-[260px] h-auto text-center">
          Hồ Chí Minh , Việt Nam
        </Text>

        <VerifyInfo />
        <Setting />
      </View>
    </ScrollView>
  );
}
