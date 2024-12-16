import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface VerifyModalProps {
  visible: boolean;
  onClose: () => void;
  message: string;
}

export default function VerifyModal({
  visible,
  onClose,
  message,
}: VerifyModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-72 p-5 bg-white rounded-2xl items-center shadow-lg">
          <Ionicons name="close-circle-outline" size={78} color={"#f1e834"} />
          <Text className="text-lg font-bold text-[#214C53] mb-2">
            Chưa xác thực được tài khoản
          </Text>

          <Text className="text-base text-center text-gray-700 mb-4">
            {message}
          </Text>
          <TouchableOpacity
            className="bg-[#e2f134] rounded-full py-2 px-6"
            onPress={onClose}
          >
            <Text className="text-[#214C53] font-semibold">Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
