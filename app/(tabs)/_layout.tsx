import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#737373",
        tabBarStyle: {
          backgroundColor: "#CAFF4C",
          height: 50,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Fvent",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),

          headerStyle: {
            backgroundColor: "#CAFF4C",
          },

          headerRight: () => {
            return (
              <View style={{ flexDirection: "row", marginRight: 10 }}>
                <TouchableOpacity style={{ marginRight: 15 }}>
                  <Link href="/search">
                    <Ionicons name="search" size={24} color="black" />
                  </Link>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => alert("Notifications clicked")}
                >
                  <Ionicons name="notifications" size={24} color="black" />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Lịch",

          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: "#CAFF4C",
          },
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat box",
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: "#CAFF4C",
          },
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Haha",

          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={27} color={color} />
          ),
          headerStyle: {
            backgroundColor: "#CAFF4C",
          },
        }}
      />
    </Tabs>
  );
}
