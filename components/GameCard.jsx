import { useMemo, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function GameCard({ movie }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View key={movie.slug} style={styles.card}>
      <View style={styles.contenedor}>
        <Image source={{ uri: movie.image }} style={styles.image} />

        <View style={styles.relaseBox}>
          <Text style={styles.relaseDate}>
            Relase date: {movie.releaseDate}
          </Text>
        </View>

        <Text style={styles.title}>{movie.title}</Text>

        <TouchableOpacity onPress={() => toggleExpand(movie.id)}>
          <Text
            style={styles.description}
            numberOfLines={expandedId === movie.id ? null : 3}
            ellipsizeMode="tail"
          >
            {movie.description}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.viewBox}>
        <View style={styles.viewScore}>
          <Text style={styles.score}>{movie.score}</Text>
        </View>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
  },
  contenedor: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 10,
  },
  image: {
    width: 107,
    height: 147,
    borderRadius: 10,
  },
  relaseBox: {
    padding: 8,
    width: "100%",
    borderTopColor: "#757f8d",
    borderTopWidth: 1,
    borderBottomColor: "#757f8d",
    borderBottomWidth: 1,
    marginTop: 5,
    marginBottom: 5,
    alignItems: "center",
  },
  relaseDate: {
    fontSize: 15,
    color: "#757f8d",
  },
  title: {
    fontSize: 25,
    fontWeight: "900",
    color: "black",
  },
  description: {
    fontSize: 16,
    color: "#757f8d",
  },
  viewBox: {
    alignItems: "flex-end"
  },
  viewScore: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#112447",
    width: "20%"
  },
  score: {
    fontSize: 16,
    color: "#fff",
  },
});
