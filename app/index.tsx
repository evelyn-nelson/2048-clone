import { GameBox } from "@/components/GameBox";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <GameBox />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
});
