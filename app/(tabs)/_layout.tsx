import React from 'react'
import {Tabs} from "expo-router";
import {Image, ImageBackground, Text,View} from "react-native";
import backgrounds from '@/constants/backgrounds';
import icons from '@/constants/icons';
import { BlurView } from 'expo-blur';

const TabIcon = ({ focused, icon, title }: any) => {
    if (focused) {
        return (

            <ImageBackground
                source={backgrounds.bg7}// הרקע הצהוב/כתום שלך
                className="flex flex-row flex-1 w-full h-full min-w-[90px] min-h-[50px] justify-center items-center overflow-hidden"
                style={{borderRadius:30}}
                imageStyle={{ borderRadius: 25}}
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
                borderRadius:50,
                marginHorizontal:20,
                marginBottom:20,
                position: "absolute",
                overflow: "hidden",
                borderWidth: 0,
                borderColor: '#111',
                elevation: 0,
            },
            tabBarItemStyle: {
                justifyContent: "center",
                alignItems: "center",
            },
            tabBarShowLabel: false,
            tabBarBackground: () => (
                <BlurView
                    intensity={50} // הגברתי את הטשטוש למראה זכוכית (Glassmorphism)
                    tint="dark"
                    className="absolute fill-none inset-0 bg-black/60"
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
                name="saved"
                options={{
                    title: 'saved',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.saved} name="saved" title="Saved" />
                    )
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'search',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.search} name="search" title="search"/>
                    )
                }}
            />
        </Tabs>
    )
}

export default _Layout;


