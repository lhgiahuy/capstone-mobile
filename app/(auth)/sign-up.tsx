import { Register } from "@/constants/model/User";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { userRegister } from "@/api/auth";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const mutation = useMutation({
    mutationFn: (registerData: Partial<Register>) => userRegister(registerData),
    onSuccess: (data) => {
      console.log("User registered successfully:", data);
      router.push("/all-done");

      setTimeout(() => {
        router.push("/sign-in");
      }, 3000);
    },
    onError: (error) => {
      console.error("Failed to update user:", error);
    },
  });
  const handleRegister = () => {
    if (password === confirmPassword) {
      mutation.mutate({
        username,
        email,
        password,
        phoneNumber,
        role: "student",
      });
    } else {
      console.error("Mật khẩu không đúng với xác nhận mật khẩu");
    }
  };

  return (
    <View className="bg-[#CAFF4C] flex-1 justify-center  ">
      <View className="h-[30%] justify-center ml-4">
        <Ionicons
          name="arrow-back-circle-outline"
          size={40}
          onPress={() => router.back()}
        />
        <Text className="text-[56px] font-bold text-[#374E00] text-center  ">
          FVENT
        </Text>
      </View>

      <View className="bg-black h-[70%] rounded-tl-[92px] justify-center items-center ">
        <Text className="text-4xl font-inter font-bold text-white text-center  ">
          Tạo tài khoản
        </Text>
        <Text className="text-center text-white font-inter  text-[16px] mb-8 ">
          Đăng kí tài khoản bằng email của bạn
        </Text>
        <View className="flex-row items-center border border-gray-400 rounded-[16px] px-4 py-2 mt-3 mx-8">
          <Icon name="user-o" size={20} color={"white"} />
          <TextInput
            className=" text-white ml-2  w-[250px]"
            placeholder="Tên người dùng"
            placeholderTextColor="white"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View className="flex-row items-center border border-gray-400 rounded-[16px] px-4 py-2 mt-3 mx-8">
          <Ionicons name="mail-outline" size={20} color={"white"} />
          <TextInput
            className=" text-white ml-2  w-[250px]"
            placeholder="Email"
            placeholderTextColor="white"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View className="flex-row items-center border border-gray-400 rounded-[16px] px-4 py-2 mt-3 mx-8">
          <Ionicons name="call-outline" size={20} color={"white"} />
          <TextInput
            className=" text-white ml-2  w-[250px]"
            placeholder="Số điện thoại"
            placeholderTextColor="white"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        <View className="flex-row items-center border border-gray-400 rounded-[16px] px-4 py-2 mt-3 mx-8">
          <Icon name="lock" size={25} color={"white"} />
          <TextInput
            className=" text-white ml-2  w-[250px]"
            placeholder="Mật khẩu"
            placeholderTextColor="white"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View className="flex-row items-center border border-gray-400 rounded-[16px] px-4 py-2 my-3 mx-8">
          <Icon name="lock" size={25} color={"white"} />
          <TextInput
            className=" text-white ml-2  w-[250px]"
            placeholder="Xác nhận mật khẩu"
            placeholderTextColor="white"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity
          className="bg-[#CAFF4C] py-4 rounded-[32px] mt-4 w-[220px]  items-center justify-center"
          onPress={handleRegister}
        >
          <Text className="text-[#374E00] font-bold text-[20px]">Đăng kí</Text>
        </TouchableOpacity>

        {/* <View className="flex-row mt-4 justify-center">
        <Text className="text-center text-gray-900">
          Bạn chưa có tài khoản?
        </Text>
        <Text className="text-white font-bold  ">
          <Link href="/sign-up">Đăng ký ngay</Link>
        </Text>
      </View> */}
      </View>
    </View>
  );
};

export default SignUp;
