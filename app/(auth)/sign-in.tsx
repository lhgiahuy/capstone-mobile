import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { Link } from "expo-router";
const LoginScreen = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/light-event.jpg")}
      className="flex-1 justify-center"
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View className="flex-1 justify-center bg-transparent p-6">
        <Text className="text-[32px] font-bold text-gray-300 text-center mt-2 ">
          Xin Chào tới Fvent!
        </Text>
        <Text style={styles.subGreeting}>Đăng nhập tài khoản của bạn</Text>
        <View style={styles.box}>
          <Icon name="user-o" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="white"
          />
        </View>
        <View style={styles.box}>
          <Icon name="lock" size={25} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="mật khẩu"
            placeholderTextColor="white"
            secureTextEntry
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInButtonText}>
            <Link href="/home">Đăng nhập</Link>
          </Text>
        </TouchableOpacity>

        <Text style={styles.createAccount}>
          Bạn chưa có tài khoản?
          <Text
            style={styles.createText}
            // onPress={() => navigation.navigate("Register")}
          >
            <Link href="/sign-up">Đăng kí ngay</Link>
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  greeting: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#000",
    marginTop: 50,
    textAlign: "center",
  },
  subGreeting: {
    fontSize: 18,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
    color: "white",
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  forgotPassword: {
    color: "white",
    textAlign: "right",
    marginBottom: 30,
    fontSize: 16,
    fontWeight: "bold",
  },
  signInButton: {
    backgroundColor: "black",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  createAccount: {
    marginTop: 20,
    textAlign: "center",
    color: "#666",
  },
  createText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default LoginScreen;
