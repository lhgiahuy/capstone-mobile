import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

const SignUp = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/light-event.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.header}>Đăng ký tài khoản</Text>

        <View style={styles.box}>
          <Text style={styles.label}>Gmail</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập gmail"
            placeholderTextColor="black"
          />
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>Tên</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên người dùng"
            placeholderTextColor="black"
          />
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>Mật khẩu</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập mật khẩu"
            placeholderTextColor="black"
            secureTextEntry={true}
          />
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>Nhập lại mật khẩu</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập lại mật khẩu"
            placeholderTextColor="black"
            secureTextEntry={true}
          />
        </View>

        {/* Register Button */}
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Overlay màu đen với độ trong suốt
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 30,
  },
  box: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "white",
  },
  registerButton: {
    backgroundColor: "#CC3366",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SignUp;
