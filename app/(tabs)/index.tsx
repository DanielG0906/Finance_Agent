import React, {useEffect} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { useGlobalContext } from "@/context/GlobalProvider";
import icons from "@/constants/icons";
import { router } from "expo-router";
import ScreenWrapper from "@/app/ScreenWrapper";
import { useTranslation } from "react-i18next";
import * as url from "node:url";

const Index = () => {
    const { user, logout, language } = useGlobalContext();
    const { t } = useTranslation();
    const isRTL = language === 'he';

    const handleLogOut = async () => {
        await logout();
        router.replace('/(auth)/login');
    }

    const ReportButton = ({icon,description}:any) =>{
        return(
            <TouchableOpacity>
                <View className="bg-gray-100 rounded-xl items-center" style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
                    <Image source={icon} style={{width:40,height:40}} />
                    <Text className="text-black text-s font-semibold">{description}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <ScreenWrapper withSystemButton={true}>
            {/* key={language} מבטיח רינדור מחדש מלא כשהשפה משתנה */}
            <View className="px-5 py-4" key={language}>
                <View className="bg-white/10 rounded-3xl p-4 mt-6 shadow-sm border border-gray-100">

                    <View
                        className="items-center mb-4"
                        style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                    >
                        <View className="bg-gray-100 rounded-full p-1">
                            <Image
                                source={user?.gender === 'female' ? icons.myProfileWoman : icons.myProfileMan}
                                style={localStyles.avatar}
                            />
                        </View>

                        <View style={{ paddingHorizontal: 16 }}>
                            <Text
                                style={{ textAlign: isRTL ? 'right' : 'left' }}
                                className="text-dark-200 text-2xl font-medium"
                            >
                                {t('index_welcomeBack')}
                            </Text>
                            <Text
                                style={{ textAlign: isRTL ? 'right' : 'left' }}
                                className="text-dark-100 text-l font-bold"
                            >
                                {user?.username}
                            </Text>
                        </View>
                    </View>

                    <View
                        className="items-center"
                        style={{
                            flexDirection: isRTL ? 'row-reverse' : 'row',
                            gap: 12,
                            justifyContent: 'flex-start'
                        }}
                    >
                        <TouchableOpacity>
                            <Text className="text-gray-500 text-s font-medium">{t('index_profile')}</Text>
                        </TouchableOpacity>

                        <Text className="text-gray-300">|</Text>

                        <TouchableOpacity>
                            <Text className="text-gray-500 text-s font-medium">{t('index_settings')}</Text>
                        </TouchableOpacity>

                        <Text className="text-gray-300">|</Text>

                        <TouchableOpacity onPress={() => handleLogOut()}>
                            <Text className="text-red-500 text-s font-bold">{t('index_logout')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View className="flex-row w-full justify-center gap-2 mt-5">


                <ReportButton icon={icons.decrease} description = "Daily expenses"/>

                <ReportButton icon={icons.increase} description = "Monthly income"/>

            </View>
        </ScreenWrapper>
    )
}

const localStyles = StyleSheet.create({
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 27.5,
    }
});

export default Index;