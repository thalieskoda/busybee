import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import "react-native-url-polyfill/auto";
import { Session } from "@supabase/supabase-js";
//components
import supabase from "./supabase/Supabase";
import HomeScreen from "./component/HomeScreen";
import UserAuth from "./component/UserAuth";
import Account from "./component/Account";

const App = () => {
  const [session, setSession] = useState(null);


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <SafeAreaView style={styles.mainView}>
      {/* Splash Screen eventually */}
      <View>
        {session && session.user ? (
          <Account key={session.user.id} session={session} />
        ) : (
          <View style={styles.authContainer}>
          <UserAuth />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "#F8F9FD",
    flex: 1,
  },
  authContainer:{

  }
});
