// components/RemainingForPeriod.js

import { Text, useTheme } from "react-native-paper";

import AnimatedProgressBar from "./AnimatedProgressBar";
import MyCard from './MyCard';
import React from 'react';
import dayjs from "dayjs";

const RemainingForPeriod = ({ loading, remaining, progress }) => {
   const theme = useTheme();

   const now = dayjs();
   const startOfMonth = now.startOf('month');
   const endOfMonth = now.endOf('month');
   const formattedStart = startOfMonth.format('DD/MM/YYYY');
   const formattedEnd = endOfMonth.format('DD/MM/YYYY');
   const subTitle = `${formattedStart} - ${formattedEnd}`;

   return (
      <MyCard title="Remaining for Period" subTitle={subTitle} loading={loading}>
         <Text
            variant="headlineMedium"
            style={
               {
                  fontSize: 30,
                  fontWeight: 700,
                  marginTop: 4,
                  color: remaining >= 0 ? theme.colors.income : theme.colors.expense
               }

            }>
            ₹{remaining?.toLocaleString("en-IN")}
         </Text>

         <AnimatedProgressBar
            progress={progress}
            color={theme.colors.primary}
         />
      </MyCard >
   );
};

export default RemainingForPeriod;