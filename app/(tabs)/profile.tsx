import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import VerifyInfo from "@/components/User/VerifyInfo";
import Setting from "@/components/User/Setting";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "@/api/user";
import { User } from "@/constants/model/User";
import Avatar from "@/components/User/Avatar";

export default function Profile() {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User>({
    queryKey: ["user"],
    queryFn: getUser,
  });
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");

  const handleAvatarChange = (url: string) => {
    setAvatarUrl(url);
  };

  const onRefresh = async () => {
    setRefreshing(true);

    queryClient.invalidateQueries({
      queryKey: ["user"],
    });

    setRefreshing(false);
  };

  if (isLoading)
    return (
      <View className="flex-1 bg-primary justify-center">
        <Text className="text-white text-center mb-8 font-bold text-[16px]">
          Dữ liệu đang chạy vui lòng chờ trong giây lát
        </Text>
        <ActivityIndicator size="large" />
      </View>
    );

  if (error) {
    return (
      <View className="flex-1 bg-primary justify-center">
        <Text className="text-white font-bold items-center">
          Dữ liệu đang chạy xin vui lòng chờ trong giây lát!
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-primary "
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="flex-1  items-center mb-2">
        <Avatar onAvatarChange={handleAvatarChange} />
        <Text className=" text-white text-[20px] font-bold font-inter w-[260px] h-auto text-center mt-6 ">
          {user?.username}
        </Text>
        <VerifyInfo />
        <Setting />
      </View>
    </ScrollView>
  );
}
