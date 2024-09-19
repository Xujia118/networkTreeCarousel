import React, { useState, useRef } from "react";
import {
  View,
  FlatList,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const { width } = Dimensions.get("window");

const SliderPagination = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  // Scroll Logic
  const ITEM_WIDTH = width / 3;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.itemContainer, { width: ITEM_WIDTH }]}>
      <TouchableOpacity
        style={[styles.item, index === currentIndex && styles.activeItem]}
        onPress={() => handleItemPress(index)}
      >
        <Text>{item}</Text>
      </TouchableOpacity>
    </View>
  );

  const handleItemPress = (index) => {
    scrollToIndex(index);
    setCurrentIndex(index);
  };

  const scrollToIndex = (index) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    }
  };

  // Pagination Logic
  const handlePrevPress = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    handleItemPress(newIndex);
  };

  const handleNextPress = () => {
    const newIndex = Math.min(data.length - 1, currentIndex + 1);
    handleItemPress(newIndex);
  };

  const renderPaginationDots = () => {
    const totalDots = data.length > 7 ? 7 : data.length;
    const dots = [];
    let start = 0;
    let end = totalDots;

    if (currentIndex < 3) {
      start = 0;
      end = totalDots;
    } else if (currentIndex > data.length - 4) {
      start = Math.max(data.length - 7, 0);
      end = data.length;
    } else {
      start = currentIndex - 3;
      end = currentIndex + 4;
    }

    for (let i = start; i < end; i++) {
      dots.push(
        <TouchableOpacity key={i} onPress={() => handleItemPress(i)}>
          <View
            style={[
              styles.dot,
              i === currentIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        </TouchableOpacity>
      );
    }
    return dots;
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={onViewableItemsChanged}
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast" 
          contentContainerStyle={{
            paddingHorizontal: (width - ITEM_WIDTH * 3) / 2,
          }}
        />
      </View>
      <View style={styles.paginationContainer}>
        <TouchableOpacity style={styles.arrowButton} onPress={handlePrevPress}>
          <Text style={styles.arrowText}>{"<"}</Text>
        </TouchableOpacity>
        {renderPaginationDots()}
        <TouchableOpacity style={styles.arrowButton} onPress={handleNextPress}>
          <Text style={styles.arrowText}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 50,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  activeItem: {
    backgroundColor: "gray",
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "black",
  },
  inactiveDot: {
    backgroundColor: "gray",
  },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default SliderPagination;
