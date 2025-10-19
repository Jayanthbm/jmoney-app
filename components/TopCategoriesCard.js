// components/TopCategoriesCard.js

import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import MyCard from "./MyCard";
import React from "react";
import dayjs from "dayjs";

const TopCategoriesCard = React.memo(({ loading, data }) => {
   const theme = useTheme();

   const now = dayjs();
   const formattedStart = now.startOf("month").format("DD/MM/YYYY");
   const formattedEnd = now.endOf("month").format("DD/MM/YYYY");
   const subTitle = `${formattedStart} - ${formattedEnd}`;

   return (
      <MyCard title="Top Categories" subTitle={subTitle} loading={loading}>
         <View style={styles.container}>
            {data.map((item, i) => (
               <View key={i} style={styles.row}>
                  {/* Colored vertical line */}
                  <View
                     style={[
                        styles.colorBar,
                        { backgroundColor: item.color },
                     ]}
                  />

                  {/* Text content */}
                  <View style={styles.textContainer}>
                     <Text
                        variant="titleMedium"
                        style={[
                           styles.categoryName,
                           { color: theme.colors.onSurface },
                        ]}
                     >
                        {item.name}
                     </Text>
                     <Text
                        variant="bodySmall"
                        style={{ color: theme.colors.onSurfaceVariant }}
                     >
                        ₹{item.amount.toLocaleString("en-IN")} • {item.percent}%
                     </Text>
                  </View>
               </View>
            ))}
         </View>
      </MyCard>
   );
});

const styles = StyleSheet.create({
   container: {
      marginTop: 8,
      gap: 14,
   },
   row: {
      flexDirection: "row",
      alignItems: "center",
   },
   colorBar: {
      width: 5,
      height: 32,
      borderRadius: 3,
      marginRight: 12,
      opacity: 0.9,
   },
   textContainer: {
      flex: 1,
      justifyContent: "center",
   },
   categoryName: {
      fontWeight: "600",
   },
});

export default TopCategoriesCard;
