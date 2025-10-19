// components/CurrentTrendsCard.js

import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import AnimatedCircularProgress from "./AnimatedCircularProgress";
import MyCard from "./MyCard";
import dayjs from "dayjs";

const CurrentTrendsCard = ({ loading, expense = 0, income = 0, type = "month" }) => {
   const theme = useTheme();
   const now = dayjs();
   const formattedMonth = now.format("MMMM YYYY");
   const formattedYear = now.format('YYYY');

   const { spentPercentage } = useMemo(() => {
      const remainingAmount = income - expense;
      const percent = income > 0 ? (expense / income) * 100 : 0;
      return {
         remaining: remainingAmount,
         spentPercentage: Math.round(percent),
      };
   }, [income, expense]);

   let title = type === 'month' ? "This Month" : "Current Year";
   let subTitle = type === 'month' ? formattedMonth : formattedYear;

   return (
      <MyCard title={title} subTitle={subTitle} loading={loading}>
         <View style={styles.row}>
            {/* Left Column */}
            <View style={styles.leftColumn}>
               {/* Expense */}
               <View style={styles.barContainer}>
                  <View
                     style={[styles.bar, { backgroundColor: theme.colors.expense }]}
                  />
                  <View style={styles.amountContainer}>
                     <Text
                        variant="titleMedium"
                        style={[styles.amount, { color: theme.colors.expense }]}
                     >
                        ₹{expense.toLocaleString("en-IN")}
                     </Text>
                     <Text
                        variant="bodySmall"
                        style={{ color: theme.colors.onSurfaceVariant }}
                     >
                        EXPENSE
                     </Text>
                  </View>
               </View>

               {/* Income */}
               <View style={styles.barContainer}>
                  <View
                     style={[styles.bar, { backgroundColor: theme.colors.income }]}
                  />
                  <View style={styles.amountContainer}>
                     <Text
                        variant="titleMedium"
                        style={[styles.amount, { color: theme.colors.income }]}
                     >
                        ₹{income.toLocaleString("en-IN")}
                     </Text>
                     <Text
                        variant="bodySmall"
                        style={{ color: theme.colors.onSurfaceVariant }}
                     >
                        INCOME
                     </Text>
                  </View>
               </View>
            </View>

            {/* Right Column: Circular Progress */}
            <View style={styles.rightColumn}>
               <AnimatedCircularProgress
                  value={spentPercentage}
                  valuePrefix={'%'}
                  currentValue={Math.min(spentPercentage, 100)}
                  totalValue={100}
                  text="Spent"
               />
            </View>
         </View>
      </MyCard>
   );
};

const styles = StyleSheet.create({
   row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 8,
   },
   leftColumn: {
      flex: 2,
      justifyContent: "space-evenly",
      gap: 14,
   },
   rightColumn: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
   },
   barContainer: {
      flexDirection: "row",
      alignItems: "center",
   },
   bar: {
      width: 4,
      height: 40,
      borderRadius: 2,
      marginRight: 12,
   },
   amountContainer: {
      justifyContent: "center",
   },
   amount: {
      fontWeight: "600",
   },
});

export default CurrentTrendsCard;