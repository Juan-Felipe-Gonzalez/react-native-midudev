import { useEffect, useMemo, useState } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import { getLatestGames } from "../lib/metacritic";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GameCard } from "./GameCard";

export function Main() {
  const [movies, setMovies] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getLatestGames().then((data) => {
      setMovies(data);
    });
  }, []);

  const moviesForList = useMemo(
    () =>
      movies.map((movie) => ({
        ...movie,
        score: Number.parseFloat(movie.score).toFixed(1),
      })),
    [movies]
  );

  return (
    <View style={{ paddingBottom: insets.bottom, paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right}}>
      {movies.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <FlatList
          data={moviesForList}
          keyExtractor={(movie) => String(movie.slug)}
          renderItem={({ item }) => <GameCard movie={item} />}
        />
      )}
    </View>
  );
}
