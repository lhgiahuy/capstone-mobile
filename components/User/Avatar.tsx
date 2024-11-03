import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/user";
import { User } from "@/constants/model/User";
interface AvatarProps {
  user: User;
}

export default function Avatar() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User>({
    queryKey: ["user"],
    queryFn: getUser,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

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
    <View className="relative">
      <Image
        // source={{ uri: user?.avatarUrl }}
        source={require("../../assets/images/profile.jpg")}
        className="h-[120px]  w-[120px] rounded-[80px] justify-center mt-[40px] "
      />
      <Pressable className="absolute bottom-0 right-2 p-1 rounded-full bg-gray-900">
        <Ionicons name="camera-outline" size={20} color={"white"} />
      </Pressable>
    </View>
  );
}
