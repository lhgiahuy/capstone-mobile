import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { getUser, updateUser } from "@/api/user";
import { User } from "@/constants/model/User";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import UpdateModal from "@/components/User/UpdateModal";

export default function EditProfile() {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User>({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");

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
      avatarUrl: user?.avatarUrl || "",
      username: user?.username || "",
      cardUrl: user?.cardUrl || "",
      password: user?.password || "",
      firstName,
      lastName,
      email,
      phoneNumber,
      campus: user?.campus || "",
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
        <View className="justify-center  mt-8 mx-2">
          <Text className="text-white  ml-4 my-2 font-bold text-[18px]">
            Họ
          </Text>
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            className="bg-[#171717]  h-[54px] w-full p-4 mb-2 rounded-[18px] text-gray-400"
          />
        </View>
        <View className="justify-center  mx-2">
          <Text className="text-white my-2 ml-4 font-bold text-[18px]">
            Tên
          </Text>
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            className="bg-[#171717]  h-[54px] w-full  p-4 mb-2 rounded-[18px] text-gray-400"
          />
        </View>

        <View className="justify-center mx-2">
          <Text className="text-white  ml-4 my-2 font-bold text-[18px]">
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            className="bg-[#171717]  h-[54px] w-full  p-4 mb-2 rounded-[18px] text-gray-400"
            // 171717
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
            keyboardType="numeric"
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
