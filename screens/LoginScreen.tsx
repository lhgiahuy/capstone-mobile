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

const LoginScreen = () => {
  return (
    <ImageBackground
      source={require("../assets/images/event.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.greeting}>Xin Chào!</Text>
        <Text style={styles.subGreeting}>Đăng nhập tài khoản của bạn</Text>
        <View style={styles.box}>
          <Icon name="user-o" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="black"
          />
        </View>
        <View style={styles.box}>
          <Icon name="lock" size={25} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="mật khẩu"
            placeholderTextColor="black"
            secureTextEntry
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInButtonText}>Đăng nhập</Text>
        </TouchableOpacity>

        <Text style={styles.createAccount}>
          Bạn chưa có tài khoản?
          <Text style={styles.createText}>Đăng kí ngay</Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    padding: 20,
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Overlay màu đen với độ trong suốt
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
    color: "black",
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
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  forgotPassword: {
    color: "black",
    textAlign: "right",
    marginBottom: 30,
    fontSize: 16,
    fontWeight: "bold",
  },
  signInButton: {
    backgroundColor: "#CC3366",
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
    color: "#FF7F50",
    fontWeight: "bold",
  },
});

export default LoginScreen;
