// components/MainTabs.js

import Budgets from '../screens/Budgets';
import CustomAppBar from './CustomAppBar';
import Goals from '../screens/Goals';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Overview from '../screens/Overview';
import React from 'react';
import Reports from '../screens/Reports';
import Transactions from '../screens/Transactions';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator();
const MainTabs = ({ navigation, onLogout }) => {
   const theme = useTheme();

   return (
      <>
         <CustomAppBar navigation={navigation} title="JMoney" onLogout={onLogout} />
         <Tab.Navigator
            screenOptions={({ route }) => ({
               headerShown: false,
               tabBarStyle: { backgroundColor: theme.colors.surface },
               tabBarActiveTintColor: theme.colors.primary,
               tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
               tabBarIcon: ({ color, size }) => {
                  let iconName;
                  switch (route.name) {
                     case "Overview": iconName = "view-dashboard-outline"; break;
                     case "Transactions": iconName = "swap-horizontal"; break;
                     case "Budgets": iconName = "wallet-outline"; break;
                     case "Goals": iconName = "target"; break;
                     case "Reports": iconName = "chart-line"; break;
                  }
                  return <Icon name={iconName} color={color} size={size} />;
               },
            })}
         >
            <Tab.Screen name="Overview" component={Overview} />
            <Tab.Screen name="Transactions" component={Transactions} />
            <Tab.Screen name="Budgets" component={Budgets} />
            <Tab.Screen name="Goals" component={Goals} />
            <Tab.Screen name="Reports" component={Reports} />
         </Tab.Navigator>
      </>
   );
};

export default MainTabs;