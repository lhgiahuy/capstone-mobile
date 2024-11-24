import { View, Text, Image, ImageBackground } from "react-native";
import React from "react";
import { NavOrganizerProps } from "@/constants/model/Organizer";
// import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "@tanstack/react-query";
import { Organizer } from "@/constants/model/Organizer";
import { getOrganizer } from "@/api/organizer";

export default function BannerOrganizer({ organizerId }: NavOrganizerProps) {
  console.log(organizerId);

  const { data, isLoading, error } = useQuery<Organizer, Error>({
    queryKey: ["organizer", organizerId],
    queryFn: () => getOrganizer(organizerId as string),
  });

  return (
    <View className="bg-white h-[360px]  mt-4 mx-2 rounded-[30px] items-center">
      <Image
        // source={require("../../assets/images/banner2.png")}
        source={{ uri: data?.avatarUrl }}
        className="h-[248px] w-[346px] rounded-[26px] "
      />

      <View className="flex-row">
        <View className="bg-gray-100 translate-y-[-60px] p-2  ml-2 rounded-[70px] justify-center items-center">
          <Image
            // source={require("@/assets/images/logo2.png")}
            source={{ uri: data?.avatarUrl }}
            className="h-[132px] w-[132px] rounded-[70px] "
          />
        </View>

        <View className="w-[180px] ml-2  my-4 mx-2">
          <Text className="text-[#228B22]  text-[18px] font-lexend  text-center">
            {data?.username}
          </Text>
          <Text className="text-[#228B22]  text-[18px]  font-lexend text-center">
            {data?.email}
          </Text>
        </View>
      </View>
    </View>
  );
}
