import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import usePushNotifications from "@/lib/utils/push-notification";
import { useMutation } from "@tanstack/react-query";
import { Login } from "@/constants/model/User";
import { userLogin } from "@/api/auth";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { devicePushToken } = usePushNotifications();

  const mutation = useMutation({
    mutationFn: (loginData: Partial<Login>) => userLogin(loginData),
    onSuccess: () => {
      router.replace("/home");
      console.log("Thành công");
      Toast.show({
        type: "success",
        text1: "Đăng nhập thành công",
        text1Style: {
          fontSize: 18,
          fontWeight: "bold",
        },
      });
      setEmail("");
      setPassword("");
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Đăng nhập không thành công!",
        text2: "Vui lòng kiểm tra lại email hoặc mật khẩu",
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
  const handleLogin = () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Đăng nhập không thành công!",
        text2: "Vui lòng điền đầy đủ thông tin!",
        text1Style: {
          fontSize: 16,
          fontWeight: "bold",
        },
        text2Style: {
          fontSize: 14,
        },
      });
      return;
    }

    mutation.mutate({
      email,
      password,
      fcmToken: devicePushToken,
    });
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
        <Text className="text-4xl font-inter font-bold text-white text-center  ">
          Đăng nhập
        </Text>
        <Text className="text-center text-white font-lexend  text-lg mb-8 ">
          Đăng nhập tài khoản của bạn
        </Text>
        <View className="flex-row items-center border border-gray-400 rounded-[16px] px-4 py-2 my-2 mx-8  h-[56px]">
          <Icon name="user-o" size={20} color={"white"} />
          <TextInput
            className=" text-white ml-2  w-[250px] font-lexend"
            placeholder="Email"
            placeholderTextColor="white"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View className="flex-row items-center border border-gray-400 rounded-[16px] px-4 py-2 mt-4 mx-8 h-[56px]">
          <Icon name="lock" size={25} color={"white"} />
          <TextInput
            className=" text-white ml-2  w-[200px] font-lexend"
            placeholder="Mật khẩu"
            placeholderTextColor="white"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="px-4 py-1"
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={"#7f7d7d"}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="mt-2 self-end mr-10 "
          onPress={() => router.push("/(auth)/forgot-password")}
        >
          <Text className="text-white text-right font-lexend font-bold">
            Quên mật khẩu?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-[#CAFF4C] py-4 rounded-[32px] mt-4 w-[220px]  items-center justify-center"
          onPress={handleLogin}
        >
          <Text className="text-[#374E00] font-bold font-inter text-[20px]">
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;
