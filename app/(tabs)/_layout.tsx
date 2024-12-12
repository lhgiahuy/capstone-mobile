import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link, router, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ProtectedRoute from "../(auth)/protected-route";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "@/api/user";
import { User } from "@/constants/model/User";
import NotificationIcon from "@/components/NotificationEvent/NotificationIcon";

export default function TabLayout() {
  const { data: user } = useQuery<User>({
    queryKey: ["user", "StatusNoti"],
    queryFn: getUser,
  });

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
                  <TouchableOpacity
                    style={{ marginRight: 15 }}
                    onPress={() => router.push("/search")}
                  >
                    <Ionicons name="search" size={24} color="black" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => router.push("/(tabs)/notification")}
                  >
                    {user?.isHaveUnreadNoti === true ? (
                      <NotificationIcon isHaveUnreadNoti />
                    ) : (
                      <Ionicons name="notifications" size={24} color="black" />
                    )}
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
          name="scan-qr"
          options={{
            headerTitle: () => (
              <View>
                <Text className="font-bold text-[20px] text-[#000]">
                  Quét QR sự kiện
                </Text>
              </View>
            ),
            headerTitleAlign: "center",
            tabBarIcon: ({ color }) => (
              <Ionicons name="scan-circle-outline" size={30} color={color} />
            ),
            headerStyle: {
              backgroundColor: "#CAFF4C",
            },
          }}
        />
        <Tabs.Screen
          name="notification"
          options={{
            headerTitle: () => (
              <View>
                <Text className="font-bold text-[20px] text-[#000]">
                  Thông báo
                </Text>
              </View>
            ),
            headerTitleAlign: "center",
            tabBarIcon: ({ color }) => (
              // <Ionicons name="notifications" size={24} color={color} />
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/notification")}
              >
                {user?.isHaveUnreadNoti === true ? (
                  <NotificationIcon isHaveUnreadNoti />
                ) : (
                  <Ionicons name="notifications" size={24} color={color} />
                )}
              </TouchableOpacity>
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
