// import React from "react";
// import { Modal, View, Text, TouchableOpacity } from "react-native";

// interface OverlapModalProps {
//   visible: boolean;
//   onCancel: () => void;

// }

// const OverlapModal: React.FC<OverlapModalProps> = ({
//   visible,
//   onCancel,

// }) => {
//   return (
//     <Modal transparent visible={visible} animationType="fade">
//       <View className="flex-1 justify-center items-center bg-black/50">
//         <View className="bg-[#fafafa] rounded-lg p-5 w-[90%] items-center">
//           <Text className="font-lexend text-[18px] text-center mb-5">
//             Sự kiện bạn đăng ký đang bị trùng giờ!
//           </Text>
//           <Text className="text-[14px] font-lexend text-center mb-5">
//             Bạn có chắc chắn muốn tiếp tục không?
//           </Text>
//           <View className="flex-row justify-between w-full mt-2">
//             <TouchableOpacity
//               className="bg-[#171717] px-3 py-3 rounded-[12px] mr-4 flex-1"
//               onPress={onCancel}
//             >
//               <Text className="text-white font-bold text-center">Hủy</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               className="bg-blue-300 px-3 py-3 rounded-[12px] ml-4 flex-1"
//               onPress={onCancel}
//             >
//               <Text className="text-white font-bold text-center">Tiếp tục</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default OverlapModal;
