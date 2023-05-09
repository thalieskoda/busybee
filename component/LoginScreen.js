import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Auth } from "@supabase/auth-ui-react";

//Login Screen - authenticator
const LoginScreen = ()=> {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn } = Auth();
  
    //code from Supabase
    const handleLogin = async () => {
      const { error } = await signIn({ email, password });
      if (error) {
        console.log(error);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    input: {
      width: "80%",
      height: 40,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 20,
    },
  });

export default LoginScreen;