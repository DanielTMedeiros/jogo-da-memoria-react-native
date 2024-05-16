import { useState, useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";

import img0 from "../memory-game/images/img0.png";
import img1 from "../memory-game/images/img1.png";
import img2 from "../memory-game/images/img2.png";
import img3 from "../memory-game/images/img3.png";
import imgCover from "../memory-game/images/imgCover.png";

const cartasIniciais = [
  { index: 0, source: img0, faceUp: false },
  { index: 1, source: img1, faceUp: false },
  { index: 2, source: img2, faceUp: false },
  { index: 3, source: img3, faceUp: false },
];

const App = () => {
  const [openCards, setOpenCards] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [cartas, setCartas] = useState(
    [...cartasIniciais, ...cartasIniciais].sort(() => Math.random() - 0.5)
  );

  useEffect(() => {
    if (checkAllCardsFaceUp()) {
      setGameWon(true);
    }
  }, [cartas]);

  const checkAllCardsFaceUp = () => {
    return cartas.every((card) => card.faceUp);
  };

  const flipCard = (index) => {
    if (openCards.length === 2 || cartas[index].faceUp) return;

    const newCartas = cartas.map((card, i) => {
      if (i === index) {
        return { ...card, faceUp: !card.faceUp };
      }
      return card;
    });

    const flippedCards = [...openCards, index];
    if (flippedCards.length === 2) {
      const match =
        newCartas[flippedCards[0]].source === newCartas[flippedCards[1]].source;
      setTimeout(() => {
        if (!match) {
          const resetCards = newCartas.map((card, i) => {
            if (flippedCards.includes(i)) {
              return { ...card, faceUp: false };
            }
            return card;
          });
          setCartas(resetCards);
        }
        setOpenCards([]);
      }, 1000);
    } else {
      setOpenCards(flippedCards);
    }

    setCartas(newCartas);
  };

  return (
    <View style={styles.container}>
      {gameWon ? (
        <Text style={styles.congratsMessage}>
          Parabéns! Você venceu o jogo!
        </Text>
      ) : (
        <View style={styles.grid}>
          {cartas.map((carta, indice) => (
            <TouchableOpacity key={indice} onPress={() => flipCard(indice)}>
              <Image
                style={styles.image}
                source={carta.faceUp ? carta.source : imgCover}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 6,
    marginLeft: 6,
    backgroundColor: "#fff",
  },
  congratsMessage: {
    fontSize: 24,
    color: "blue",
    padding: 20,
    textAlign: "center",
  },
});

export default App;
