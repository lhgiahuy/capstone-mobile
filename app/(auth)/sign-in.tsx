import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

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
    <ImageBackground
      source={require("../../assets/images/light-event.jpg")}
      className="flex-1 justify-center"
      resizeMode="cover"
    >
      <View className="flex-1 justify-center bg-transparent p-6">
        <Text className="text-4xl font-bold text-gray-300 text-center mt-2">
          Xin chào tới Fvent!
        </Text>
        <Text className="text-center text-white text-lg mt-2">
          Đăng nhập tài khoản của bạn
        </Text>
        <View className="flex-row items-center border border-gray-400 rounded-lg px-4 py-2 mt-4">
          <Icon name="user-o" size={20} color={"white"} />
          <TextInput
            className=" text-white ml-2  w-[250px]"
            placeholder="Email"
            placeholderTextColor="white"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View className="flex-row items-center border border-gray-400 rounded-lg px-4 py-2 mt-4">
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

        <TouchableOpacity>
          <Text className="text-white text-right mt-2 font-bold">
            Quên mật khẩu?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-black py-4 rounded-lg mt-4 items-center"
          onPress={handleLogin}
        >
          <Text className="text-white font-bold text-lg">Đăng nhập</Text>
        </TouchableOpacity>

        <View className="flex-row mt-4 justify-center">
          <Text className="text-center text-gray-900">
            Bạn chưa có tài khoản?
          </Text>
          <Text className="text-white font-bold ml-1 ">
            <Link href="/sign-up">Đăng ký ngay</Link>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignIn;
