import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Text, View } from "react-native";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const queryClient = new QueryClient();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen
            name="search/index"
            options={{
              headerTitle: () => (
                <View>
                  <Text className="font-bold text-[18px] text-[#000]">
                    Tìm kiếm
                  </Text>
                </View>
              ),
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#CAFF4C",
              },
            }}
          />
          <Stack.Screen
            name="events/[eventId]"
            options={{
              headerTitle: () => (
                <View>
                  <Text className="font-bold text-[18px] text-[#000]">
                    Chi tiết sự kiện
                  </Text>
                </View>
              ),
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#CAFF4C",
              },
            }}
          />
          <Stack.Screen
            name="organizer/infor"
            options={{
              headerTitle: () => (
                <View>
                  <Text className="font-bold text-[18px] text-[#000]">
                    Ban tổ chức
                  </Text>
                </View>
              ),
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#CAFF4C",
              },
            }}
          />
        </Stack>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
