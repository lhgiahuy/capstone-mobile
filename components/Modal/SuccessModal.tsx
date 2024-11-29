import { View, Text, TouchableOpacity, Modal } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  message: string;
}

export default function SuccessModal({
  visible,
  onClose,
  message,
}: SuccessModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-72 p-5 bg-white rounded-2xl items-center shadow-lg">
          <View className="flex-row">
            <Ionicons name="checkmark-outline" size={25} color={"#35f849"} />
            <Text className="text-lg font-bold text-[#214C53] mb-2">
              Đã lưu thay đổi
            </Text>
          </View>

          <Text className="text-base text-center text-gray-700 mb-4">
            {message}
          </Text>
          <TouchableOpacity
            className="bg-[#CAFF4C] rounded-full py-2 px-6"
            onPress={onClose}
          >
            <Text className="text-[#214C53] font-semibold">Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
