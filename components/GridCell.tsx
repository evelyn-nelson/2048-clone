import { memo, SetStateAction, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  PixelRatio,
  Platform,
  Dimensions,
} from "react-native";

const colorMapping: Record<number, string> = {
  2: "#faf9cf",
  4: "#fffdad",
  8: "#fffc75",
  16: "#fffa54",
  32: "#fff933",
  64: "#ffff00",
  128: "#ffd900",
  256: "#ffb700",
  512: "#ff8c00",
  1024: "#ff6600",
  2048: "#ff0000",
  4096: "#ff007b",
  8192: "#ff00f2",
  16384: "#a200ff",
  32768: "#3c00ff",
  65536: "#0055ff",
};

export const GridCell = memo(
  (props: { x: number; y: number; value: number }) => {
    const { x, y, value } = props;
    const [fontSize, setFontSize] = useState(0);
    const [color, setColor] = useState("#FFFFFF");

    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
      Dimensions.get("window");

    const scale = SCREEN_WIDTH / 320;

    const normalize = (size: number) => {
      const newSize = size * 0.8;
      if (Platform.OS === "ios") {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
      } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
      }
    };

    useEffect(() => {
      // Set font size based on the value
      if (value === 0) {
        setFontSize(0);
      } else {
        setFontSize(
          value < 100 ? 40 : value < 1000 ? 30 : 20
          // : normalize(20)
        );
      }
      // Set color based on value
      setColor(colorMapping[value] || "#FFFFFF");
    }, [value]);

    return (
      <View style={[styles.container, { backgroundColor: color }]}>
        <Text style={[styles.cellText, { fontSize: fontSize }]}>
          {value != 0 ? value : ""}
        </Text>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    height: "25%",
    flexBasis: "25%",
    borderRadius: 1,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    fontWeight: "bold",
  },
});
