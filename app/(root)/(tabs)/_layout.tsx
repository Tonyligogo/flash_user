import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
// Assuming Colors is an object structured like: { light: { background: 'white', border: '#ccc', tint: 'blue' }, dark: {...} }
import { Colors } from '@/constants/theme'; 
import { useColorScheme } from '@/hooks/use-color-scheme'; // This hook returns 'light' or 'dark'
import { Image } from 'expo-image';
import { icons } from '@/constants';
import COLORS from '@/constants/Colors'; // Assuming this provides primary color

const TabIcon = ({focused, source}:{focused:boolean, source:string}) =>(
  // The tintColor already handles the icon color based on focus
  <Image source={source} tintColor={focused ? COLORS.primary : COLORS.textGray} contentFit="contain" style={{width:26, height:26}} />
)

export default function TabLayout() {
  // Use the system color scheme to pick the right color set
  const colorScheme = useColorScheme();
  // Get the current theme color palette object, defaulting to dark if scheme is null
  const currentThemeColors = Colors[colorScheme ?? 'dark']; // <-- Set 'dark' as default fallback

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: currentThemeColors.background,
          borderTopColor: currentThemeColors.borders,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {fontSize:14},
      }}>
      
      <Tabs.Screen name="index"
        options={{
          title:'Home',
          headerShown:false,
          tabBarIcon:({focused})=> <TabIcon focused={focused} source={icons.home}/>
        }}
      />
      <Tabs.Screen name="rides"
        options={{
          title:'Rides',
          headerShown:false,
          tabBarIcon:({focused})=> <TabIcon focused={focused} source={icons.list}/>
        }}
      />
      <Tabs.Screen name="chats"
        options={{
          title:'Chats',
          headerShown:false,
          tabBarIcon:({focused})=> <TabIcon focused={focused} source={icons.chat}/>
        }}
      />
      <Tabs.Screen name="profile"
        options={{
          title:'Profile',
          headerShown:false,
          tabBarIcon:({focused})=> <TabIcon focused={focused} source={icons.profile}/>
        }}
      />
    </Tabs>
  );
}