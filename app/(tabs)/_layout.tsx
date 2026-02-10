import React from 'react'
import {Tabs} from "expo-router";
import {Image, ImageBackground, Text,View} from "react-native";
import backgrounds from '@/constants/backgrounds';
import icons from '@/constants/icons';
import { BlurView } from 'expo-blur';
import {white} from "nativewind/src/metro/picocolors";

const TabIcon = ({ focused, icon, title }: any) => {
    if (focused) {
        return (

            <ImageBackground

                className="bg-gray-500/10 flex flex-row flex-1 w-full h-full min-w-[90px] min-h-[50px] justify-center items-center overflow-hidden"
                style={{borderRadius:30, borderColor:'white', borderWidth:1}}
                imageStyle={{ borderRadius: 30}}
            >
                <BlurView
                    intensity={10}
                    tint="extraLight"
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={icon}
                        tintColor="#1e1e1e"
                        className="size-7"
                    />
                    <Text className="text-[#1e1e1e] text-[12px] font-black ml-1 uppercase tracking-tighter">
                        {title}
                    </Text>
                </BlurView>
            </ImageBackground>
        )
    }

    return (
        <View className="items-center justify-center p-2">
            <Image
                source={icon}
                tintColor="#9ca3af"
                className="size-6"
            />
        </View>
    )
}

const _Layout = () => {
    return (
        <Tabs screenOptions={{
            tabBarStyle: {
                backgroundColor: 'transparent',
                height: 50,
                paddingBottom: 0,
                paddingTop:6,
                paddingLeft:1,
                paddingRight:1,
                borderRadius:30,
                marginHorizontal:20,
                marginBottom:20,
                position: "absolute",
                overflow: "hidden",
                borderWidth: 0,
                borderColor: 'transparent',
                elevation: 0,
            },
            tabBarItemStyle: {
                justifyContent: "center",
                alignItems: "center",
            },
            tabBarShowLabel: false,
            tabBarBackground: () => (
                <BlurView
                    intensity={30} // הגברתי את הטשטוש למראה זכוכית (Glassmorphism)
                    className="absolute fill-none inset-0 "
                />
            ),
        }}>

            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    // The Tab Navigator provides 'size' and 'color' props
                    tabBarIcon: ({ focused}) => (
                        <TabIcon focused={focused} icon={icons.home} name="home" title="Home"/>
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.profile} name="profile" title="Profile" />
                    )
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'search',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.search} name="search" title="search" />
                    )
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'settings',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.settings} name="settings" title="settings" />
                    )
                }}
            />
        </Tabs>
    )
}

export default _Layout;


