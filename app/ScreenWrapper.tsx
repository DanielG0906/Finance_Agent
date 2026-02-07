import React from 'react';
import { ScrollView, StyleSheet, View, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GlobalFloatingButton from './GlobalFloatingButton';

export default function ScreenWrapper({ children }: { children: React.ReactNode }) {
    return (
        <View style={{ flex: 1 }}>
            {/* רקע קבוע */}
            <LinearGradient
                colors={['#f0f9f4', '#bbd8c0', '#8ac6a0']}
                locations={[0, 0.7, 1]}
                style={StyleSheet.absoluteFill}
            />

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* הכפתור בתוך הגלילה */}
                <GlobalFloatingButton />

                {/* התוכן של הדפים */}
                <View style={{ flex: 1 }}>
                    {children}
                </View>
            </ScrollView>
        </View>
    );
}