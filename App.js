import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

//components
import supabase from "./supabase/supabase";
import HomeScreen from "./component/HomeScreen";
import LoginScreen from "./component/LoginScreen";

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    return (
      <SafeAreaView style={styles.mainView}>
        <View>
          <LoginScreen/>
          <HomeScreen />
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});

export default App;
