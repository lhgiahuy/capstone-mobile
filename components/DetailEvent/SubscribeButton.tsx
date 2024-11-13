import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { ButtonRegisterProps } from "@/constants/model/EventDetail";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EventRegister, EventUnregister } from "@/api/event";
import SubscibeModal from "../Modal/SubscibeModal";
import UnsubscribeModal from "./UnsubscribeModal";
import { getUser } from "@/api/user";
import { User } from "@/constants/model/User";
import VerifyModal from "../Modal/VerifyModal";

export default function SubscribeButton({
  eventId,
  register: initialRegister,
  status,
}: ButtonRegisterProps) {
  console.log(status);

  const [register, setRegister] = useState<boolean | null>(initialRegister);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isVerifyAlertVisible, setVerifyAlertVisible] = useState(false);
  const [isConfirmUnregisterVisible, setConfirmUnregisterVisible] =
    useState(false);
  const isEventCompleted = status === "Completed";
  const queryClient = useQueryClient();

  const { data: user } = useQuery<User>({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const registerMutation = useMutation({
    mutationFn: (eventId: string) => EventRegister(eventId),
    onSuccess: (data: any) => {
      console.log("Đăng ký sự kiện thành công:", data);
      setModalVisible(true);
      setRegister(true);

      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
    onError: (error: Error) => {
      console.error("Lỗi khi đăng ký sự kiện:", error.message);
    },
  });

  const unregisterMutation = useMutation({
    mutationFn: (eventId: string) => EventUnregister(eventId),
    onSuccess: (data: any) => {
      console.log("Hủy đăng ký sự kiện thành công:", data);
      setConfirmUnregisterVisible(false);
      setRegister(false);
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error: Error) => {
      console.error("Lỗi khi hủy đăng ký sự kiện:", error.message);
    },
  });

  const handleSubscribe = () => {
    // check verify
    if (user?.verifyStatus !== "Verified") {
      setVerifyAlertVisible(true);
      return;
    }

    if (!register) {
      registerMutation.mutate(eventId);
    } else {
      setConfirmUnregisterVisible(true);
    }
  };

  const handleUnregister = () => {
    unregisterMutation.mutate(eventId);
  };
  return (
    <View className="flex-1">
      <TouchableOpacity
        onPress={handleSubscribe}
        className="align-middle bg-[#CAFF4C]  w-[320px] h-[50px] rounded-[18px] items-center justify-center opacity-90"
        style={{
          position: "absolute",
          bottom: 10,
          alignSelf: "center",
        }}
        disabled={isEventCompleted}
      >
        <Text className="text-black text-[20px] font-bold ">
          {/* {register ? "Đã đăng ký" : "Đăng ký"} */}
          {isEventCompleted
            ? "Sự kiện đã kết thúc"
            : register
              ? "Đã đăng ký"
              : "Đăng ký"}
        </Text>
      </TouchableOpacity>

      <VerifyModal
        visible={isVerifyAlertVisible}
        onClose={() => setVerifyAlertVisible(false)}
        message="Vui lòng xác thực tài khoản để đăng ký sự kiện"
      />

      <SubscibeModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />

      <UnsubscribeModal
        visible={isConfirmUnregisterVisible}
        onConfirm={handleUnregister}
        onCancel={() => setConfirmUnregisterVisible(false)}
      />

      {registerMutation.isError && (
        <Text className="text-gray-500 mt-2">
          Đăng ký thất bại. Vui lòng thử lại.
        </Text>
      )}
      {unregisterMutation.isError && (
        <Text className="text-red-500 mt-2">
          Hủy đăng ký thất bại. Vui lòng thử lại.
        </Text>
      )}
    </View>
  );
}
