import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Alert,
  useWindowDimensions,
} from "react-native";
import React from "react";

import { useQuery } from "@tanstack/react-query";

import { getTags } from "@/api/tags";
import { Tag } from "@/constants/model/Tag";
import { router } from "expo-router";
import RenderHTML from "react-native-render-html";

export default function EventTag() {
  // const { width } = useWindowDimensions();
  const { data, isLoading, error } = useQuery<Tag[], Error>({
    queryKey: ["event"],
    queryFn: () => getTags(),
  });

  if (isLoading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error loading event details</Text>;
  const NavEventTypes = (tagName: string) => {
    if (!tagName) {
      Alert.alert("Thông báo", "Không tìm thấy thông tin tổ chức.");
    } else {
      router.push({
        pathname: "/search/result",
        params: { tagName: tagName },
      });
    }
  };

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
        className=" p-2"
      >
        {data?.map((tag) => (
          <TouchableOpacity
            key={tag.tagId}
            className="h-[36px] w-[100px] bg-[#1F1F1F] justify-between items-center rounded-[12px]"
            onPress={() => NavEventTypes(tag.tagName)}
          >
            <View className="flex-row">
              {/* {tag.svgContent ? (
                <RenderHTML
                  contentWidth={width}
                  source={{ html: tag.svgContent }}
                  baseStyle={baseStyle}
                />
              ) : (
                <Text>Không có mô tả</Text>
              )} */}
              <Text className="text-white text-[14px] font-lexend p-2 ">
                {tag.tagName}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
