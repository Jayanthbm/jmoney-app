// components/DailyLimitCard.js

import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import MyCard from "./MyCard";
import React from "react";

const DailyLimitCard = ({ limit, remaining, spent, loading, onClick }) => {

   const theme = useTheme();
   const formattedLimit = limit ? `Limit: ₹${limit.toLocaleString("en-IN")}` : "";
   const remainingColor = remaining <= 0 ? {
      color: theme.colors.expense
   } : {
      color: theme.colors.income
   };

   return (
      <MyCard title="Daily Limit" subTitle={formattedLimit} loading={loading} onClick={onClick}>

         {/* Content Row */}
         <View style={styles.row}>
            {/* Remaining Column */}
            <View style={styles.column}>
               <Text style={styles.label}>Remaining</Text>
               <Text style={[styles.amount, remainingColor]}>
                  ₹{remaining.toLocaleString("en-IN")}
               </Text>
            </View>

            {/* Vertical Divider */}
            <View style={[styles.divider, { backgroundColor: theme.colors.outline }]} />

            {/* Spent Column */}
            <View style={styles.column}>
               <Text style={styles.label}>Spent</Text>
               <Text style={[styles.amount, {
                  color: theme.colors.expense
               }]}>₹{spent.toLocaleString("en-IN")}</Text>
            </View>
         </View>

      </MyCard >
   );
};

const styles = StyleSheet.create({
   row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
   },
   column: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
   },
   label: {
      fontSize: 20,
      color: "#666",
      marginBottom: 2,
      marginTop: 8,
   },
   amount: {
      fontSize: 22,
      fontWeight: 700,
      marginTop: 2,
   },
   divider: {
      width: 1,
      height: "60%",
      marginHorizontal: 12,
   },
});

export default DailyLimitCard;