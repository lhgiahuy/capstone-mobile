import { Register } from "@/constants/model/User";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { userRegister } from "@/api/auth";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import { AxiosError, isAxiosError } from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [studentId, setStudentId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: (registerData: Partial<Register>) => userRegister(registerData),
    onSuccess: (data) => {
      console.log("User registered successfully:", data);
      Toast.show({
        type: "success",
        text1: "Đăng kí tài khoản thành công",
        text2: "Vui lòng kiểm tra email để kích hoạt tài khoản!",
        visibilityTime: 5000,
        text1Style: {
          fontSize: 18,
          fontWeight: "bold",
        },
        text2Style: {
          fontSize: 14,
        },
      });
      router.push("/all-done");
      setTimeout(() => {
        router.push("/sign-in");
      }, 5000);
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setStudentId("");
    },
    onError: (error) => {
      // cacth message error
      if (isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response) {
          const errorMessage =
            axiosError.response.data?.error || "Unknown error";
          console.log(errorMessage);
          return Toast.show({
            type: "error",
            text1: "Đăng ký không thành công!",
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
      Toast.show({
        type: "error",
        text1: "Đăng ký không thành công!",
        text2: "Email hoặc MSSV của bạn đã được đăng ký!",
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
  const handleRegister = () => {
    if (!username || !email || !password || !confirmPassword || !studentId) {
      Toast.show({
        type: "error",
        text1: "Đăng ký không thành công!",
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

    // validate password
    if (password.length < 8) {
      Toast.show({
        type: "error",
        text1: "Đăng ký không thành công!",
        text2: "Mật khẩu phải có ít nhất 8 ký tự!",
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

    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Đăng ký không thành công",
        text2: "Mật khẩu không khớp với xác nhận mật khẩu!",
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
      username,
      email,
      password,
      phoneNumber: "",
      studentId,
      role: "student",
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
        <Text className="text-4xl font-inter font-bold  text-white text-center  ">
          Tạo tài khoản
        </Text>
        <Text className="text-center font-lexend text-white  text-[16px] mb-2 ">
          Đăng ký tài khoản bằng email của bạn
        </Text>
        <View className="flex-row items-center border border-gray-400 rounded-[16px] h-[48px] px-4 py-1 mt-2 mx-8">
          <Icon name="user-o" size={25} color={"white"} />
          <TextInput
            className=" text-white ml-2  w-[250px] font-lexend"
            placeholder="Tên người dùng"
            placeholderTextColor="white"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View className="flex-row items-center border border-gray-400 rounded-[16px] h-[48px] px-4 py-1 mt-2 mx-8">
          <Ionicons name="mail-outline" size={25} color={"white"} />
          <TextInput
            className=" text-white ml-2  w-[250px] font-lexend"
            placeholder="Email"
            placeholderTextColor="white"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View className="flex-row items-center border border-gray-400 rounded-[16px] h-[48px] px-4 py-1 mt-2 mx-8">
          <Ionicons name="id-card-outline" size={25} color={"white"} />
          <TextInput
            className=" text-white ml-2 w-[250px] font-lexend"
            placeholder="Mã số sinh viên"
            placeholderTextColor="white"
            value={studentId}
            onChangeText={setStudentId}
          />
        </View>
        <View className="flex-row items-center border border-gray-400 rounded-[16px] h-[48px] px-4 py-1 mt-2 mx-8">
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
            className="px-5 "
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={"#7f7d7d"}
            />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center border border-gray-400 rounded-[16px] h-[48px] px-4 py-1 my-2 mx-8">
          <Icon name="lock" size={25} color={"white"} />
          <TextInput
            className=" text-white ml-2  w-[200px] font-lexend"
            placeholder="Xác nhận mật khẩu"
            placeholderTextColor="white"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            className="px-5"
          >
            <Ionicons
              name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={"#7f7d7d"}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="bg-[#CAFF4C] py-3 rounded-[32px] mt-3 w-[220px]  items-center justify-center"
          onPress={handleRegister}
        >
          <Text className="text-[#374E00] font-bold font-inter text-[20px]">
            Đăng ký
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
