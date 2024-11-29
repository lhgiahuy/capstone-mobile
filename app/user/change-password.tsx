import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Password } from "@/constants/model/User";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/api/user";

import { Ionicons } from "@expo/vector-icons";
import { AxiosError } from "axios";
import SuccessModal from "@/components/Modal/SuccessModal";
import Toast from "react-native-toast-message";

export default function ChangePassword() {
  // const {
  //   data: user,
  //   isLoading,
  //   error,
  // } = useQuery<User>({
  //   queryKey: ["user"],
  //   queryFn: getUser,
  // });

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: (passwordData: Partial<Password>) =>
      changePassword(passwordData),
    onSuccess: (data) => {
      setModalVisible(true);
      console.log("User updated password successfully:", data);
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        // console.error("Failed to update password:", error);
        Toast.show({
          type: "error",
          text1: "Mật khẩu cũ không chính xác!",
          text1Style: {
            fontSize: 16,
            fontWeight: "bold",
          },
        });
      } else {
        // console.error("Failed to update password:", error);
        Toast.show({
          type: "error",
          text1: "Cập nhật mật khẩu thất bại!",
          text1Style: {
            fontSize: 16,
            fontWeight: "bold",
          },
        });
      }
    },
  });

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Mật khẩu và xác nhận mật khẩu không khớp!",
        text1Style: {
          fontSize: 16,
          fontWeight: "bold",
        },
      });
      return;
    }

    mutation.mutate({
      oldPassword,
      newPassword,
    });
  };

  return (
    <SafeAreaProvider className="flex-1 bg-primary  ">
      <SafeAreaView>
        <View className="justify-center mt-[60px] mx-2">
          <Text className="text-white  ml-4 my-2 font-bold text-[18px]">
            Mật khẩu cũ
          </Text>
          <View className="flex-row items-center bg-[#171717] h-[54px] w-full mb-2 rounded-[18px]">
            <TextInput
              value={oldPassword}
              onChangeText={setOldPassword}
              className="flex-1 p-4 text-gray-400  "
              secureTextEntry={!showOldPassword}
            />
            <TouchableOpacity
              onPress={() => setShowOldPassword(!showOldPassword)}
              className="p-4"
            >
              <Ionicons
                name={showOldPassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color={"#7f7d7d"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="justify-center mx-2">
          <Text className="text-white  ml-4 my-2 font-bold text-[18px]">
            Mật khẩu mới
          </Text>
          <View className="flex-row items-center bg-[#171717] h-[54px] w-full mb-2 rounded-[18px]">
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              className="flex-1 p-4 text-gray-400  "
              secureTextEntry={!showNewPassword}
            />
            <TouchableOpacity
              onPress={() => setShowNewPassword(!showNewPassword)}
              className="p-4"
            >
              <Ionicons
                name={showNewPassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color={"#7f7d7d"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="justify-center mx-2">
          <Text className="text-white  ml-4 my-2 font-bold text-[18px]">
            Xác nhận mật khẩu
          </Text>
          <View className="flex-row items-center bg-[#171717] h-[54px] w-full mb-2 rounded-[18px]">
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              className="flex-1 p-4 text-gray-400  "
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              className="p-4"
            >
              <Ionicons
                name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color={"#7f7d7d"}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="justify-center items-center">
          <TouchableOpacity
            className="bg-[#CAFF4C] justify-center items-center w-[220px] h-[50px] rounded-[25px] mt-[60px] "
            onPress={handleSave}
          >
            <Text className="text-[#214C53] text-[18px]">Lưu thay đổi</Text>
          </TouchableOpacity>
        </View>
        <SuccessModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          message="Mật khẩu của bạn đã được cập nhật thành công!"
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
