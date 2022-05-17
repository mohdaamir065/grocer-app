import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "../index";
import Colors from "../../theme/Colors";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../../@types";
import { Home, AllList, List } from "../../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.ROOT}
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ListsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.ALL_LIST}
        component={AllList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.LIST}
        component={List}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName={Routes.HOME}
      screenOptions={{
        tabBarActiveTintColor: Colors.tint,
        headerShown: false,
        unmountOnBlur: true,
      }}
    >
      <BottomTab.Screen
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-home" size={24} color={color} />
          ),
        }}
        name={Routes.HOME}
        component={Home}
      />
      <BottomTab.Screen
        options={{
          title: "All Lists",
          tabBarLabel: "All Lists",
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-cart" size={28} color={color} />
          ),
        }}
        name={Routes.LISTS_STACK}
        component={ListsStack}
      />
    </BottomTab.Navigator>
  );
};

export { Navigation };
