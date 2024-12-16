import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Account() {
  // const { data, isLoading, error } = useQuery<User>({
  //   queryKey: ["user"],
  //   queryFn: getUser,
  // });

  // if (isLoading) {
  //   return <Text>Loading...</Text>;
  // }

  // if (error) {
  //   return (
  //     <View className="flex-1 bg-primary">
  //       <Text>Error loading user data</Text>
  //     </View>
  //   );
  // }

  return (
    <View className=" bg-black flex-1 ">
      {/* {data?data.map((user) => ( */}
      <View className="mt-8 items-center ">
        <TouchableOpacity
          className="bg-[#1F1F1F] flex-row w-[324px] p-4 rounded-[12px]  items-center justify-between "
          onPress={() => router.push(`/user/edit-profile`)}
        >
          <View className="flex-row items-center">
            <Ionicons
              name="person-outline"
              color={"white"}
              size={25}
              className=""
            />
            <Text className="text-white text-[18px] font-bold text-center ml-2 ">
              Chỉnh sửa hồ sơ
            </Text>
          </View>

          <Ionicons name="chevron-forward-outline" color={"white"} size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#1F1F1F] flex-row w-[324px] p-4 rounded-[12px]  items-center justify-between mt-4"
          onPress={() => router.push("/user/change-password")}
        >
          <View className="flex-row items-center">
            <Ionicons
              name="lock-closed"
              color={"white"}
              size={25}
              className=""
            />
            <Text className="text-white text-[18px] font-bold text-center ml-2 ">
              Đổi mật khẩu
            </Text>
          </View>

          <Ionicons name="chevron-forward-outline" color={"white"} size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#1F1F1F] flex-row w-[324px] p-4 rounded-[12px]  items-center justify-between mt-4"
          onPress={() => router.push(`/user/infor`)}
        >
          <View className="flex-row items-center">
            <Ionicons
              name="navigate-circle"
              color={"white"}
              size={30}
              className=""
            />
            <Text className="text-white text-[18px] font-bold text-center ml-2 ">
              Thông tin cá nhân
            </Text>
          </View>
          <Ionicons name="chevron-forward-outline" color={"white"} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
