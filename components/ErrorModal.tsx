import { View, Text, TouchableOpacity, Modal } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface ErrorModalProps {
  visible: boolean;
  onClose: () => void;
  message: string;
}

export default function ErrorModal({
  visible,
  onClose,
  message,
}: ErrorModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-72 p-5 bg-white rounded-2xl items-center shadow-lg">
          <View className="flex-row  items-center">
            <Ionicons name="alert-circle-outline" size={32} color={"#FF0000"} />
            <Text className="text-[20px] font-bold text-[#214C53]  text-center">
              Lỗi!
            </Text>
          </View>

          <Text className="text-base text-center text-gray-700 mb-4">
            {message}
          </Text>
          <TouchableOpacity
            className="bg-[#FF6347] rounded-full py-2 px-6"
            onPress={onClose}
          >
            <Text className="text-white font-semibold">Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
