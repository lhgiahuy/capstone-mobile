import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchEventById } from "@/lib/axios";

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
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{data.eventName}</Text>
      <Text>{data.description}</Text>
      <Text>Location: {data.location}</Text>
      <Text>Start Time: {data.startTime}</Text>
      <Text>End Time: {data.endTime}</Text>
    </View>
  );
}
