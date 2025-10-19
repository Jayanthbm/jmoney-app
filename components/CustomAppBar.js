// components/CustomAppBar.js

import { Appbar, useTheme } from "react-native-paper";
import { Image, StyleSheet } from "react-native";

import React from "react";

const CustomAppBar = ({ title }) => {
   const theme = useTheme();

   return (
      <Appbar.Header
         mode="center-aligned"
         style={[
            styles.header,
            { backgroundColor: "transparent", elevation: 0 },
         ]}
      >
         {/* Logo on the left */}
         <Image
            source={require("../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
         />
         {/* Optional title */}
         {title && (
            <Appbar.Content
               title={title}
               titleStyle={{ color: theme.colors.onBackground, fontWeight: "bold" }}
            />
         )}
      </Appbar.Header>
   );
};

const styles = StyleSheet.create({
   header: {
      shadowOpacity: 0,
      elevation: 0,
      paddingHorizontal: 8,
   },
   logo: {
      width: 36,
      height: 36,
   },
});

export default CustomAppBar;