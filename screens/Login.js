// screens/Login.js

import {
   Animated,
   Easing,
   KeyboardAvoidingView,
   Platform,
   ScrollView,
   StyleSheet,
   TouchableWithoutFeedback,
   View,
} from "react-native";
import {
   Button,
   Snackbar,
   Text,
   TextInput,
   useTheme,
} from "react-native-paper";
import React, { useRef, useState } from "react";

import { supabase } from "../supabaseClient";

const Login = ({ onLoginSuccess }) => {
   const theme = useTheme();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [secureText, setSecureText] = useState(true);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const [showSnackbar, setShowSnackbar] = useState(false);

   // --- Animations ---
   const scaleAnim = useRef(new Animated.Value(1)).current;
   const rippleOpacity = useRef(new Animated.Value(0)).current;
   const rippleScale = useRef(new Animated.Value(0)).current;

   const animatePressIn = () => {
      Animated.spring(scaleAnim, {
         toValue: 0.97,
         useNativeDriver: true,
      }).start();
   };

   const animatePressOut = () => {
      Animated.spring(scaleAnim, {
         toValue: 1,
         friction: 3,
         tension: 200,
         useNativeDriver: true,
      }).start();
   };

   const triggerRipple = () => {
      rippleOpacity.setValue(0.3);
      rippleScale.setValue(0);
      Animated.parallel([
         Animated.timing(rippleOpacity, {
            toValue: 0,
            duration: 600,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
         }),
         Animated.timing(rippleScale, {
            toValue: 1,
            duration: 600,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
         }),
      ]).start();
   };

   const handleLogin = async () => {
      setLoading(true);
      setError("");

      if (!email || !password) {
         setError("Please enter both email and password.");
         setShowSnackbar(true);
         setLoading(false);
         return;
      }

      triggerRipple();

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);

      if (error) {
         setError(error.message);
         setShowSnackbar(true);
         return;
      }

      onLoginSuccess?.();
   };

   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : "height"}
         style={{ flex: 1, backgroundColor: theme.colors.background }}
      >
         <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
         >
            <View style={styles.innerContainer}>
               <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onBackground }]}>
                  JMoney
               </Text>

               <TextInput
                  label="Email"
                  mode="outlined"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textColor={theme.colors.onBackground}
                  outlineColor={theme.colors.outline}
                  activeOutlineColor={theme.colors.focus}
                  selectionColor={theme.colors.focus}
               />

               <TextInput
                  label="Password"
                  mode="outlined"
                  secureTextEntry={secureText}
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
                  textColor={theme.colors.onBackground}
                  outlineColor={theme.colors.outline}
                  activeOutlineColor={theme.colors.focus}
                  selectionColor={theme.colors.focus}
                  right={
                     <TextInput.Icon
                        icon={secureText ? "eye-off-outline" : "eye-outline"}
                        onPress={() => setSecureText(!secureText)}
                     />
                  }
               />

               <TouchableWithoutFeedback
                  onPressIn={animatePressIn}
                  onPressOut={animatePressOut}
                  onPress={handleLogin}
               >
                  <Animated.View
                     style={[
                        styles.animatedButton,
                        {
                           transform: [{ scale: scaleAnim }],
                           backgroundColor: theme.colors.primary,
                        },
                     ]}
                  >
                     <Animated.View
                        style={[
                           styles.ripple,
                           {
                              backgroundColor: theme.colors.onPrimary,
                              opacity: rippleOpacity,
                              transform: [{ scale: rippleScale }],
                           },
                        ]}
                     />
                     <Button
                        mode="text"
                        loading={loading}
                        textColor={theme.colors.onPrimary}
                        style={styles.button}
                        disabled={loading}
                     >
                        {loading ? "Signing in..." : "Login"}
                     </Button>
                  </Animated.View>
               </TouchableWithoutFeedback>
            </View>
         </ScrollView>

         <Snackbar
            visible={showSnackbar}
            onDismiss={() => setShowSnackbar(false)}
            duration={3000}
            style={{ backgroundColor: theme.colors.error }}
         >
            {error}
         </Snackbar>
      </KeyboardAvoidingView>
   );
};

const styles = StyleSheet.create({
   scrollContainer: { flexGrow: 1, justifyContent: "center", padding: 20 },
   innerContainer: { flex: 1, justifyContent: "center" },
   title: { textAlign: "center", marginBottom: 30, fontWeight: "bold" },
   input: { marginBottom: 15 },
   animatedButton: {
      marginTop: 10,
      borderRadius: 10,
      overflow: "hidden",
      alignItems: "center",
   },
   button: {
      width: "100%",
   },
   ripple: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      borderRadius: 10,
   },
});

export default Login;
