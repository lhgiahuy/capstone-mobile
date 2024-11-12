import { View, Text, TouchableOpacity, Modal } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  message: string;
}

export default function ReviewModal({
  visible,
  onClose,
  message,
}: SuccessModalProps) {
  const router = useRouter();
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      router.back();
    });
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-72 p-5 bg-white rounded-2xl items-center shadow-lg">
          <Ionicons
            name="checkmark-circle-outline"
            size={72}
            color={"#35f849"}
          />

          <Text className="text-lg font-bold text-[#214C53] mb-1">
            Chia sẻ của bạn đã được gửi!
          </Text>

          <Text className=" text-center text-gray-700 mb-6">{message}</Text>
          <TouchableOpacity
            className="bg-[#CAFF4C] rounded-full py-2 px-6"
            onPress={handleClose}
          >
            <Text className="text-[#214C53] font-bold">Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
