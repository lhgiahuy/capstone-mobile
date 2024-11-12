// Avatar.tsx
import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser, updateUser } from "@/api/user";

import { InforUser, User } from "@/constants/model/User";
import { uploadImageToStorage } from "@/lib/firebase/upload-file";

export default function Avatar({
  onAvatarChange,
}: {
  onAvatarChange: (url: string) => void;
}) {
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

  const updateProfileMutation = useMutation({
    mutationFn: (updatedUser: Partial<InforUser>) => updateUser(updatedUser),
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
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setIsUploading(true);
      try {
        const avatarUrl = await uploadImageToStorage({
          user: user,
          imageType: "avatar",
          avatarUrl: result.assets[0].uri,
        });

        // Call API update URL into user profile - Call api to update
        updateProfileMutation.mutate({
          username: user?.username || "",
          avatarUrl,
          phoneNumber: user?.phoneNumber || "",
        });

        // Call function onAvatarChange to update avatarUrl in edit-profile
        onAvatarChange(avatarUrl);
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

  return (
    <View className="relative justify-center items-center">
      <Image
        source={{
          uri: user?.avatarUrl || require("../../assets/images/profile.jpg"),
        }}
        className="h-[120px]  w-[120px] rounded-[80px] justify-center mt-[40px]"
      />
      <Pressable
        onPress={handleImageUpload}
        className="absolute bottom-0 right-2 p-1 rounded-full bg-gray-900"
      >
        <Ionicons name="camera-outline" size={20} color={"white"} />
      </Pressable>
      {isUploading && (
        <View className="absolute inset-0 bg-transparent flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </View>
  );
}
