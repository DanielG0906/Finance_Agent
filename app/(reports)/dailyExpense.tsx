import React, { useState, useRef, useEffect } from 'react'; // הוספתי useEffect
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Animated,
    Pressable,
    Platform,
    ActivityIndicator, // הוספתי בשביל מצב טעינה
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenWrapper from '@/app/ScreenWrapper';
import {useTranslation} from "react-i18next";
import {useGlobalContext} from "@/context/GlobalProvider";
import {Expense, ExpenseItemProps} from "@/interfaces/interfaces";
import {todayExpensesPerUser} from "@/services/appWrite";
import useFetch from "@/services/useFetch";

// ─── Sub-components ────────────────────────────────────────────────────────────

const CategoryPill = ({ label }: { label: string }) => (
    <View
        style={{
            backgroundColor: '#F0F9F4',
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderRadius: 20,
        }}
    >
        <Text style={{ color: '#5EAD82', fontSize: 11, fontWeight: '600' }}>{label}</Text>
    </View>
);

const ExpenseItem = ({ expense, isRTL, index }: ExpenseItemProps) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () =>
        Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true, speed: 30 }).start();
    const handlePressOut = () =>
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 30 }).start();
    console.log("Check Item:", expense.categoryID);
    return (
        <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <Animated.View
                style={{
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    alignItems: 'center',
                    paddingVertical: 14,
                    paddingHorizontal: 20,
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    marginBottom: 10,
                    transform: [{ scale: scaleAnim }],
                    shadowColor: '#C1E8D5',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.35,
                    shadowRadius: 8,
                    elevation: 3,
                }}
            >
                <View
                    style={{
                        width: 48,
                        height: 48,
                        borderRadius: 16,
                        backgroundColor: '#F0F9F4',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{ fontSize: 22 }}>{expense?.subCategoryID.icon}</Text>
                </View>

                <View
                    style={{
                        flex: 1,
                        marginHorizontal: 14,
                        alignItems: isRTL ? 'flex-end' : 'flex-start',
                        gap: 5,
                    }}
                >
                    <Text
                        style={{
                            color: '#1A2E25',
                            fontWeight: '700',
                            fontSize: 15,
                            textAlign: isRTL ? 'right' : 'left',
                        }}
                    >
                        {expense?.subCategoryID.subCategoryDescHeb}
                    </Text>
                    <CategoryPill label={expense?.categoryID.categoryDescHeb} />
                </View>

                <View
                    style={{
                        backgroundColor: '#FFF0F0',
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 14,
                    }}
                >
                    <Text style={{ color: '#E05555', fontWeight: '800', fontSize: 15 }}>
                        ₪{expense.amount}
                    </Text>
                </View>
            </Animated.View>
        </Pressable>
    );
};

// ─── Summary Card ──────────────────────────────────────────────────────────────

const SummaryCard = ({ total, count }: { total: number; count: number }) => {
    const { language } = useGlobalContext();
    const { t } = useTranslation();
    const isRTL = language === 'he';
    const now = new Date();
    const locale = isRTL ? 'he-IL' : 'en-US';

    const daysHe = ['יום א׳', 'יום ב׳', 'יום ג׳', 'יום ד׳', 'יום ה׳', 'יום ו׳', 'שבת'];
    const currentDay = isRTL
        ? daysHe[now.getDay()]
        : now.toLocaleDateString('en-US', { weekday: 'short' });

    const dateStr = now.toLocaleDateString(locale, { day: 'numeric', month: 'long' });

    return(
        <View
            style={{
                backgroundColor: '#fff',
                borderRadius: 32,
                paddingVertical: 28,
                paddingHorizontal: 24,
                marginBottom: 20,
                shadowColor: '#A7D7C5',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.4,
                shadowRadius: 16,
                elevation: 5,
                alignItems: 'center',
            }}
        >
            <Text style={{ color: '#9BBFAD', fontSize: 13, fontWeight: '500', marginBottom: 8 }}>
                {t('dailyExpense_totalExpenses')}
            </Text>

            <Text
                style={{
                    color: '#E05555',
                    fontSize: 54,
                    fontWeight: '900',
                    letterSpacing: -2,
                    lineHeight: 62,
                }}
            >
                ₪{total.toLocaleString()}
            </Text>

            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 18,
                    paddingTop: 18,
                    borderTopWidth: 1,
                    borderTopColor: '#F0F5F2',
                    width: '100%',
                    justifyContent: 'space-around',
                }}
            >
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: '#1A2E25', fontWeight: '700', fontSize: 18 }}>{count}</Text>
                    <Text style={{ color: '#9BBFAD', fontSize: 12, marginTop: 2 }}>{t('dailyExpense_operations')}</Text>
                </View>

                <View style={{ width: 1, backgroundColor: '#F0F5F2' }} />
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: '#5EAD82', fontWeight: '700', fontSize: 14 }}>
                        {currentDay}
                    </Text>
                    <Text style={{ color: '#9BBFAD', fontSize: 12, marginTop: 2 }}>
                        {dateStr}
                    </Text>
                </View>
            </View>
        </View>
    );
};

