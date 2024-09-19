// Import React libraries
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

// Import custom files
import { fetchStates } from "../services";

// Import components
import SliderPagination from "./SliderPagination";

const index = () => {
  const [states, setStates] = useState([]);

  function onLoadStates() {
    fetchStates()
      .then((data) => {
        setStates(data.states);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    onLoadStates();
  }, []);

  return (
    <View>
      <Text style={styles.text}>Savings carousel text</Text>
      <SliderPagination data={states}/>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 50,
    padding: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default index;
