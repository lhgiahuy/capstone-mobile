import { View, Text, ActivityIndicator, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ReportDetail } from "@/constants/model/Report";
import { getUserReport } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";

export default function Dashboard() {
  const { data, isLoading, error } = useQuery<ReportDetail, Error>({
    queryKey: ["report"],
    queryFn: () => getUserReport(),
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
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <ActivityIndicator size="large" color="#CAFF4C" />
        <Text className="text-white mt-2">
          Sự kiện tải lên đang gặp vấn đề...
        </Text>
      </SafeAreaView>
    );
  }

  if (!data?.organizers || data.organizers.length === 0) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <Text className="text-white text-lg">
          Chưa có thống kê về sự kiện của bạn
        </Text>
      </SafeAreaView>
    );
  }
  return (
    <ScrollView className="flex-1 bg-primary">
      {/* <Text className="text-white">dashboard</Text> */}
      <Text className="text-white text-[16px] font-lexend ml-3 my-3">
        Tổng sự kiện đăng ký: {data.noOfEvents}
      </Text>
      {/* <Text className="text-white font-lexend">{data.noOfOrganizers}</Text> */}
      {data?.organizers?.map((report) => (
        <View className=" flex-row my-3 p-4" key={report.userId}>
          <Image
            source={{
              uri:
                report?.avatarUrl || require("../../assets/images/profile.jpg"),
            }}
            className="h-[100px] w-[100px] rounded-[18px] border-gray-400 border-[1px]"
          />
          <View className="items-center justify-around  ml-8">
            <Text className="font-lexend text-[16px] text-white">
              {report.username}
            </Text>
            <View className="flex-row justify-center items-center">
              <Ionicons name="ticket-outline" size={20} color={"white"} />
              <Text className="font-lexend text-white text-[18px] ml-2">
                {report.noOfEvents}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
