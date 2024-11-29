import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FptCard, User } from "@/constants/model/User";
import { addVerifyCard } from "@/api/auth";
import * as ImagePicker from "expo-image-picker";
import { uploadImageToStorage } from "@/lib/firebase/upload-file";
import { getUser } from "@/api/user";

export default function VerifyInfo() {
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState(false);
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User>({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const updateCardFPT = useMutation({
    mutationFn: (cardUrl: string) => addVerifyCard(cardUrl),
    onSuccess: (data) => {
      console.log("User updated profile successfully:", data);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (error) => {
      console.error("Failed to update user:", error);
    },
  });

  const handleImageUpload = async () => {
    // open liabry img in mobile
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setIsUploading(true);
      try {
        // Upload  Firebase Storage and get URL
        const avatarUrl = await uploadImageToStorage({
          user: user,
          imageType: "verifyCard",
          avatarUrl: result.assets[0].uri,
        });

        // Call API update URL into user profile - Call api to update
        updateCardFPT.mutate(avatarUrl);

        // Call function onAvatarChange to update avatarUrl in edit-profile
      } catch (error) {
        console.error("Error updating profile:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  if (isLoading) return <ActivityIndicator size="large" />;

  if (error) {
    return (
      <View className="flex-1 bg-primary justify-center">
        <Text className="text-white font-bold items-center">
          Dữ liệu đang chạy xin vui lòng chờ trong giây lát
        </Text>
      </View>
    );
  }

  const getStatusIcon = () => {
    if (isUploading) {
      return <ActivityIndicator size="small" color="#78f25a" />;
    }

    switch (user?.verifyStatus) {
      case "UnderVerify":
        return (
          <View className="flex-row items-center">
            <Ionicons
              name="ellipsis-horizontal-outline"
              color={"#78f25a"}
              size={30}
            />
            <Text className="text-white text-[18px] font-bold text-center ml-2 ">
              Đang xác thực
            </Text>
          </View>
        );
      case "Rejected":
        return (
          <View className="flex-row items-center">
            <Ionicons
              name="ellipsis-horizontal-outline"
              color={"#FF0000"}
              size={30}
            />
            <Text className="text-white text-[18px] font-bold text-center ml-2 ">
              Xác thực thất bại
            </Text>
          </View>
        );
      case "Verified":
        return (
          <View className="flex-row items-center">
            <Ionicons name="checkmark-outline" color={"#78f25a"} size={30} />
            <Text className="text-white text-[18px] font-bold font-inter text-center ml-2 ">
              Đã xác thực
            </Text>
          </View>
        );
      case "Unverified":
        return (
          <View className="flex-row items-center">
            <Ionicons name="sad-outline" color={"#FFA500"} size={30} />
            <Text className="text-white text-[18px] font-bold font-inter text-center ml-2 ">
              Chưa xác thực
            </Text>
          </View>
        );

      default:
        return null;
    }
  };
  return (
    <View className="flex row">
      <TouchableOpacity
        className="bg-[#1F1F1F] flex-row w-[324px] p-4 rounded-[12px]  items-center justify-between mt-6"
        onPress={handleImageUpload}
        disabled={user?.verifyStatus === "Verified"}
      >
        <View className="items-center">{getStatusIcon()}</View>

        <Ionicons name="chevron-forward-outline" color={"white"} size={30} />
      </TouchableOpacity>
    </View>
  );
}
