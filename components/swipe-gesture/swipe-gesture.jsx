import { useRef } from "react";
import { View, Animated, PanResponder, Platform } from "react-native";

const SwipeGesture = ({ onSwipePerformed, gestureStyle, children }) => {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        let x = gestureState.dx;
        let y = gestureState.dy;
        if (Math.abs(x) > Math.abs(y)) {
          if (x >= 0) {
            onSwipePerformed("right");
          } else {
            onSwipePerformed("left");
          }
        } else {
          if (y >= 0) {
            onSwipePerformed("down");
          } else {
            onSwipePerformed("up");
          }
        }
      },
    })
  ).current;
  if (Platform.OS === "web") {
    return <View style={gestureStyle}>{children}</View>;
  }
  return (
    <Animated.View {...panResponder.panHandlers} style={gestureStyle}>
      <View>{children}</View>
    </Animated.View>
  );
};

export default SwipeGesture;
