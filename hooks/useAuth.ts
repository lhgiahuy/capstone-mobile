// import { useState } from "react";
// import * as SecureStore from "expo-secure-store";
// import { api } from "@/lib/axios";

// export const useAuth = () => {
//   const [loading, setLoading] = useState(false);

//   const login = async (
//     email: string,
//     password: string,
//     fcmToken: string
//   ): Promise<boolean> => {
//     setLoading(true);
//     try {
//       const response = await api.post("/auth/login", {
//         email,
//         password,
//         fcmToken,
//       });
//       const { token } = response.data;

//       // Save token in SecureStore
//       await SecureStore.setItemAsync("authToken", token);
//       console.log(token);

//       return true;
//     } catch (error) {
//       console.log("Đăng nhập thất bại:", error);

//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { login, loading };
// };

// const handleLogin = async () => {
//   const success = await login(email, password, devicePushToken);
//   if (success) {
//     router.push("/home");
//     console.log("Thành công");
//     Toast.show({
//       type: "success",
//       text1: "Đăng nhập thành công",
//       visibilityTime: 2000,
//       text1Style: {
//         fontSize: 16,
//         fontWeight: "bold",
//       },
//     });
//     setEmail(""), setPassword("");
//   } else {
//     Toast.show({
//       type: "error",
//       text1: "Đăng nhập thất bại",
//       text2: "Vui lòng kiểm tra email và mật khẩu của bạn.",
//       text1Style: {
//         fontSize: 16,
//         fontWeight: "bold",
//       },
//       text2Style: {
//         fontSize: 14,
//       },
//     });
//   }
// };
