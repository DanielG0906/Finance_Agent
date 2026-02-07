import React from 'react';
import { TouchableOpacity, Text, View, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useGlobalContext } from "@/context/GlobalProvider";
import {styles} from "@/styles";

export default function GlobalFloatingButton() {
    const { toggleLanguage, language } = useGlobalContext();
    const isHebrew = language === 'he';

    return (
        <View className="mb-8" style={{marginTop:8}}>
        <TouchableOpacity
            onPress={toggleLanguage}
            activeOpacity={0.8}
            style={{
                position: 'absolute',
                top: Platform.OS === 'ios' ? 10 : 20,
                left: 20,
                zIndex: 9999,
                elevation: 5,
            }}
        >
            <LinearGradient
                colors={['#e4e4e4', '#3fef7c', '#2f8f05']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                    paddingVertical: 4,
                    borderRadius: 25,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
            >
                <Text style={{ fontSize: 16 }}>{isHebrew ? '🇮🇱' : '🇺🇸'}</Text>
                <View style={{ width: 1, height: 14, backgroundColor: isHebrew ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.3)', marginHorizontal: 10 }} />
                <Text style={{ color:'#fff', fontWeight: '900', fontSize: 13 }}>
                    {isHebrew ? 'HE' : 'EN'}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
        </View>
    );
}