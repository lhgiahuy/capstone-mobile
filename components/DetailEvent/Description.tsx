import React from "react";
import { Text } from "react-native";
import AutoHeightWebView from "react-native-autoheight-webview";

// Tạo component Description nhận tham số description với giá trị mặc định
interface DescriptionProps {
  description?: string;
}

const Description: React.FC<DescriptionProps> = ({
  description = "Không có mô tả",
}) => {
  return description.trim() ? (
    <AutoHeightWebView
      style={{ width: "100%" }}
      originWhitelist={["*"]}
      source={{ html: description }}
      customStyle={`
        * { font-family: 'lexend'; line-height: 1.5; margin: 0; padding: 0;color: "black"; }
      `}
    />
  ) : (
    <Text>Không có mô tả</Text>
  );
};

export default Description;

// import React from "react";
// import { StyleSheet, Text } from "react-native";
// import AutoHeightWebView from "react-native-autoheight-webview";
// import WebView from "react-native-webview";
// import Constants from "expo-constants";

// // Tạo component Description nhận tham số description với giá trị mặc định
// interface DescriptionProps {
//   description?: string;
// }

// const Description: React.FC<DescriptionProps> = ({
//   description = "Không có mô tả",
// }) => {
//   console.log("HTML Length:", description.length);
//   return description.trim() ? (
//     <WebView
//       style={styles.container}
//       originWhitelist={["*"]}
//       source={{ html: description }}
//     />
//   ) : (
//     <Text>Không có mô tả</Text>
//   );
// };

// export default Description;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: Constants.statusBarHeight,
//   },
// });
