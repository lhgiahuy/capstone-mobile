import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { getUser, updateUser } from "@/api/user";
import { User } from "@/constants/model/User";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Avatar from "@/components/User/Avatar";
import SuccessModal from "@/components/Modal/SuccessModal";
import Toast from "react-native-toast-message";
import { isAxiosError } from "axios";

export default function EditProfile() {
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
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");
  const [studentId, setStudentId] = useState(user?.studentId);
  const [modalVisible, setModalVisible] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (updatedUser: Partial<User>) => updateUser(updatedUser),
    onSuccess: (data) => {
      setModalVisible(true);
      console.log("User updated profile successfully:", data);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (error) => {
      console.error("Failed to update user:", error);
      if (isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response) {
          const errorMessage =
            axiosError.response.data?.error || "Unknown error";
          console.log(errorMessage);
          return Toast.show({
            type: "error",
            text1: "Cập nhật không thành công!",
            text2: errorMessage,
            text1Style: {
              fontSize: 16,
              fontWeight: "bold",
            },
            text2Style: {
              fontSize: 14,
            },
          });
        }
      }
    },
  });
  const handleSave = () => {
    if (!userName.trim()) {
      Toast.show({
        type: "error",
        text1: "Họ và tên không được để trống!",

        text1Style: {
          fontSize: 16,
          fontWeight: "bold",
        },
      });
      return;
    }

    if (phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
      Toast.show({
        type: "error",
        text1: "Vui lòng nhập đúng số điện thoại!",
        text1Style: {
          fontSize: 16,
          fontWeight: "bold",
        },
      });
      return;
    }

    if (!studentId || !studentId.trim()) {
      Toast.show({
        type: "error",
        text1: "MSSV không được để trống!",
        text1Style: {
          fontSize: 16,
          fontWeight: "bold",
        },
      });
      return;
    }

    mutation.mutate({
      username: userName,
      avatarUrl,
      phoneNumber,
      studentId: studentId,
    });
  };

  const handleAvatarChange = (url: string) => {
    setAvatarUrl(url);
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
          <Avatar onAvatarChange={handleAvatarChange} />
        </View>
        <View className="justify-center mt-8  mx-2">
          <Text className="text-white  ml-4 my-2 font-bold text-[18px]">
            Họ và tên
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
          />
        </View>
        {/* { user?.verifyStatus==="Verified" } */}
        {/* <View className="justify-center mx-2">
          <Text className="text-white  ml-4 my-2 font-bold text-[18px]">
            Mã số sinh viên
          </Text>
          <TextInput
            value={studentId}
            onChangeText={setStudentId}
            className="bg-[#171717]  h-[54px] w-full  p-4 mb-2 rounded-[18px] text-gray-400"
          />
        </View> */}
        {user?.verifyStatus !== "Verified" && (
          <View className="justify-center mx-2">
            <Text className="text-white ml-4 my-2 font-bold text-[18px]">
              Mã số sinh viên
            </Text>
            <TextInput
              value={studentId}
              onChangeText={setStudentId}
              className="bg-[#171717] h-[54px] w-full p-4 rounded-[18px] text-gray-400"
            />
          </View>
        )}

        {user?.verifyStatus === "Verified" && (
          <View className="justify-center mx-2">
            <Text className="text-gray-400 ml-4 my-2 font-lexend">
              <Text className="text-white font-bold text-[18px]">
                Mã số sinh viên
              </Text>
              (Tài khoản của bạn đã được xác minh)
            </Text>
            <TextInput
              value={studentId}
              editable={false}
              className="bg-[#171717] h-[54px] w-full p-4 rounded-[18px] text-gray-600"
            />
          </View>
        )}
        <View className="justify-center items-center">
          <TouchableOpacity
            className="bg-[#CAFF4C] justify-center items-center w-[220px] h-[50px] rounded-[25px] mt-[52px] "
            onPress={handleSave}
          >
            <Text className="text-[#214C53] text-[18px]">Lưu thay đổi</Text>
          </TouchableOpacity>
        </View>
        <SuccessModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          message=" Thông tin của bạn đã được cập nhật thành công!"
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
