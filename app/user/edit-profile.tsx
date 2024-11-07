import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { getUser, updateUser } from "@/api/user";
import { User } from "@/constants/model/User";
import { useMutation, useQuery } from "@tanstack/react-query";

import UpdateModal from "@/components/User/UpdateModal";
import Avatar from "@/components/User/Avatar";

export default function EditProfile() {
  // const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User>({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [userName, setUserName] = useState(user?.username || "");
  const [avatarUrl, setavatarUrl] = useState(user?.avatarUrl || "");
  const [modalVisible, setModalVisible] = useState(false);

  const mutation = useMutation({
    mutationFn: (updatedUser: Partial<User>) => updateUser(updatedUser),
    onSuccess: (data) => {
      setModalVisible(true);
      console.log("User updated profile successfully:", data);

      // queryClient.setQueryData<User>(["user"], (oldData: User | undefined) => {
      //   if (oldData) {
      //     // Kết hợp oldData và dữ liệu mới để tạo ra dữ liệu người dùng đã cập nhật
      //     return { ...oldData, ...data }; // data là dữ liệu trả về từ API
      //   }
      //   return data; // Nếu không có oldData, trả về data mới
      // });
    },
    onError: (error) => {
      console.error("Failed to update user:", error);
    },
  });
  const handleSave = () => {
    mutation.mutate({
      username: userName,
      avatarUrl,
      phoneNumber,
    });
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
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
        <View className="justify-center items-center  mx-2">
          <Avatar />
        </View>
        <View className="justify-center mt-8  mx-2">
          <Text className="text-white  ml-4 my-2 font-bold text-[18px]">
            Tên người dùng
          </Text>
          <TextInput
            value={userName}
            onChangeText={setUserName}
            className="bg-[#171717]  h-[54px] w-full p-4 mb-2 rounded-[18px] text-gray-400"
          />
        </View>

        <View className="justify-center mx-2">
          <Text className="text-white  ml-4 my-2 font-bold text-[18px]">
            Số điện thoại
          </Text>
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            className="bg-[#171717]  h-[54px] w-full  p-4 mb-2 rounded-[18px] text-gray-400"
            // 171717
          />
        </View>

        <View className="justify-center items-center">
          <TouchableOpacity
            className="bg-[#CAFF4C] justify-center items-center w-[220px] h-[50px] rounded-[25px] mt-[60px] "
            onPress={handleSave}
          >
            <Text className="text-[#214C53] text-[18px]">Lưu thay đổi</Text>
          </TouchableOpacity>
        </View>
        <UpdateModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
