import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const SignUp = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/light-event.jpg")}
      className="flex-1 justify-center"
      resizeMode="cover"
    >
      <View className="flex-1 justify-center  p-6 bg-transparent ">
        <Text className="text-4xl font-bold text-gray-300 text-center mt-2">
          Tạo tài khoản
        </Text>

        <View className="my-2">
          <Text className="text-lg font-bold text-white mb-2">Gmail</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-3 py-2 text-white"
            placeholder="Nhập gmail"
            placeholderTextColor="white"
          />
        </View>

        <View className="my-2">
          <Text className="text-lg font-bold text-white mb-2">Tên</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-3 py-2  text-white"
            placeholder="Nhập tên người dùng"
            placeholderTextColor="white"
          />
        </View>

        <View className="my-2">
          <Text className="text-lg font-bold text-white mb-2">Mật khẩu</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-3 py-2  text-white"
            placeholder="Nhập mật khẩu"
            placeholderTextColor="white"
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity className="bg-black py-4 rounded-lg mt-8 items-center">
          <Text className="text-white font-bold text-lg">Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SignUp;
