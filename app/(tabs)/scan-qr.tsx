import { checkIn } from "@/api/event";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useState } from "react";
import {
  Button,
  Linking,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function ScanIcon() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [eventId, setEventId] = useState("");

  const mutation = useMutation({
    mutationFn: (eventId: string) => checkIn(eventId),
    onSuccess: (data) => {
      // queryClient.invalidateQueries({
      //   queryKey: ["user"],
      // });
      Toast.show({
        type: "success",
        text1: "Check in thành công!",
        text1Style: {
          fontSize: 16,
          fontWeight: "bold",
        },
      });
      router.push(`/events/${eventId}`);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response) {
          const errorMessage =
            axiosError.response.data?.error ||
            "Sự kiện sắp diễn ra hoặc đã quá hạn check in";
          console.log(errorMessage);
          return Toast.show({
            type: "error",
            text1: "Quét mã không thành công!",
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
      // return Toast.show({
      //   type: "error",
      //   text1: "Quét mã không thành công!",
      //   text1Style: {
      //     fontSize: 16,
      //     fontWeight: "bold",
      //   },
      // });
    },
  });

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white text-[18px] text-center font-lexend pb-2">
          Chúng tôi cần sự cho phép của bạn để hiển thị máy ảnh
        </Text>

        <Pressable
          onPress={requestPermission}
          className="bg-[#CAFF4C] justify-center items-center w-[220px] mt-3 py-2 rounded-[18px]"
        >
          <Text className="text-[18px] font-lexend">Cấp quyền</Text>
        </Pressable>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function handleBarcodeScanned({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) {
    setScanned(true);

    // const dataId = data.split("/").pop(); // split by '/' and get the last element
    console.log("Extracted ID:", data);
    setEventId(data as string);

    mutation.mutate(data as string);
    // Check if the scanned data is a valid URL
    // const isValidUrl = /^https?:\/\//i.test(data);
    // if (isValidUrl) {
    //   // Navigate to the URL if it is a valid link
    //   Linking.openURL(data).catch((err) => {
    //     Toast.show({
    //       type: "error",
    //       text1: "Không thể mở URL",
    //       text1Style: {
    //         fontSize: 16,
    //         fontWeight: "bold",
    //       },
    //     });
    //   });
    // } else {
    //   // If it's not a valid URL, show an error message
    //   Toast.show({
    //     type: "error",
    //     text1: "Mã không hợp lệ",
    //     text1Style: {
    //       fontSize: 16,
    //       fontWeight: "bold",
    //     },
    //   });
    // }
  }

  return (
    <View className="flex-1 justify-center">
      <CameraView
        className="flex-1"
        facing={facing}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      >
        <View className="flex-1 flex-row bg-transparent m-16">
          <TouchableOpacity
            className="flex-1 self-end items-center"
            onPress={toggleCameraFacing}
          >
            <Text className="text-[18px] font-lexend text-white">
              XOAY MÁY ẢNH
            </Text>
          </TouchableOpacity>
        </View>
        {scanned && (
          <Pressable
            onPress={() => setScanned(false)}
            className="justify-between items-center mb-8"
          >
            <Text className="text-white text-[16px] font-lexend text-center">
              Ấn để quét mã
            </Text>
          </Pressable>
        )}
      </CameraView>
    </View>
  );
}
