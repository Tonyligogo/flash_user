import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Image } from 'expo-image';
import { icons } from '@/constants';
import { useTheme } from '@/constants/ThemeContext';


export default function TabLayout() {
  const {colors} = useTheme();
  
  const TabIcon = ({focused, source}:{focused:boolean, source:string}) =>(
    <Image source={source} tintColor={focused ? colors.primary : colors.textSecondary} contentFit="contain" style={{width:26, height:26}} />
  )
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: colors.background, 
          borderTopColor: colors.border,
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