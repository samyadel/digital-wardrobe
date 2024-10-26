import { StyleSheet, View } from "react-native";
import { Tabs } from "expo-router"
import Feather from '@expo/vector-icons/Feather';
import { Colors } from "@/constants/Colors";

export default function RootLayout() {
  const iconSize = 24;

  return (
    <Tabs screenOptions={{headerShown:false, tabBarShowLabel:false, tabBarActiveTintColor: Colors.tabBarActiveTint, tabBarInactiveTintColor: Colors.tabBarInactiveTint, tabBarStyle: styles.tabBar}} sceneContainerStyle={styles.screen}>
      <Tabs.Screen name="index" options={{
        tabBarIcon: ({color}) => (
          <Feather name="home" size={iconSize} color={color} />
        )
      }} />
      <Tabs.Screen name="plan" options={{
        tabBarIcon: ({color}) => (
          <Feather name="calendar" size={iconSize} color={color} />
        )
      }} />
      <Tabs.Screen name="add" options={{
        tabBarIcon: ({color}) => (
            
          <View
            style={{
              position: 'absolute',
              bottom: 20, // space from bottombar
              height: 58,
              width: 58,
              borderRadius: 58,
              backgroundColor: '#000',
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.4,
              shadowRadius: 10,
            }}>
            <Feather name="plus" size={iconSize} color="#fff" />
          </View>
        )
      }} />
      <Tabs.Screen name="shop" options={{
        tabBarIcon: ({color}) => (
          <Feather name="shopping-cart" size={iconSize} color={color} />
        )
      }} />
      <Tabs.Screen name="profile" options={{
        tabBarIcon: ({color}) => (
          <Feather name="user" size={iconSize} color={color}/>
        )
      }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.screenBgColor,
    // marginHorizontal: 30,
    // marginVertical: 85,
  },
  tabBar: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    paddingBottom: 0,
  },
});