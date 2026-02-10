import React from 'react';
import { TouchableOpacity, Text, View, Platform } from 'react-native';
import { useGlobalContext } from "@/context/GlobalProvider";
import { Ionicons } from '@expo/vector-icons';

export default function GlobalFloatingButton() {
    const { toggleLanguage, language } = useGlobalContext();
    const isHebrew = language === 'he';

    return (
        <View style={{ zIndex: 9999 }}>
            <TouchableOpacity
                onPress={toggleLanguage}
                activeOpacity={0.7}
                style={{
                    position: 'absolute',
                    top: Platform.OS === 'ios' ? 10 : 20,
                    left: 20,
                    // רקע שקוף ועדין שמתמזג עם הגרדיאנט של המסך
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                    // צל מינימלי
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    elevation: 3,
                    marginTop:10
                }}
            >
                {/* אייקון גלובוס קטן */}
                <Ionicons
                    name="globe-outline"
                    size={14}
                    color="#1a3d2f"
                    style={{ marginRight: 6, opacity: 0.7 }}
                />



                {/* קיצור השפה */}
                <Text style={{
                    color: '#1a3d2f',
                    fontWeight: '800',
                    fontSize: 11,
                    letterSpacing: 0.3
                }}>
                    {isHebrew ? 'HE' : 'EN'}
                </Text>
                {/* קו מפריד דק */}
                <View style={{
                    width: 1,
                    height: 12,
                    backgroundColor: 'rgba(26, 61, 47, 0.2)',
                    marginHorizontal: 8
                }} />

                <Text style={{ fontSize: 14 }}>{isHebrew ? '🇮🇱' : '🇺🇸'}</Text>
            </TouchableOpacity>
        </View>
    );
}