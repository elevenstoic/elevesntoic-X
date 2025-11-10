import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList, MainTabParamList } from '../types';
import { useUserStore } from '../store/userStore';
import { useThemeStore } from '../store/themeStore';

// Screens
import OnboardingScreen from '../screens/OnboardingScreen';
import PaywallScreen from '../screens/PaywallScreen';
import HomeScreen from '../screens/HomeScreen';
import WallpapersScreen from '../screens/WallpapersScreen';
import SettingsScreen from '../screens/SettingsScreen';

const RootStack = createStackNavigator<RootStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <MainTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: '#26436B',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <MainTab.Screen name="Home" component={HomeScreen} />
      <MainTab.Screen name="Wallpapers" component={WallpapersScreen} />
      <MainTab.Screen name="Settings" component={SettingsScreen} />
    </MainTab.Navigator>
  );
}

export function AppNavigator() {
  const { user, initializeUser } = useUserStore();
  const { initializeTheme } = useThemeStore();

  useEffect(() => {
    initializeUser();
    initializeTheme();
  }, []);

  if (!user) {
    return null;
  }

  const needsOnboarding = !user.hasCompletedOnboarding;
  const needsPaywall = user.subscriptionStatus === 'none';

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {needsOnboarding ? (
        <>
          <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
          <RootStack.Screen name="Paywall" component={PaywallScreen} />
        </>
      ) : needsPaywall ? (
        <RootStack.Screen name="Paywall" component={PaywallScreen} />
      ) : (
        <RootStack.Screen name="Main" component={MainTabs} />
      )}
    </RootStack.Navigator>
  );
}
