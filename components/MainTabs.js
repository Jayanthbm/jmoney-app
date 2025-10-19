// components/MainTabs.js

import { Animated, StyleSheet, View } from "react-native";
import { Icon, useTheme } from "react-native-paper";

import Budgets from "../screens/Budgets";
import Goals from "../screens/Goals";
import Overview from "../screens/Overview";
import React from "react";
import Reports from "../screens/Reports";
import Settings from "../screens/Settings";
import Transactions from "../screens/Transactions";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const tabs = [
   { name: "Overview", icon: "view-dashboard-outline", activeIcon: "view-dashboard" },
   { name: "Transactions", icon: "swap-horizontal", activeIcon: "swap-horizontal-bold" },
   { name: "Budgets", icon: "wallet-outline", activeIcon: "wallet" },
   { name: "Goals", icon: "target", activeIcon: "target" },
   { name: "Reports", icon: "chart-line", activeIcon: "chart-line" },
   { name: "Settings", icon: "cog-outline", activeIcon: "cog" },
];

const MainTabs = () => {
   const theme = useTheme();

   return (
      <>
         <Tab.Navigator
            screenOptions={({ route }) => ({
               headerShown: false,
               tabBarShowLabel: true,
               tabBarStyle: {
                  backgroundColor: theme.colors.surfaceVariant,
                  borderTopWidth: 0,
                  elevation: 8,
                  height: 80,
               },
               tabBarLabelStyle: {
                  fontSize: 12,
                  fontWeight: "500",
                  marginTop: 5,
               },
               tabBarActiveTintColor: theme.colors.onActiveIndicator,
               tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
               tabBarIcon: ({ color, focused }) => {
                  const tab = tabs.find(t => t.name === route.name);
                  const iconName = focused ? tab.activeIcon : tab.icon;

                  return (
                     <View style={styles.iconContainer}>
                        {focused && (
                           <Animated.View
                              style={[
                                 styles.activePill,
                                 { backgroundColor: theme.colors.activeIndicator },
                              ]}
                           />
                        )}
                        <Icon source={iconName} size={26} color={focused ? theme.colors.onActiveIndicator : color} />
                     </View>
                  );
               },
               tabBarIconStyle: {
                  marginTop: 5,
               }
            })}
         >
            {tabs.map(tab => (
               <Tab.Screen key={tab.name} name={tab.name} component={
                  {
                     Overview,
                     Transactions,
                     Budgets,
                     Goals,
                     Reports,
                     Settings,
                  }[tab.name]
               } />
            ))}
         </Tab.Navigator>
      </>
   );
};

const styles = StyleSheet.create({
   iconContainer: {
      alignItems: "center",
      justifyContent: "center",
      width: 60,
      height: 40,
   },
   activePill: {
      position: "absolute",
      width: 56,
      height: 36,
      borderRadius: 18,
      opacity: 1,
   },
});

export default MainTabs;
