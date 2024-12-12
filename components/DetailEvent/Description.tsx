import React from "react";
import { Text } from "react-native";
import AutoHeightWebView from "react-native-autoheight-webview";

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
