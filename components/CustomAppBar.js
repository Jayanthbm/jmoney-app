// components/CustomAppBar.js

import { Appbar, useTheme } from "react-native-paper";
import { Image, StyleSheet, View } from "react-native";

import React from "react";

const CustomAppBar = ({ navigation, onLogout }) => {
   const theme = useTheme();

   return (
      <Appbar.Header
         style={[styles.header, { backgroundColor: "transparent", elevation: 0 }]}
      >
         {/* Logo on the left */}
         <Image
            source={require("../assets/logo.png")}
            style={styles.logo}
            resizeMode="cover"
         />

         {/* Spacer to push icons to the right */}
         <View style={{ flex: 1 }} />

         {/* Action icons on the right */}
         <Appbar.Action
            icon="cog-outline"
            color={theme.colors.onBackground}
            onPress={() => navigation.navigate("Settings")}
         />
         <Appbar.Action
            icon="logout"
            color={theme.colors.onBackground}
            onPress={onLogout}
         />
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