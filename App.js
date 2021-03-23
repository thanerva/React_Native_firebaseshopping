import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
  Alert,
} from "react-native";
import * as firebase from "firebase";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbTL30ZOiGWk9f8UL-URvB4eZEaUfyRUs",
  authDomain: "testi-7dd4c.firebaseapp.com",
  databaseURL: "https://testi-7dd4c-default-rtdb.firebaseio.com",
  projectId: "testi-7dd4c",
  storageBucket: "testi-7dd4c.appspot.com",
  messagingSenderId: "725080913860",
  appId: "1:725080913860:web:f9dba4d7146fb398179691",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function App() {
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [items, setItems] = useState([]);
  useEffect(() => {
    firebase
      .database()
      .ref("items/")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        const prods = Object.values(data);
        setItems(prods); // Could be done with setItems(Object.values(snapshot.val())) also
      });
  }, []);

  const saveItem = () => {
    if (amount && product) {
      firebase
        .database()
        .ref("items/")
        .push({ product: product, amount: amount });
    } else {
      Alert.alert("Error", "Type product and amount first");
    }
  };

  const listSeperator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%",
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Product"
        style={{
          marginTop: 30,
          fontSize: 18,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
        }}
        onChangeText={(product) => setProduct(product)}
        value={product}
      />
      <TextInput
        placeholder="Amount"
        style={{
          marginTop: 5,
          marginBottom: 5,
          fontSize: 18,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
        }}
        onChangeText={(amount) => setAmount(amount)}
        value={amount}
      />
      <Button onPress={saveItem} title="Save" />
      <Text style={{ marginTop: 30, fontSize: 20 }}>Shoppinglist</Text>
      <FlatList
        style={{ marginLeft: "5%" }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.listcontainer}>
            <Text style={{ fontSize: 18 }}>
              {item.product}, {item.amount}
            </Text>
            <Text style={{ fontSize: 18, color: "#0000ff" }}> Bought</Text>
          </View>
        )}
        data={items}
        ItemSeparatorComponent={listSeperator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  listcontainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
