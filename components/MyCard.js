// components/MyCard.js

import { Animated, View } from "react-native";
import { Card, Text } from "react-native-paper";
import React, { useEffect, useRef } from "react";

const MyCard = ({
   title, subTitle, loading, loaderHeight = 20, loaderWidth = 150, children, onClick = () => { } }) => {
   const opacity = useRef(new Animated.Value(0.3)).current;

   useEffect(() => {
      Animated.loop(
         Animated.sequence([
            Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 0.3, duration: 700, useNativeDriver: true }),
         ])
      ).start();
   }, []);

   return (
      <Card style={{
         borderRadius: 16,
         paddingVertical: 6,
      }} mode="elevated" onClick={onClick}>
         <Card.Content>
            <Text style={{
               fontWeight: "700",
               fontSize: 24,
            }}>{title}</Text>
            <Text style={{
               color: "#777",
               fontSize: 18,
            }}>{subTitle}</Text>

            {loading ? (
               <View style={{ marginTop: 10 }}>
                  <Animated.View
                     style={{
                        height: loaderHeight,
                        width: loaderWidth,
                        borderRadius: 8,
                        backgroundColor: "#E0E0E0",
                        opacity,
                     }}
                  />
                  <Animated.View
                     style={{
                        height: 10,
                        width: "100%",
                        marginTop: 12,
                        borderRadius: 8,
                        backgroundColor: "#E0E0E0",
                        opacity,
                     }}
                  />
               </View>
            ) : (
               children
            )}
         </Card.Content>
      </Card>
   );
};

export default MyCard;