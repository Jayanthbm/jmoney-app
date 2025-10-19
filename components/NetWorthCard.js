// components/NetWorthCard.js

import { Text, View } from 'react-native';

import MyCard from './MyCard';
import React from 'react';
import { useTheme } from 'react-native-paper';

const NetWorthCard = ({ amount, loading }) => {
   const theme = useTheme()
   return (
      <MyCard title="Net Worth" subTitle="ALL TIME" loading={loading}>
         <Text variant="headlineMedium" style={{
            color: theme.colors.income,
            fontSize: 30,
            marginTop: 5,
         }}>
            ₹{amount.toLocaleString("en-IN")}
         </Text>
      </MyCard>
   );
};

export default NetWorthCard;