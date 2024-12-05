import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { router, useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/api/user";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const mutation = useMutation({
    mutationFn: (email: string) => forgotPassword(email),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Gửi yêu cầu thành công",
        text2: "Vui lòng kiểm tra email của bạn để đặt lại mật khẩu!",
        visibilityTime: 5000,
        text1Style: {
          fontSize: 16,
          fontWeight: "bold",
        },
        text2Style: {
          fontSize: 12,
        },
      });
      router.push("/sign-in");
      setEmail("");
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Gửi yêu cầu không thành công",
        text2: "Vui lòng kiểm tra lại email của bạn!",
        text1Style: {
          fontSize: 16,
          fontWeight: "bold",
        },
        text2Style: {
          fontSize: 14,
        },
      });
    },
  });

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Vui lòng điền đầy đủ thông tin!",
        text1Style: {
          fontSize: 16,
          fontWeight: "bold",
        },
      });
      return;
    }
    if (!isValidEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Email không hợp lệ!",
        text2: "Vui lòng nhập email hợp lệ.",
        text1Style: { fontSize: 16, fontWeight: "bold" },
        text2Style: { fontSize: 14 },
      });
      return;
    }
    mutation.mutate(email);
  };

  return (
    <View className="bg-[#CAFF4C] flex-1 justify-center  ">
      <View className="h-[30%] justify-center ml-4">
        <Ionicons
          name="arrow-back-circle-outline"
          size={40}
          onPress={() => router.back()}
        />
        <Text className="text-[56px] font-bold font-inter text-[#374E00] text-center  ">
          FVENT
        </Text>
      </View>

      <View className="bg-black h-[70%] rounded-tl-[92px] justify-center items-center ">
        <Text className="text-4xl font-inter font-bold text-[#CAFF4C] text-center mb-3">
          Quên mật khẩu
        </Text>
        <Text className="text-center text-white font-lexend  text-lg mb-8 ">
          Vui lòng nhập email tài khoản của bạn để đặt lại mật khẩu
        </Text>
        <View className="flex-row items-center border border-gray-400 rounded-[16px] px-4 py-2 my-8 mx-8  h-[56px]">
          <Icon name="user-o" size={20} color={"white"} />
          <TextInput
            className=" text-white ml-2  w-[250px] font-lexend"
            placeholder="Email"
            placeholderTextColor="white"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <TouchableOpacity
          className="bg-[#CAFF4C] py-4 rounded-[32px] mt-4 w-[220px]  items-center justify-center"
          onPress={handleForgotPassword}
        >
          <Text className="text-[#374E00] font-bold font-inter text-[20px]">
            Gửi yêu cầu
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;
