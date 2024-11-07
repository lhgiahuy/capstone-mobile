import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";

const SignIn = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      router.push("/home");
      console.log("Thành công");
    } else {
      Alert.alert(
        "Đăng nhập thất bại",
        "Vui lòng kiểm tra email và mật khẩu của bạn."
      );
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

      <View className="bg-black h-[70%] rounded-tl-[92px] justify-center items-center">
        <Text className="text-4xl font-inter font-bold text-white text-center  ">
          Đăng nhập
        </Text>
        <Text className="text-center text-white font-inter  text-lg mb-8 ">
          Đăng nhập tài khoản của bạn
        </Text>
        <View className="flex-row items-center border border-gray-400 rounded-[16px] px-4 py-2 my-2 mx-8">
          <Icon name="user-o" size={20} color={"white"} />
          <TextInput
            className=" text-white ml-2  w-[250px]"
            placeholder="Email"
            placeholderTextColor="white"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View className="flex-row items-center border border-gray-400 rounded-[16px] px-4 py-2 mt-4 mx-8">
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

        <TouchableOpacity className="mt-2 self-end mr-10 ">
          <Text className="text-white text-right  font-bold">
            Quên mật khẩu?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-[#CAFF4C] py-4 rounded-[32px] mt-4 w-[220px]  items-center justify-center"
          onPress={handleLogin}
        >
          <Text className="text-[#374E00] font-bold text-[20px]">
            Đăng nhập
          </Text>
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

export default SignIn;
