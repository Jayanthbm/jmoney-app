// components/PayDayCard.js

import { Animated, StyleSheet, View } from "react-native";
import React, { useEffect, useMemo, useRef, } from "react";
import { Text, useTheme } from "react-native-paper";

import AnimatedCircularProgress from "./AnimatedCircularProgress";
import MyCard from "./MyCard";
import dayjs from "dayjs";

const PayDayCard = React.memo(() => {
   const theme = useTheme();

   const { payDay, daysInMonth, currentDay, remainingDays, dotsArray } = useMemo(() => {
      const now = dayjs();
      const payDayDate = now.add(1, "month").startOf("month").format("MMM DD");
      const totalDays = now.daysInMonth();
      const today = now.date();
      const remaining = totalDays - today;

      const dots = Array.from({ length: totalDays }).map((_, i) => i + 1 > today);

      return {
         payDay: payDayDate,
         daysInMonth: totalDays,
         currentDay: today,
         remainingDays: remaining,
         dotsArray: dots,
      };
   }, []);

   // Animate dots sequentially
   const dotAnimations = useRef(dotsArray.map(() => new Animated.Value(0))).current;

   useEffect(() => {
      const animations = dotAnimations.map((anim, index) =>
         Animated.timing(anim, {
            toValue: 1,
            duration: 300,
            delay: index * 50,
            useNativeDriver: false,
         })
      );
      Animated.stagger(30, animations).start();
   }, [dotAnimations]);

   const renderDots = () => {
      const perRow = 7;
      const rows = [];
      for (let i = 0; i < dotsArray.length; i += perRow) {
         rows.push(dotsArray.slice(i, i + perRow));
      }

      return rows.map((row, rowIndex) => (
         <View key={rowIndex} style={styles.dotsRow}>
            {row.map((isUpcoming, index) => (
               <Animated.View
                  key={index}
                  style={[
                     styles.dot,
                     {
                        backgroundColor: isUpcoming ? theme.colors.primary : "#BDBDBD",
                        opacity: dotAnimations[rowIndex * perRow + index],
                     },
                  ]}
               />
            ))}
         </View>
      ));
   };

   return (
      <MyCard title="Pay Day" subTitle="Days until next salary">
         <View style={styles.row}>
            {/* Left Column: Salary date & dots */}
            <View style={styles.leftColumn}>
               <Text variant="headlineSmall" style={{ fontWeight: "600", marginBottom: 5 }}>
                  {payDay}
               </Text>
               {renderDots()}
            </View>

            {/* Right Column: Circular Progress */}
            <View style={styles.rightColumn}>
               <AnimatedCircularProgress currentValue={remainingDays} totalValue={daysInMonth} value={remainingDays} text="Days" />
            </View>

         </View>
      </MyCard>
   );
});

const styles = StyleSheet.create({
   row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 8,
   },
   leftColumn: {
      flex: 2,
      alignItems: "flex-start",
   },
   rightColumn: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
   },
   dotsRow: {
      flexDirection: "row",
      marginTop: 4,
   },
   dot: {
      width: 12,
      height: 12,
      borderRadius: 7.5,
      margin: 2,
   },
});

export default PayDayCard;
