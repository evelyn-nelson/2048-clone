import { View, StyleSheet, Button, Platform } from "react-native";
import { GridCell } from "./GridCell";
import { useEffect, useState } from "react";
import SwipeGesture from "./swipe-gesture";

export const GameBox = () => {
  const initializeGame = () => {
    return [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ] as GameData;
  };
  const [gameState, setGameState] = useState<GameData>(initializeGame());

  useEffect(() => {
    console.log("GameBox re-rendered with gameState:", gameState);
  }, [gameState]);

  const getEmptyCells = (currentState: GameData) => {
    const emptyCells = [];
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        if (currentState[y][x] === 0) {
          emptyCells.push({ x: x, y: y });
        }
      }
    }
    return emptyCells;
  };

  const moveDirection = (currentState: GameData, direction: string) => {
    if (direction === "left") {
      for (let y = 0; y < 4; y++) {
        let newAdded: number[] = [];
        for (let x = 0; x < 4; x++) {
          if (currentState[y][x] != 0) {
            let bestSpot = x;
            check: for (let x2 = x; x2 >= 0; x2--) {
              console.log(`checking ${x2}`);
              if (x <= x2) {
                continue check;
              }
              if (currentState[y][x2] === 0) {
                console.log("found spot ", y, ",", x2);
                bestSpot = x2;
              } else if (currentState[y][x2] === currentState[y][x]) {
                console.log("found spot ", y, ",", x2);
                bestSpot = x2;
              } else {
                console.log("found full cell ", y, ",", x2);
                bestSpot = x2 + 1;
                break check;
              }
            }
            console.log("original ", x, ",", y, " best spot", bestSpot);
            if (newAdded.includes(bestSpot)) {
              bestSpot++;
            }
            if (bestSpot != x) {
              if (currentState[y][bestSpot] === 0) {
                currentState[y][bestSpot] = currentState[y][x];
              } else if (currentState[y][bestSpot] === currentState[y][x]) {
                currentState[y][bestSpot] = currentState[y][x] * 2;
                newAdded.push(bestSpot);
              }
              currentState[y][x] = 0;
            }
          }
        }
      }
    } else if (direction === "right") {
      for (let y = 0; y < 4; y++) {
        let newAdded: number[] = [];
        for (let x = 3; x >= 0; x--) {
          if (currentState[y][x] != 0) {
            let bestSpot = x;
            check: for (let x2 = x; x2 < 4; x2++) {
              console.log(`checking ${x2}`);
              if (x >= x2) {
                continue check;
              }
              if (currentState[y][x2] === 0) {
                console.log("found spot ", y, ",", x2);
                bestSpot = x2;
              } else if (currentState[y][x2] === currentState[y][x]) {
                console.log("found spot ", y, ",", x2);
                bestSpot = x2;
              } else {
                console.log("found full cell ", y, ",", x2);
                bestSpot = x2 - 1;
                break check;
              }
            }
            console.log("original ", x, ",", y, " best spot", bestSpot);
            if (newAdded.includes(bestSpot)) {
              bestSpot--;
            }
            if (bestSpot != x) {
              if (currentState[y][bestSpot] === 0) {
                currentState[y][bestSpot] = currentState[y][x];
              } else if (currentState[y][bestSpot] === currentState[y][x]) {
                currentState[y][bestSpot] = currentState[y][x] * 2;
                newAdded.push(bestSpot);
              }
              currentState[y][x] = 0;
            }
          }
        }
      }
    } else if (direction === "up") {
      for (let x = 0; x < 4; x++) {
        let newAdded: number[] = [];
        for (let y = 0; y < 4; y++) {
          if (currentState[y][x] != 0) {
            let bestSpot = y;
            check: for (let y2 = y; y2 >= 0; y2--) {
              console.log(`checking ${y2}`);
              if (y <= y2) {
                continue check;
              }
              if (currentState[y2][x] === 0) {
                console.log("found spot ", y2, ",", x);
                bestSpot = y2;
              } else if (currentState[y2][x] === currentState[y][x]) {
                console.log("found spot ", y2, ",", x);
                bestSpot = y2;
              } else {
                console.log("found full cell ", y2, ",", x);
                bestSpot = y2 + 1;
                break check;
              }
            }
            console.log("original ", x, ",", y, " best spot", bestSpot);
            if (newAdded.includes(bestSpot)) {
              bestSpot++;
            }
            if (bestSpot != y) {
              if (currentState[bestSpot][x] === 0) {
                currentState[bestSpot][x] = currentState[y][x];
              } else if (
                currentState[bestSpot][x] === currentState[bestSpot][x]
              ) {
                currentState[bestSpot][x] = currentState[y][x] * 2;
                newAdded.push(bestSpot);
              }
              currentState[y][x] = 0;
            }
          }
        }
      }
    } else if (direction === "down") {
      for (let x = 0; x < 4; x++) {
        let newAdded: number[] = [];
        for (let y = 3; y >= 0; y--) {
          if (currentState[y][x] != 0) {
            let bestSpot = y;
            check: for (let y2 = y; y2 < 4; y2++) {
              console.log(`checking ${y2}`);
              if (y >= y2) {
                continue check;
              }
              if (currentState[y2][x] === 0) {
                console.log("found spot ", y2, ",", x);
                bestSpot = y2;
              } else if (currentState[y2][x] === currentState[y][x]) {
                console.log("found spot ", y2, ",", x);
                bestSpot = y2;
              } else {
                console.log("found full cell ", y2, ",", x);
                bestSpot = y2 - 1;
                break check;
              }
            }
            console.log("original ", x, ",", y, " best spot", bestSpot);
            if (newAdded.includes(bestSpot)) {
              bestSpot--;
            }
            if (bestSpot != y) {
              if (currentState[bestSpot][x] === 0) {
                currentState[bestSpot][x] = currentState[y][x];
              } else if (currentState[bestSpot][x] === currentState[y][x]) {
                currentState[bestSpot][x] = currentState[y][x] * 2;
                newAdded.push(bestSpot);
              }
              currentState[y][x] = 0;
            }
          }
        }
      }
    }
  };

  const createCell = (currentState: GameData) => {
    const random = Math.random();
    const emptyCells = getEmptyCells(currentState);
    if (emptyCells.length === 0) return;
    const cell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newValue = random > 0.2 ? 2 : 4;
    currentState[cell.y][cell.x] = newValue;
  };

  const newGame = () => {
    const newState = initializeGame();
    setGameState(newState);
    createCell(newState);
    createCell(newState);
  };
  const handleKeyPress = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
        onSwipe("left");
        break;
      case "ArrowRight":
        onSwipe("right");
        break;
      case "ArrowUp":
        onSwipe("up");
        break;
      case "ArrowDown":
        onSwipe("down");
        break;
    }
  };

  useEffect(() => {
    // Add event listener for web
    if (Platform.OS === "web") {
      window.addEventListener("keydown", handleKeyPress);
    } else {
      return;
    }

    // Cleanup event listener on unmount
    return () => {
      if (Platform.OS === "web") {
        window.removeEventListener("keydown", handleKeyPress);
      }
    };
  }, []);

  const onSwipe = (direction: string) => {
    switch (direction) {
      case "left": {
        setGameState((currentState) => {
          const newState = [...currentState.map((row) => [...row])] as GameData;
          moveDirection(newState, "left");
          if (JSON.stringify(newState) === JSON.stringify(currentState)) {
            return newState;
          }
          createCell(newState);
          return newState;
        });
        break;
      }
      case "right": {
        setGameState((currentState) => {
          const newState = [...currentState.map((row) => [...row])] as GameData;
          moveDirection(newState, "right");
          if (JSON.stringify(newState) === JSON.stringify(currentState)) {
            return newState;
          }
          createCell(newState);
          return newState;
        });
        break;
      }
      case "up": {
        setGameState((currentState) => {
          const newState = [...currentState.map((row) => [...row])] as GameData;
          moveDirection(newState, "up");
          if (JSON.stringify(newState) === JSON.stringify(currentState)) {
            return newState;
          }
          createCell(newState);
          return newState;
        });
        break;
      }
      case "down": {
        setGameState((currentState) => {
          const newState = [...currentState.map((row) => [...row])] as GameData;
          moveDirection(newState, "down");
          if (JSON.stringify(newState) === JSON.stringify(currentState)) {
            return newState;
          }
          createCell(newState);
          return newState;
        });
        break;
      }
      default: {
        console.log("Undetected action");
      }
    }
  };

  return (
    <SwipeGesture
      gestureStyle={styles.swipesGestureContainer}
      onSwipePerformed={onSwipe}
    >
      <Button title={"New Game"} onPress={newGame} />
      <View style={styles.container}>
        <View style={styles.gameBox}>
          {gameState.flat().map((value, index) => {
            const x = index % 4;
            const y = Math.floor(index / 4);
            return <GridCell key={`${x}-${y}`} x={x} y={y} value={value} />;
          })}
        </View>
      </View>
    </SwipeGesture>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  swipesGestureContainer: {
    height: "100%",
    width: "100%",
  },
  gameBox: {
    width: 300,
    height: 300,
    alignSelf: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    margin: 5,
    borderRadius: 5,
    borderWidth: 10,
  },
});
