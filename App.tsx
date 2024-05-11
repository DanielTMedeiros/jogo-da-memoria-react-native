import { useState, useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

import img0 from "../memory-game/images/img0.png";
import img1 from "../memory-game/images/img1.png";
import img2 from "../memory-game/images/img2.png";
import img3 from "../memory-game/images/img3.png";
import imgCover from "../memory-game/images/imgCover.png";

const cartasIniciais = [
  { index: 0, source: img0, facePraCima: false },
  { index: 1, source: img1, facePraCima: false },
  { index: 2, source: img2, facePraCima: false },
  { index: 3, source: img3, facePraCima: false },
];

const App = () => {
  const [lastRevealedCard, setLastRevealedCard] = useState([]);
  const [cartas, setCartas] = useState(
    [...cartasIniciais, ...cartasIniciais].sort(() => Math.random() - 0.5)
  );

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {cartas.map((carta, indice) => (
          <TouchableOpacity key={indice}>
            <Image
              style={styles.image}
              source={carta.facePraCima ? carta.source : imgCover}
            />
          </TouchableOpacity>
        ))}
      </View>
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
});

export default App;
