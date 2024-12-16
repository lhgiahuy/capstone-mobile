import React from "react";
import { Modal, View, Text, TouchableOpacity, Image } from "react-native";

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  visible,
  onClose,
  onLogout,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center mx-8">
        <View className="px-2 bg-[#fafafa] items-center rounded-[18px] border-black border-[1px]">
          <Image
            source={require("../../assets/images/logout.png")}
            className="h-[180px] w-[220px] "
          />
          <Text className="text-black font-lexend text-center text-[16px] mb-4 mx-2">
            Bạn có muốn đăng xuất không?
          </Text>
          <View className="flex-row mb-4">
            <TouchableOpacity
              onPress={onClose}
              className=" bg-blue-300 p-3 w-[80px] rounded-[18px] mr-6"
            >
              <Text className="font-lexend text-center">Không</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onLogout}
              className="w-[80px] bg-[#1F1F1F] p-3 rounded-[18px] ml-6"
            >
              <Text className="font-lexend text-center text-white">Có</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;
