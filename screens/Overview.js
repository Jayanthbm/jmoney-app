// screens/Overview.js

import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import CurrentTrendsCard from "../components/CurrentTrendsCard";
import CustomAppBar from "../components/CustomAppBar";
import DailyLimitCard from "../components/DailyLimitCard";
import NetWorthCard from "../components/NetWorthCard";
import PayDayCard from "../components/PayDayCard";
import RemainingForPeriod from "../components/RemainingForPeriod";
import TopCategoriesCard from "../components/TopCategoriesCard";
import { useTheme } from "react-native-paper";

const Overview = () => {
   const theme = useTheme();

   // State for Remaining for Period Card
   const [remainingLoading, setRemainingLoading] = useState(true);
   const [remaining, setRemaining] = useState(0);
   const [progressRemaining, setProgressRemaining] = useState(0);

   // State for Daily Limit Card
   const [dailyLimitLoading, setDailyLimitLoading] = useState(true);
   const [dailyLimit, setDailyLimit] = useState(3129.94);
   const [spentToday, setSpentToday] = useState(0);

   // State for Top Categories Card
   const [topCategoriesLoading, setTopCategoriesLoading] = useState(true);
   const [topCategories, setTopCategories] = useState([]);

   // State for This Month
   const [monthDataLoading, setMonthDataLoading] = useState(true);
   const [monthExpense, setMonthExpense] = useState(0);
   const [monthIncome, setMonthIncome] = useState(0);

   // State for Current Year
   const [yearDataLoading, setYearDataLoading] = useState(true);
   const [yearExpense, setYearExpense] = useState(0);
   const [yearIncome, setYearIncome] = useState(0);

   // State for Net Worth
   const [netWorthLoading, setNetWorthLoading] = useState(true);
   const [netWorth, setNetWorth] = useState(0);

   const [firstCalculationDone, setFirstCalculationDone] = useState(false)

   useEffect(() => {
      async function calcualte() {
         try {
            // Remaining for Period calculations
            setRemaining(40689);
            setProgressRemaining(0.6);
            setRemainingLoading(false);

            // Daily Limit calculations
            setDailyLimit(3129.94);
            setSpentToday(0);
            setDailyLimitLoading(false);

            // Top Categories calculations
            setTopCategories([
               { name: "Loans", amount: 44998, percent: 49.21, color: "#4285F4" },
               { name: "Insurance", amount: 17796, percent: 19.46, color: "#FBBC04" },
               { name: "Other", amount: 28648.82, percent: 31.33, color: "#34A853" },
            ])
            setTopCategoriesLoading(false);

            // This Month calculations
            setMonthExpense(91442.82);
            setMonthIncome(132132);
            setMonthDataLoading(false);

            // Current Year calculations
            setYearExpense(1000866.63);
            setYearIncome(1362537);
            setYearDataLoading(false);

            // Net Worth calculations
            setNetWorthLoading(false);
            setNetWorth(636861);
         } catch (error) {
            console.log("Error in calculation")
         } finally {
            setFirstCalculationDone(true);
         }
      }

      calcualte();
   }, []);

   useEffect(() => {

      async function syncData() {

      }

      if (firstCalculationDone) {
         syncData()
      }

   }, [firstCalculationDone])
   return (
      <>
         <CustomAppBar title={"Overview"} />
         <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <ScrollView contentContainerStyle={{
               padding: 16,
               gap: 12,
            }}>
               {/* CARD 1: Remaining for Period */}
               <RemainingForPeriod remaining={remaining} progress={progressRemaining} loading={remainingLoading} />

               {/* CARD 2: Daily Limit */}
               <DailyLimitCard
                  limit={dailyLimit}
                  remaining={dailyLimit - spentToday}
                  spent={spentToday}
                  loading={dailyLimitLoading}
               />

               {/* CARD 3: Pay Day */}
               <PayDayCard />

               {/* CARD 4: Top Categories */}
               <TopCategoriesCard loading={topCategoriesLoading} data={topCategories} />

               {/* CARD 5: This Month */}
               <CurrentTrendsCard
                  loading={monthDataLoading}
                  expense={monthExpense}
                  income={monthIncome}
               />

               {/* CARD 6: Current Year */}

               <CurrentTrendsCard
                  loading={yearDataLoading}
                  expense={yearExpense}
                  income={yearIncome}
                  type="year"
               />

               {/* CARD 7: Net Worth */}
               <NetWorthCard amount={netWorth} loading={netWorthLoading} />

            </ScrollView>
         </View>
      </>
   );
};

export default Overview;