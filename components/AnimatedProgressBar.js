// components/AnimatedProgressBar.js

import { Animated, Easing, StyleSheet, View } from "react-native";
import React, { useEffect, useRef } from "react";

import { useTheme } from "react-native-paper";

const AnimatedProgressBar = ({ progress = 0 }) => {
   const theme = useTheme();

   const animatedWidth = useRef(new Animated.Value(0)).current;
   const trackOpacity = useRef(new Animated.Value(0.3)).current; // subtle shimmer/fade

   useEffect(() => {
      // Animate progress bar width
      Animated.timing(animatedWidth, {
         toValue: progress,
         duration: 1200,
         easing: Easing.out(Easing.cubic),
         useNativeDriver: false,
      }).start();

      // Animate track opacity for shimmer effect
      Animated.loop(
         Animated.sequence([
            Animated.timing(trackOpacity, {
               toValue: 0.5,
               duration: 800,
               easing: Easing.inOut(Easing.ease),
               useNativeDriver: false,
            }),
            Animated.timing(trackOpacity, {
               toValue: 0.3,
               duration: 800,
               easing: Easing.inOut(Easing.ease),
               useNativeDriver: false,
            }),
         ])
      ).start();
   }, [progress]);

   const widthInterpolate = animatedWidth.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"],
   });

   return (
      <View style={styles.container}>
         <Animated.View
            style={[
               styles.track,
               { backgroundColor: `rgba(0,0,0,${trackOpacity.__getValue()})` },
            ]}
         />
         <Animated.View
            style={[
               styles.bar,
               { width: widthInterpolate, backgroundColor: theme.colors.primary },
            ]}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      marginTop: 4,
      borderRadius: 12,
      height: 10,
      overflow: "hidden",
   },
   track: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.1)",
   },
   bar: {
      height: "100%",
      borderRadius: 12,
   },
});

export default AnimatedProgressBar;
