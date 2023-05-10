import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
} from "react-native";

const UserAuth = ({ supabase }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
    setEmail("");
    setPassword("");
  };

  const signUpWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);

    setEmail("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Busybee</Text>
      <Image source={require("../assets/honey2.webp")} style={styles.image} />
      <View style={styles.input}>
        <TextInput
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          placeholderTextColor="#000"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="#000"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.buttons}>
        <View>
          <TouchableOpacity
            style={styles.button}
            title="Sign in"
            disabled={loading}
            onPress={() => signInWithEmail()}
          >
            <Text style={styles.textButton}>Sign in</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            title="Sign up"
            disabled={loading}
            onPress={() => signUpWithEmail()}
          >
            <Text style={styles.textButton}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserAuth;

const styles = StyleSheet.create({
  container: {
    //  marginTop: "30%",
    padding: 12,
    display: "flex",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 300,
  },
  input: {
    padding: 10,
    margin: 10,
    justifyContent: "center",
    borderWidth: 1,
    width: "100%",
    borderColor: "rgba(0,0,0,0.20)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  button: {
    width: 100,
    height: 50,
    margin: 60,
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "rgba(0,0,0,0.20)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.46,
    elevation: 9,
  },
  buttons: {
    flexDirection: "row",
  },
  textButton: {
    textAlign: "center",
    paddingTop: 15,
  },
  image: {
    zIndex: -1,
    position: "absolute",
    top: 150,
  },
});
