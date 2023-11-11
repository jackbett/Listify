import React, { useContext, useState, useRef, useEffect } from "react";
import { View, TextInput, Text, Keyboard, TouchableWithoutFeedback, FlatList, Image, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../contexts/AuthContext";

const SpotifySearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { state } = useContext(AuthContext);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);
  const searchTimeout = useRef(null);

  useEffect(() => {
    // Cleanup function to cancel the previous search request
    return () => {
      clearTimeout(searchTimeout.current);
    };
  }, []);

  useEffect(() => {
    // Trigger search after a delay to wait for user input
    const delayedSearch = setTimeout(() => {
      handleSearch();
    }, 300);

    // Cleanup function to cancel the previous search request
    return () => {
      clearTimeout(delayedSearch);
    };
  }, [searchQuery]);

  const handleSearch = async () => {
    if (!state.accessToken) {
      console.log("Access token is not available");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&offset=${offset}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        
        // Only clear results if it's a new search
        setSearchResults(data.tracks.items);
        setOffset(offset + 20);
      } else {
        console.error("Error fetching search results:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching search results:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEndReached = () => {
    handleSearch();
  };

  const handleChangeText = (text) => {
    setSearchQuery(text);
  };

  const renderResultItem = ({ item }) => (
    <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 10, alignItems: "center" }}>
      <Image
        source={{ uri: item.album.images[0].url }}
        style={{ width: 50, height: 50, marginRight: 10, marginLeft: 10 }}
      />
      <View style={{ width: Dimensions.get("window").width * 0.9 - 90 }}>
        <Text style={{ color: "white", fontSize: 18 }} numberOfLines={1} ellipsizeMode="tail">
          {item.name}
        </Text>
        <Text style={{ color: "white" }} numberOfLines={1} ellipsizeMode="tail">
          by {item.artists.map(artist => artist.name).join(", ")}
        </Text>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={["#040306", "#131624"]}
      style={{ flex: 1, alignItems: "center", justifyContent: "top" }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ width: "80%", marginTop: 80, marginBottom: 20 }}>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1, color: "white", padding: 10 }}
            placeholder="What do you want to listen to?"
            placeholderTextColor="gray"
            onChangeText={handleChangeText}
            value={searchQuery}
            returnKeyType="search"
          />
        </View>
      </TouchableWithoutFeedback>

      {searchResults.length > 0 && (
        <FlatList
          ref={flatListRef}
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={renderResultItem}
          style={{ marginTop: 20, width: "100%" }}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
        />
      )}

      {loading && <Text>Loading...</Text>}
    </LinearGradient>
  );
};

export default SpotifySearchScreen;
