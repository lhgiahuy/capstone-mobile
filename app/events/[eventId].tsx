import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchEventById } from "@/lib/axios";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import RatingEvent from "@/components/RatingEvent";

export interface EventData {
  eventId: string;
  eventName: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  maxAttendees: number;
  processNote: string;
  organizerName: string;
  eventTypeName: string;
  statusId: number;
  eventTags: string;
}

export default function DetailEvent() {
  const { eventId } = useLocalSearchParams();
  const { data, isLoading, error } = useQuery<EventData, Error>({
    queryKey: ["events", eventId],
    queryFn: () => fetchEventById(eventId as string),
  });

  if (isLoading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error loading event details</Text>;

  if (!data) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Event Not Found
        </Text>
        <Text>This event does not exist or has been removed.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: 62 }}>
        <LinearGradient
          colors={[
            "rgba(102, 102, 102, 0.63)",
            "rgba(0, 0, 0, 0.63)",
            "rgba(102, 102, 102, 0.2)",
          ]}
          className=" items-center "
        >
          <Image
            //  source={{ uri: data.imageUrl }}
            source={require("../../assets/images/special1.png")}
            className="h-[240px] w-[330px] rounded-[20px] mt-6 opacity-75"
          />

          <Text className="text-[#CAFF4C] font-bold text-[24px] mt-2">
            {data.eventName}
          </Text>
          <View className="flex-row mt-4">
            <Ionicons name="calendar" size={20} color={"#CAFF4C"} />
            <Text className="text-white ml-2">
              {data.startTime} tới {data.endTime}
            </Text>
          </View>
          <View className="flex-row mt-4">
            <Ionicons name="location-outline" size={20} color={"#CAFF4C"} />
            <Text className="text-white ml-2">{data.location}</Text>
          </View>

          {data.statusId === 1 && <RatingEvent rating={data.statusId} />}

          <View className="bg-white w-full rounded-[24px] p-4 mt-4">
            <Text className="font-bold text-[17px] mb-2"> Giới Thiệu</Text>
            <Text> {data.description}</Text>
          </View>
          <View className="bg-white w-full rounded-[24px] p-4 mt-4 mb-2">
            <Text className="font-bold text-[17px] mb-2">Ban tổ chức</Text>
            <View className="flex-row">
              <Image
                source={require("../../assets/images/fpt.png")}
                className="h-[60px] w-[140px] rounded-[40px]"
              />
              <Text className="ml-4 mt-5"> {data.organizerName}</Text>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>

      <TouchableOpacity
        className="align-middle bg-[#CAFF4C]  w-[320px] h-[50px] rounded-[18px] items-center justify-center"
        style={{
          position: "absolute",
          bottom: 10,
          alignSelf: "center",
        }}
      >
        <Text className="text-black text-[20px] font-bold ">Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
}
