import React from 'react';
import {
    TouchableWithoutFeedback,
    Keyboard,
    View,
    StyleSheet,
    Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalFloatingButton from './GlobalFloatingButton';

interface ScreenWrapperProps {
    children: React.ReactNode;
    withSystemButton?: boolean; // האם להציג את כפתור השפה במסך הזה?
}

export default function ScreenWrapper({ children, withSystemButton = false}: ScreenWrapperProps) {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ flex: 1 }}>
                {/* הגרדיאנט הקבוע שלך */}
                <LinearGradient
                    colors={['#f0f9f4', '#94c69c', '#84bd98']}
                    locations={[0, 0.7, 1]}
                    style={StyleSheet.absoluteFill}
                />

                <KeyboardAwareScrollView
                    enableOnAndroid
                    extraScrollHeight={Platform.OS === 'ios' ? 80 : 100}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    keyboardOpeningTime={0}
                    showsVerticalScrollIndicator={false}
                >
                    {/* כפתור צף - רק אם ביקשנו */}
                    {withSystemButton && <GlobalFloatingButton />}

                    {/* התוכן של המסך הספציפי */}
                    <View style={{ flex: 1,marginTop:30}}>
                        {children}
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
}