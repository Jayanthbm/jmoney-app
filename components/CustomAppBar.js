// components/CustomAppBar.js

import { Appbar, useTheme } from 'react-native-paper';

const CustomAppBar = ({ navigation, title, onLogout }) => {
   const theme = useTheme();
   return (
      <Appbar.Header mode="center-aligned" style={{ backgroundColor: theme.colors.primary }}>
         <Appbar.Content title={title} titleStyle={{ color: theme.colors.onPrimary }} />
         <Appbar.Action icon="cog-outline" color={theme.colors.onPrimary} onPress={() => navigation.navigate("Settings")} />
         <Appbar.Action icon="logout" color={theme.colors.onPrimary} onPress={onLogout} />
      </Appbar.Header>
   );
};

export default CustomAppBar;