import { View, Text, Modal, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
}
export default function SubscibeModal({ visible, onClose }: SuccessModalProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="w-[300px] p-5 bg-white rounded-[20px] items-center">
          <Ionicons
            name="checkmark-circle-outline"
            size={100}
            color={"#CAFF4C"}
          />
          <Text className="text-[20px] font-bold text-center mb-4">
            Bạn đã đăng ký thành công!
          </Text>
          <TouchableOpacity
            onPress={onClose}
            className="bg-black rounded-md py-2 px-4 "
          >
            <Text className="text-white font-bold">Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
