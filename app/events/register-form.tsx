import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ScrollView } from "react-native";
import { EventRegister, getEventById, sumbitForm } from "@/api/event";
import { EventData } from "@/constants/model/EventDetail";
import Toast from "react-native-toast-message";

export default function RegisterForm() {
  const queryClient = useQueryClient();
  const { eventId } = useLocalSearchParams();
  const [formData, setFormData] = useState<
    { question: string; answer: string }[]
  >([]);

  // Fetching form data from API
  const {
    data: eventData,
    isLoading,
    error,
  } = useQuery<EventData, Error>({
    queryKey: ["events", eventId],
    queryFn: () => getEventById(eventId as string),
  });

  useEffect(() => {
    if (eventData?.form) {
      setFormData(
        eventData.form.map((item) => ({ question: item.name, answer: "" }))
      );
    }
  }, [eventData]);

  // Mutation to submit form data
  const formSubmitMutation = useMutation({
    mutationFn: (formData: { question: string; answer: string }[]) => {
      const dataObject = { data: formData };
      console.log("Submitting form data: ", dataObject);
      return sumbitForm(eventId as string, dataObject);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });

      Toast.show({
        type: "success",
        text1: "Đăng kí thành công",
        visibilityTime: 2000,
        text1Style: {
          fontSize: 16,
          fontWeight: "bold",
        },
      });

      // router.push("/events");
    },
    onError: (err) => {
      console.error("Submit error: ", err);
      Alert.alert("Lỗi", `Có lỗi xảy ra: ${err.message}`);
    },
  });

  // Handle input change
  const handleInputChange = (index: number, value: string) => {
    const newFormData = [...formData];
    newFormData[index].answer = value;
    setFormData(newFormData);
  };

  // Submit form
  const handleSubmit = () => {
    formSubmitMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Đang tải...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Có lỗi xảy ra: {error.message}</Text>
      </View>
    );
  }

  const form = eventData?.form;

  return (
    <ScrollView className="flex-1 bg-primary p-4">
      <Text className="text-white text-xl mb-4">
        Đăng ký tham gia: {eventData?.eventName}
      </Text>

      {form?.map((question, index) => (
        <View key={index} className="mb-4">
          <Text className="text-white mb-2">{question.name}</Text>

          {question.type === "Choice" && (
            <View>
              {question.options.map((option, i) => (
                <TouchableOpacity
                  key={i}
                  className={`p-2 bg-gray-700 mb-2 ${
                    formData[index]?.answer === option ? "bg-gray-500" : ""
                  }`}
                  onPress={() => handleInputChange(index, option)}
                >
                  <Text className="text-white">{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {question.type === "Plain Text" && (
            <TextInput
              className="p-2 bg-white text-black rounded"
              placeholder={`Nhập ${question.name}`}
              value={formData[index]?.answer || ""}
              onChangeText={(text) => handleInputChange(index, text)}
            />
          )}
        </View>
      ))}

      <Button title="Gửi đăng ký" onPress={handleSubmit} />
    </ScrollView>
  );
}
