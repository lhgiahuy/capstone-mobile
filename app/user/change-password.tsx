import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { User } from "@/constants/model/User";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, updateUser } from "@/api/user";
import UpdateModal from "@/components/User/UpdateModal";
import { Ionicons } from "@expo/vector-icons";

export default function ChangePassword() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User>({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: (updatedUser: Partial<User>) => updateUser(updatedUser),
    onSuccess: (data) => {
      setModalVisible(true);
      console.log("User updated password successfully:", data);
    },
    onError: (error) => {
      console.error("Failed to update user:", error);
    },
  });

  const handleSave = () => {
    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }
    mutation.mutate({
      username: user?.username || "",
      avatarUrl: user?.avatarUrl || "",
      email: user?.email || "",
      password,
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phoneNumber: user?.phoneNumber || "",
      cardUrl: user?.cardUrl || "",
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
        <View className="justify-center mt-[60px] mx-2">
          <Text className="text-white  ml-4 my-2 font-bold text-[18px]">
            Mật khẩu mới
          </Text>
          <View className="flex-row items-center bg-[#171717] h-[54px] w-full mb-2 rounded-[18px]">
            <TextInput
              value={password}
              onChangeText={setPassword}
              className="flex-1 p-4 text-gray-400  "
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="p-4"
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
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
        <UpdateModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
