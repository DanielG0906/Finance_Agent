import React from 'react';
import {
    TouchableWithoutFeedback,
    Keyboard,
    View,
    StyleSheet,
    Platform, ViewStyle, ViewProps
} from 'react-native';
import {LinearGradient, LinearGradientProps} from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalFloatingButton from './GlobalFloatingButton';

interface ScreenWrapperProps {
    children: React.ReactNode;
    withSystemButton?: boolean; // האם להציג את כפתור השפה במסך הזה?
    gradientColors?: LinearGradientProps['colors'];
    gradientLocations?: LinearGradientProps['locations'];
    scroll?: boolean;
    style?: ViewProps['style'];
}


export default function ScreenWrapper({
                                          children,
                                          withSystemButton = false,
                                          gradientColors = ['#f0f9f4', '#94c69c', '#84bd98'],
                                          gradientLocations = [0, 0.7, 1],
                                          scroll = true, // ברירת המחדל היא שיש גלילה
                                          style,
                                      }: ScreenWrapperProps) {

    const renderContent = () => (
        // הוספנו flex: 1 כאן כדי שהתוכן יוכל להימתח
        <View style={[{ flex: 1 }, style]}>
            {withSystemButton && <GlobalFloatingButton />}
            {/* חשוב: אם scroll=false, ה-View הזה חייב flex: 1
               כדי שהילד (הדיווח היומי) יוכל להשתמש ב-flex-1 בעצמו
            */}
            <View style={{ flex: 1, marginTop: 24 }}>
                {children}
            </View>
        </View>
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ flex: 1 }}>
                <LinearGradient
                    colors={gradientColors}
                    locations={gradientLocations}
                    style={StyleSheet.absoluteFill}
                />

                {scroll ? (
                    /* אם scroll הוא true - נשתמש בסקרולר שמונע מהמקלדת להסתיר תוכן */
                    <KeyboardAwareScrollView
                        enableOnAndroid
                        extraScrollHeight={Platform.OS === 'ios' ? 80 : 100}
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                        keyboardOpeningTime={0}
                        showsVerticalScrollIndicator={false}
                    >
                        {renderContent()}
                    </KeyboardAwareScrollView>
                ) : (
                    /* אם scroll הוא false - נשתמש ב-View פשוט שתופס את כל המסך */
                    <View style={{ flex: 1 }}>
                        {renderContent()}
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}