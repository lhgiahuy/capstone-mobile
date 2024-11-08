import { View, Text, Modal, TouchableOpacity, Image } from "react-native";
import React from "react";

interface ConfirmUnsubscribeModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function UnsubscribeModal({
  visible,
  onConfirm,
  onCancel,
}: ConfirmUnsubscribeModalProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="w-[300px] p-5 bg-white rounded-[20px] items-center">
          <Image
            source={require("@/assets/images/oops!.png")}
            className="w-[300px]  h-[180px]"
          />
          <Text className="text-[20px] font-bold text-center mb-4">
            Bạn có muốn hủy đăng ký sự kiện này không?
          </Text>
          <View className="flex-row justify-around w-full">
            <TouchableOpacity
              onPress={onCancel}
              className="bg-gray-400 rounded-md py-2 px-4"
            >
              <Text className="text-white font-bold w-[60px] text-center">
                Hủy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              className="bg-black rounded-md py-2 px-4"
            >
              <Text className="text-white font-bold w-[60px]">Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
