import { View, Text, Pressable, Image, Alert } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Organizer } from "@/constants/model/Organizer";
import { getOrganizer } from "@/api/organizer";

export interface OrganizerProps {
  organizerName: string;
  organizerId: string;
}

export default function CardOrganizer({
  organizerName,
  organizerId,
}: OrganizerProps) {
  const { data, isLoading, error } = useQuery<Organizer, Error>({
    queryKey: ["organizer", organizerId],
    queryFn: () => getOrganizer(organizerId as string),
  });
  const NavInforOrganizer = (organizerId: string) => {
    if (!organizerId) {
      Alert.alert("Thông báo", "Không tìm thấy thông tin tổ chức.");
    } else {
      router.push({
        pathname: "/organizer/infor",
        params: { organizerId: organizerId },
      });
    }
  };
  return (
    <View className="bg-white w-full rounded-[24px] p-4 mt-4 mb-2">
      <Text className="font-bold text-[17px] mb-2">Ban tổ chức</Text>
      <View className="flex-row justify-around items-center">
        <Pressable onPress={() => NavInforOrganizer(organizerId)}>
          <Image
            source={{ uri: data?.avatarUrl }}
            className="h-[100px] w-[100px] rounded-[60px]"
          />
        </Pressable>

        <Text className="ml-6 font-bold w-[120px] text-center text-[20px]">
          {organizerName}
        </Text>
      </View>
    </View>
  );
}
