import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { ButtonRegisterProps } from "@/constants/model/EventDetail";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EventRegister, EventUnregister } from "@/api/event";

import UnsubscribeModal from "./UnsubscribeModal";
import { getUser } from "@/api/user";
import { User } from "@/constants/model/User";
import VerifyModal from "../Modal/VerifyModal";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import ReviewButton from "./ReviewButton";

export default function SubscribeButton({
  eventId,
  register: initialRegister,
  status,
  form,
  data,
}: ButtonRegisterProps) {
  console.log(status);

  const [register, setRegister] = useState<boolean | null>(initialRegister);

  const [isVerifyAlertVisible, setVerifyAlertVisible] = useState(false);
  const [isConfirmUnregisterVisible, setConfirmUnregisterVisible] =
    useState(false);
  const [cooldown, setCooldown] = useState(false);
  const isEventCompleted = status === "Completed";
  const queryClient = useQueryClient();

  const { data: user } = useQuery<User>({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const registerMutation = useMutation({
    mutationFn: (eventId: string) => EventRegister(eventId),
    onSuccess: (data: any) => {
      setRegister(true);
      Toast.show({
        type: "success",
        text1: "Đăng ký sự kiện thành công",
        visibilityTime: 3000,
        text1Style: {
          fontSize: 16,
          fontWeight: "bold",
        },
      });
      queryClient.invalidateQueries({
        queryKey: ["events", "calendar", "upcoming"],
      });
      queryClient.invalidateQueries({
        queryKey: ["events", eventId],
      });
    },
    onError: (error: Error) => {
      Toast.show({
        type: "error",
        text1: "Đăng ký sự kiện thất bại",
        text1Style: {
          fontSize: 16,
          fontWeight: "bold",
        },
      });
    },
  });

  const unregisterMutation = useMutation({
    mutationFn: (eventId: string) => EventUnregister(eventId),
    onSuccess: (data: any) => {
      console.log("Hủy sự kiện thành công", data);

      setConfirmUnregisterVisible(false);
      setRegister(false);
      setCooldown(true);
      setTimeout(() => setCooldown(false), 10000);
      queryClient.invalidateQueries({
        queryKey: ["events", "calendar", "upcoming"],
      });
      queryClient.invalidateQueries({
        queryKey: ["events", eventId],
      });
    },
    onError: (error: Error) => {
      console.log("Lỗi khi hủy đăng ký sự kiện:", error.message);
      Toast.show({
        type: "error",
        text1: "Lỗi khi hủy đăng ký!",
        visibilityTime: 3000,
        text1Style: {
          fontSize: 16,
          fontWeight: "bold",
        },
      });
    },
  });

  const handleSubscribe = () => {
    // check verify
    if (user?.verifyStatus !== "Verified") {
      setVerifyAlertVisible(true);
      return;
    }
    if (data?.maxAttendees === 0 && !data.isRegistered) {
      Toast.show({
        type: "error",
        text1: "Số lượng người đăng ký đã hết!",
        visibilityTime: 3000,
        text1Style: {
          fontSize: 16,
          fontWeight: "bold",
        },
      });
      return;
    }
    if (cooldown) {
      Toast.show({
        type: "info",
        text1: "Bạn vừa hủy đăng ký!",
        text2: "Vui lòng chờ vài giây để đăng ký lại ",
        visibilityTime: 3000,
        text1Style: {
          fontSize: 16,
          fontWeight: "bold",
        },
        text2Style: {
          fontSize: 16,
          fontWeight: "bold",
        },
      });
      return;
    }

    if (!register) {
      // registerMutation.mutate(eventId);
      if (form?.length) {
        router.push({
          pathname: "/events/register-form",
          params: { eventId: eventId },
        });
      } else {
        registerMutation.mutate(eventId);
      }
    } else {
      setConfirmUnregisterVisible(true);
    }
  };

  const handleUnregister = () => {
    unregisterMutation.mutate(eventId);
  };
  return (
    <View className="flex-1">
      {!isEventCompleted || !register ? (
        <TouchableOpacity
          onPress={handleSubscribe}
          className={`align-middle bg-[#CAFF4C]  w-[320px] h-[50px] rounded-[18px] items-center justify-center opacity-90 
          ${
            isEventCompleted
              ? "bg-[#FFA500]"
              : register
                ? "bg-slate-400"
                : "bg-[#CAFF4C]"
          }`}
          style={{
            position: "absolute",
            bottom: 10,
            alignSelf: "center",
          }}
          disabled={isEventCompleted || data.isCheckIn === true}
        >
          <Text className="text-black text-[20px] font-bold ">
            {isEventCompleted
              ? "Sự kiện đã kết thúc"
              : register
                ? "Hủy đăng ký"
                : "Đăng ký"}
          </Text>
        </TouchableOpacity>
      ) : (
        <ReviewButton eventId={eventId as string} data={data} />
      )}

      <VerifyModal
        visible={isVerifyAlertVisible}
        onClose={() => setVerifyAlertVisible(false)}
        message="Vui lòng xác thực tài khoản để đăng ký sự kiện"
      />

      <UnsubscribeModal
        visible={isConfirmUnregisterVisible}
        onConfirm={handleUnregister}
        onCancel={() => setConfirmUnregisterVisible(false)}
      />
    </View>
  );
}
