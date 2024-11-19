// import Toast from "react-native-toast-message";

// export const validateForm = (
//   form: any,
//   choices: { [key: string]: string[] }
// ) => {
//   for (const field of form) {
//     if (field.type === "Plain Text" && !field.value) {
//       // Check "Plain Text"
//       Toast.show({
//         type: "error",
//         text1: "Vui lòng điền đầy đủ thông tin",
//         visibilityTime: 2000,
//         text1Style: {
//           fontSize: 16,
//           fontWeight: "bold",
//         },
//       });
//       return false;
//     }
//     if (field.type === "Choice" && !choices[field.name]?.length) {
//       // Check "Choice"
//       Toast.show({
//         type: "error",
//         text1: `Vui lòng chọn một lựa chọn cho ${field.name}`,
//         visibilityTime: 2000,
//         text1Style: {
//           fontSize: 16,
//           fontWeight: "bold",
//         },
//       });
//       return false;
//     }
//     if (field.type === "Multiple Choice" && !choices[field.name]?.length) {
//       // Check "Multiple Choice"
//       Toast.show({
//         type: "error",
//         text1: `Vui lòng chọn ít nhất một lựa chọn cho ${field.name}`,
//         visibilityTime: 2000,
//         text1Style: {
//           fontSize: 16,
//           fontWeight: "bold",
//         },
//       });
//       return false;
//     }
//   }
//   return true;
// };
