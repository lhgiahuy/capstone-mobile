import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ProtectedRoute from "../(auth)/protected-route";

export default function TabLayout() {
  return (
    <ProtectedRoute>
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
            headerTitle: () => (
              <View>
                <Text className="font-bold text-[20px] text-[#000]">Fvent</Text>
              </View>
            ),

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

                  <TouchableOpacity>
                    <Link href="/user/notification">
                      <Ionicons name="notifications" size={24} color="black" />
                    </Link>
                  </TouchableOpacity>
                </View>
              );
            },
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            headerTitle: () => (
              <View>
                <Text className="font-bold text-[20px] text-[#000]">
                  Sự kiện của tôi
                </Text>
              </View>
            ),
            headerTitleAlign: "center",

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
            headerTitle: () => (
              <View>
                <Text className="font-bold text-[20px] text-[#000]">
                  Nhắn tin
                </Text>
              </View>
            ),
            headerTitleAlign: "center",
            tabBarIcon: ({ color }) => (
              <Ionicons name="chatbubble" size={24} color={color} />
            ),
            headerStyle: {
              backgroundColor: "#CAFF4C",
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerTitle: () => (
              <View>
                <Text className="font-bold text-[20px] text-[#000]">Hồ sơ</Text>
              </View>
            ),
            headerTitleAlign: "center",

            tabBarIcon: ({ color }) => (
              <Ionicons name="person" size={27} color={color} />
            ),
            headerStyle: {
              backgroundColor: "#CAFF4C",
            },
          }}
        />
      </Tabs>
    </ProtectedRoute>
  );
}
