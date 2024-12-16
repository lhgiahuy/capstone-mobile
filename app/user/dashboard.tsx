import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ReportDetail } from "@/constants/model/Report";
import { getUserReport } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

export default function Dashboard() {
  const { data, isLoading, error } = useQuery<ReportDetail, Error>({
    queryKey: ["report"],
    queryFn: () => getUserReport(),
  });

  const NavInforOrganizer = (organizerId: string) => {
    if (!organizerId) {
      Toast.show({
        type: "error",
        text1: "Thông báo",
        text2: "Không tìm thấy thông tin tổ chức",
        text1Style: {
          fontSize: 16,
          fontWeight: "bold",
        },
        text2Style: {
          fontSize: 14,
        },
      });
    } else {
      router.push({
        pathname: "/organizer/infor",
        params: { organizerId: organizerId },
      });
    }
  };
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
    <ScrollView className="flex-1 bg-primary p-1">
      <Text className="text-white text-[16px] font-lexend ml-3 mt-3">
        Số lần đã đăng ký : {data.noOfEvents}
      </Text>
      <Text className="text-white text-[16px] font-lexend ml-3 my-3">
        Số lần tham gia : {data.noOfCheckIn}
      </Text>

      {data?.organizers?.map((report) => (
        <Pressable
          className="flex-row mt-5 mb-2 p-1 justify-center items-center bg-[#1F1F1F] rounded-[12px]"
          key={report.userId}
          onPress={() => NavInforOrganizer(report.userId)}
        >
          <Image
            source={{
              uri:
                report?.avatarUrl || require("../../assets/images/profile.jpg"),
            }}
            className="h-[120px] w-[120px] rounded-[18px] border-gray-400 border-[1px] "
          />
          <View className="items-center justify-around  p-3 w-[230px] ">
            <Text className="font-lexend text-[18px] text-white mb-3">
              {report.username}
            </Text>
            <View className="flex-row justify-center items-center px-1 my-1">
              <Text className="font-lexend text-white text-[16px] mr-1">
                Đăng ký: {report.noOfEvents}
              </Text>
              <Ionicons name="checkmark-outline" size={20} color={"#CAFF4C"} />
            </View>
            <View className="flex-row justify-center items-center px-1">
              <Text className="font-lexend text-white text-[16px] mr-1">
                Tham gia: {report.noOfCheckIn}
              </Text>
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color={"#CAFF4C"}
              />
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}
