import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
// import { validateForm } from "./ValidateForm";

export default function RegisterForm({ form, onSubmit, onCancel }: any) {
  const [choices, setChoices] = useState<{ [key: string]: string[] }>({});
  // const [errors, setErrors] = useState<string | null>(null);

  const handleChoiceSelect = (fieldName: string, option: string) => {
    setChoices((prev) => {
      return {
        ...prev,
        [fieldName]: [option],
      };
    });
  };

  const handleSubmit = () => {
    // if (!validateForm(form, choices)) {
    //   // Hiển thị thông báo lỗi nếu validateForm trả về false
    //   setErrors("Vui lòng điền đầy đủ thông tin hoặc đưa ra lựa chọn hợp lệ.");
    //   return; // Dừng lại và không gửi form
    // }
    // action register
    onSubmit();

    Toast.show({
      type: "success",
      text1: "Đăng ký sự kiện thành công!",
      visibilityTime: 2000,
      text1Style: {
        fontSize: 16,
        fontWeight: "bold",
      },
    });

    onCancel();
  };

  return (
    <ScrollView className="bg-primary flex-1 p-4 ">
      <View className="">
        <Text className="text-white text-[30px] font-bold mb-4 text-center">
          Form đăng ký
        </Text>
        {/* {errors && (
        <Text className="text-red-500 mb-4">{errors}</Text> 
      )} */}
        {form?.map((field: any, index: number) => (
          <View key={index} className="mb-4">
            <Text className="text-white font-bold">{field.name}</Text>

            {field.type === "Plain Text" && (
              <TextInput
                className="bg-white rounded-lg border-gray-500 mt-3 h-[48px] p-2"
                placeholder="Nhập thông tin vào đây"
              />
            )}

            {field.type === "Choice" && (
              <View>
                {field.options?.map((option: string, index: number) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleChoiceSelect(field.name, option)}
                    className={`flex-row items-center p-2 my-1 border rounded-lg ${
                      choices[field.name]?.includes(option)
                        ? "bg-white border-gray-700"
                        : "bg-black border-gray-700"
                    }`}
                  >
                    <Text
                      className={`${
                        choices[field.name]?.includes(option)
                          ? "text-black"
                          : "text-white"
                      }`}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {field.type === "Multiple Choice" && (
              <View>
                {field.options?.map((option: string, index: number) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleChoiceSelect(field.name, option)}
                    className={`flex-row items-center p-2 my-1 border rounded-lg ${
                      choices[field.name]?.includes(option)
                        ? "bg-white border-gray-700"
                        : "bg-black border-gray-700"
                    }`}
                  >
                    <Text
                      className={`${
                        choices[field.name]?.includes(option)
                          ? "text-black"
                          : "text-white"
                      }`}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}

        <View className="flex-row justify-around mt-4">
          <TouchableOpacity
            onPress={onCancel}
            className="justify-center items-center bg-gray-400 w-[100px] h-[40px] rounded-lg"
          >
            <Text className="text-white font-bold">Hủy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSubmit}
            className="justify-center items-center bg-[#CAFF4C] w-[100px] h-[40px] rounded-lg"
          >
            <Text className="text-black font-bold">Gửi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
