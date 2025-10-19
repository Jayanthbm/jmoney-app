// components/AnimatedCircularProgress.js

import { Animated, Easing, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Svg, { Circle } from "react-native-svg";
import { Text, useTheme } from "react-native-paper";

const AnimatedCircularProgress = ({ radius = 60, strokeWidth = 10, currentValue, totalValue, showText = true, value = 0, valuePrefix = "", text = '' }) => {

   const theme = useTheme()
   const adjustedRadius = radius - strokeWidth / 2; // subtract half stroke width
   const diameter = radius * 2;
   const progressAnimated = useRef(new Animated.Value(0)).current;

   const circumference = 2 * Math.PI * radius;

   // Animate text counter
   const remainingAnimated = useRef(new Animated.Value(0)).current;
   const [animatedRemaining, setAnimatedRemaining] = useState(0);

   useEffect(() => {
      const animation = Animated.timing(remainingAnimated, {
         toValue: value,
         duration: 1200,
         easing: Easing.out(Easing.cubic),
         useNativeDriver: false,
      });
      animation.start();

      const listener = remainingAnimated.addListener(({ value }) => {
         setAnimatedRemaining(Math.ceil(value));
      });

      return () => remainingAnimated.removeListener(listener);
   }, [value]);

   // Animate the progress ring
   useEffect(() => {
      Animated.timing(progressAnimated, {
         toValue: currentValue / totalValue,
         duration: 1200,
         easing: Easing.out(Easing.cubic),
         useNativeDriver: false,
      }).start();
   }, [currentValue, totalValue]);

   const strokeDashoffset = progressAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [circumference, 0],
   });

   const AnimatedCircle = Animated.createAnimatedComponent(Circle);
   return (
      <View style={{ width: diameter, height: diameter }}>
         <Svg width={diameter} height={diameter}>
            {/* Background circle */}
            <Circle
               cx={radius}
               cy={radius}
               r={adjustedRadius}
               stroke="#E0E0E0"
               strokeWidth={strokeWidth}
               fill="none"
            />
            {/* Animated foreground circle */}
            <AnimatedCircle
               cx={radius}
               cy={radius}
               r={adjustedRadius}
               stroke={theme.colors.primary}
               strokeWidth={strokeWidth}
               fill="none"
               strokeDasharray={`${2 * Math.PI * adjustedRadius}`}
               strokeDashoffset={strokeDashoffset}
               strokeLinecap="round"
               rotation="-90"
               origin={`${radius}, ${radius}`}
            />
         </Svg>
         {/* Centered Text */}
         {showText && (
            <View style={styles.centeredText}>
               <Text variant="headlineSmall" style={{ fontWeight: "600" }}>
                  {animatedRemaining}<Text variant="bodyMedium">{valuePrefix}</Text>
               </Text>
               <Text style={{ color: theme.colors.onSurfaceVariant }}>{text}</Text>
            </View>
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   centeredText: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
   },
});

export default AnimatedCircularProgress;