// ─── Empty State ───────────────────────────────────────────────────────────────

const EmptyState = () => {
    const { t } = useTranslation();
    return(
        <View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 60}}>
            <View
                style={{
                    width: 80,
                    height: 80,
                    borderRadius: 28,
                    backgroundColor: '#F0F9F4',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                }}
            >
                <Text style={{fontSize: 60}}>📝</Text>
            </View>
            <Text
                style={{
                    color: '#1A2E25',
                    fontWeight: '700',
                    fontSize: 20,
                    textAlign: 'center',
                    marginBottom: 6,
                }}
            >
                {t('dailyExpense_notReported')}
            </Text>
            <Text className="font-semibold" style={{color: '#9BBFAD', fontSize: 13, textAlign: 'center'}}>
                {t('dailyExpense_clickOnPlus')}
            </Text>
        </View>
    );
};

// ─── FAB Button ────────────────────────────────────────────────────────────────

const FABButton = ({ onPress }: { onPress: () => void }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () =>
        Animated.spring(scaleAnim, { toValue: 0.92, useNativeDriver: true, speed: 30 }).start();
    const handlePressOut = () =>
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 20 }).start();

    return (
        <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <Animated.View
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: 20,
                    backgroundColor: '#E05555',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: [{ scale: scaleAnim }],
                    shadowColor: '#E05555',
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.45,
                    shadowRadius: 12,
                    elevation: 8,
                    marginTop:5
                }}
            >
                <Text style={{ color: '#fff', fontSize: 30, fontWeight: '300', marginTop: -2 }}>
                    +
                </Text>
            </Animated.View>
        </Pressable>
    );
};

// ─── Main Screen ───────────────────────────────────────────────────────────────

const DailyExpense = () => {
    const router = useRouter();
    const { language } = useGlobalContext();
    const { t } = useTranslation();
    const isRTL = language === 'he';

    const {
        data: expenses,
        loading:isLoading,
        error,
        refetch,
    } = useFetch(todayExpensesPerUser)


    const totalAmount = (expenses ?? []).reduce((sum, item) => sum + item.amount, 0);

    return (
        <ScreenWrapper
            withSystemButton={true}
            gradientColors={['#F2FAF5', '#DDF0E8', '#C1E8D5']}
            scroll={false}
        >
            <SafeAreaView style={{ flex: 1 }}>
                {/* Header */}
                <View
                    style={{
                        flexDirection: isRTL ? 'row-reverse' : 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 24,
                        paddingBottom: 8,
                        marginTop:-14
                    }}
                >
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 14,
                            backgroundColor: 'rgba(255,255,255,0.8)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            shadowColor: '#A7D7C5',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 6,
                            elevation: 2,
                        }}
                    >
                        <Text style={{ color: '#1A2E25', fontSize: 16, fontWeight: '600' }}>✕</Text>
                    </TouchableOpacity>

                    <Text style={{ color: '#1A2E25', fontSize: 22, fontWeight: '800' }}>
                        {t('dailyExpense_dailyReport')}
                    </Text>

                    <View style={{ width: 40 }} />
                </View>

                <ScrollView
                    contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, paddingTop: 16 }}
                    showsVerticalScrollIndicator={false}
                >
                    <SummaryCard total={totalAmount} count={expenses?.length ?? 0} />

                    <View
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.6)',
                            borderRadius: 32,
                            padding: 10,
                            marginBottom: 20,
                            minHeight: 150, // שומר על גובה מינימלי בזמן טעינה
                        }}
                    >
                        {/* Section header */}
                        {!isLoading && (expenses?.length ?? 0) > 0 && (
                            <View
                                style={{
                                    flexDirection: isRTL ? 'row-reverse' : 'row',
                                    marginBottom: 14,
                                    marginHorizontal:10
                                }}
                            >
                                <Text style={{ color: '#9BBFAD', fontSize: 14, fontWeight: '700' }}>
                                    {t('dailyExpense_detailsOfMovements')}
                                </Text>
                            </View>
                        )}

                        {/* הצגת מצב טעינה, ריק או רשימה */}
                        {isLoading ? (
                            <View style={{ paddingVertical: 50 }}>
                                <ActivityIndicator size="large" color="#5EAD82" />
                            </View>
                        ) : expenses?.length === 0 ? (
                            <EmptyState />
                        ) : (
                            expenses?.map((item, index) => (
                                <ExpenseItem
                                    key={item.$id} // שימוש ב-$id של Appwrite
                                    expense={item}
                                    isRTL={isRTL}
                                    index={index}
                                />
                            ))
                        )}
                    </View>

                    <View
                        style={{
                            flexDirection: isRTL ? 'row' : 'row-reverse',
                            justifyContent: 'flex-start',
                            paddingHorizontal: 4,
                        }}
                    >
                        <FABButton onPress={() => console.log("PRESS")} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ScreenWrapper>
    );
};

export default DailyExpense;