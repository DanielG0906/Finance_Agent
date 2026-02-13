import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Animated,
    Pressable,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenWrapper from '@/app/ScreenWrapper';
import { useGlobalContext } from '@/context/GlobalProvider';
import { useTranslation } from 'react-i18next';
import {Ionicons} from "@expo/vector-icons";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface SubCategory {
    id: string;
    label: string;
    icon: string;
}

interface Category {
    id: string;
    label: string;
    icon: string;
    color: string;
    subCategories: SubCategory[];
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
    {
        id: 'food',
        label: 'מזון',
        icon: '🍔',
        color: '#FF9B6A',
        subCategories: [
            { id: 'home', label: 'אוכל בבית', icon: '🏠' },
            { id: 'supermarket', label: 'סופרמרקט', icon: '🛒' },
            { id: 'restaurant', label: 'מסעדה', icon: '🍽️' },
            { id: 'coffee', label: 'קפה', icon: '☕' },
        ],
    },
    {
        id: 'housing',
        label: 'דיור',
        icon: '🏡',
        color: '#6AB4FF',
        subCategories: [
            { id: 'rent', label: 'שכירות', icon: '🔑' },
            { id: 'electricity', label: 'חשמל', icon: '⚡' },
            { id: 'water', label: 'מים', icon: '💧' },
            { id: 'internet', label: 'אינטרנט', icon: '📡' },
        ],
    },
    {
        id: 'transport',
        label: 'תחבורה',
        icon: '🚗',
        color: '#A78BFA',
        subCategories: [
            { id: 'fuel', label: 'דלק', icon: '⛽' },
            { id: 'parking', label: 'חניה', icon: '🅿️' },
            { id: 'public', label: 'תח״צ', icon: '🚌' },
            { id: 'taxi', label: 'מונית', icon: '🚕' },
        ],
    },
    {
        id: 'entertainment',
        label: 'בידור',
        icon: '🎬',
        color: '#34D399',
        subCategories: [
            { id: 'cinema', label: 'קולנוע', icon: '🎥' },
            { id: 'sports', label: 'ספורט', icon: '⚽' },
            { id: 'games', label: 'משחקים', icon: '🎮' },
            { id: 'travel', label: 'טיולים', icon: '✈️' },
        ],
    },
    {
        id: 'health',
        label: 'בריאות',
        icon: '💊',
        color: '#F87171',
        subCategories: [
            { id: 'doctor', label: 'רופא', icon: '🩺' },
            { id: 'pharmacy', label: 'בית מרקחת', icon: '💉' },
            { id: 'gym', label: 'חדר כושר', icon: '💪' },
        ],
    },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

const CategoryChip = ({
                          category,
                          isSelected,
                          onPress,
                      }: {
    category: Category;
    isSelected: boolean;
    onPress: () => void;
}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () =>
        Animated.spring(scaleAnim, { toValue: 0.93, useNativeDriver: true, speed: 40 }).start();
    const handlePressOut = () =>
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 30 }).start();

    return (
        <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <Animated.View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 18,
                    marginLeft: 10,
                    backgroundColor: isSelected ? category.color + '22' : '#fff',
                    borderWidth: 2,
                    borderColor: isSelected ? category.color : '#F0F5F2',
                    transform: [{ scale: scaleAnim }],
                    shadowColor: isSelected ? category.color : '#C1E8D5',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: isSelected ? 0.3 : 0.15,
                    shadowRadius: 6,
                    elevation: isSelected ? 4 : 1,
                    minWidth: 80,
                }}
            >
                <Text style={{ fontSize: 22, marginBottom: 4 }}>{category.icon}</Text>
                <Text
                    style={{
                        fontSize: 12,
                        fontWeight: isSelected ? '700' : '500',
                        color: isSelected ? category.color : '#9BBFAD',
                    }}
                >
                    {category.label}
                </Text>
            </Animated.View>
        </Pressable>
    );
};

const SubCategoryChip = ({
                             sub,
                             isSelected,
                             onPress,
                             accentColor,
                         }: {
    sub: SubCategory;
    isSelected: boolean;
    onPress: () => void;
    accentColor: string;
}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () =>
        Animated.spring(scaleAnim, { toValue: 0.94, useNativeDriver: true, speed: 40 }).start();
    const handlePressOut = () =>
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 30 }).start();

    return (
        <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <Animated.View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 14,
                    borderRadius: 14,
                    marginLeft: 8,
                    marginBottom: 8,
                    backgroundColor: isSelected ? accentColor + '18' : '#F8FBF9',
                    borderWidth: 1.5,
                    borderColor: isSelected ? accentColor : '#E8F3ED',
                    transform: [{ scale: scaleAnim }],
                }}
            >
                <Text style={{ fontSize: 16, marginLeft: 6 }}>{sub.icon}</Text>
                <Text
                    style={{
                        fontSize: 13,
                        fontWeight: isSelected ? '700' : '400',
                        color: isSelected ? accentColor : '#5A7A68',
                    }}
                >
                    {sub.label}
                </Text>
            </Animated.View>
        </Pressable>
    );
};

const SectionTitle = ({ title }: { title: string }) => (
    <Text
        style={{
            color: '#9BBFAD',
            fontSize: 12,
            fontWeight: '600',
            marginBottom: 12,
            textAlign: 'right',
        }}
    >
        {title}
    </Text>
);

// ─── Main Component ────────────────────────────────────────────────────────────

const AddExpense = () => {
    const router = useRouter();
    const { language } = useGlobalContext();
    const { t } = useTranslation();
    const isRTL = language === 'he';

    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
    const [amount, setAmount] = useState('');
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitScaleAnim = useRef(new Animated.Value(1)).current;

    const handleCategorySelect = (category: Category) => {
        setSelectedCategory(category);
        setSelectedSubCategory(null); // איפוס תת-קטגוריה בבחירת קטגוריה חדשה
    };

    const isFormValid =
        selectedCategory !== null && selectedSubCategory !== null && amount.trim() !== '';

    const handleSubmit = async () => {
        if (!isFormValid) return;

        Animated.sequence([
            Animated.spring(submitScaleAnim, { toValue: 0.94, useNativeDriver: true, speed: 40 }),
            Animated.spring(submitScaleAnim, { toValue: 1, useNativeDriver: true, speed: 20 }),
        ]).start();

        try {
            setIsSubmitting(true);
            // TODO: קריאה ל-Appwrite
            // await createExpense({ categoryID, subCategoryID, amount, comment });
            console.log({
                category: selectedCategory?.id,
                subCategory: selectedSubCategory?.id,
                amount: parseFloat(amount),
                comment,
            });
            router.back();
        } catch (e) {
            console.error(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ScreenWrapper
            withSystemButton={true}
            gradientColors={['#F2FAF5', '#DDF0E8', '#C1E8D5']}
            scroll={false}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    {/* Header */}
                    <View
                        style={{
                            flexDirection: isRTL ? 'row-reverse' : 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 24,
                            marginTop:-14,
                            paddingBottom: 8,
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
                            <Ionicons
                                name={isRTL ? 'arrow-forward' : 'arrow-back'}
                                size={20}
                                color="#1A2E25"
                            />
                        </TouchableOpacity>

                        <Text style={{ color: '#1A2E25', fontSize: 20, fontWeight: '800' }}>
                            הוצאה חדשה
                        </Text>

                        <View style={{ width: 40 }} />
                    </View>

                    <ScrollView
                        contentContainerStyle={{
                            paddingHorizontal: 20,
                            paddingBottom: 40,
                            paddingTop: 12,
                        }}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Amount input card */}
                        <View
                            style={{
                                backgroundColor: '#fff',
                                borderRadius: 32,
                                padding: 24,
                                marginBottom: 16,
                                shadowColor: '#A7D7C5',
                                shadowOffset: { width: 0, height: 6 },
                                shadowOpacity: 0.35,
                                shadowRadius: 14,
                                elevation: 4,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: '#9BBFAD', fontSize: 13, fontWeight: '500', marginBottom: 10 }}>
                                כמה הוצאת?
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text
                                    style={{
                                        color: amount ? '#E05555' : '#D1E8DC',
                                        fontSize: 52,
                                        fontWeight: '900',
                                        letterSpacing: -2,
                                    }}
                                >
                                    ₪
                                </Text>
                                <TextInput
                                    value={amount}
                                    onChangeText={setAmount}
                                    keyboardType="numeric"
                                    placeholder="0"
                                    placeholderTextColor="#D1E8DC"
                                    style={{
                                        color: '#E05555',
                                        fontSize: 52,
                                        fontWeight: '900',
                                        letterSpacing: -2,
                                        minWidth: 80,
                                        textAlign: 'center',
                                    }}
                                />
                            </View>
                        </View>

                        {/* Category selection card */}
                        <View
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.75)',
                                borderRadius: 32,
                                padding: 20,
                                marginBottom: 16,
                            }}
                        >
                            <SectionTitle title="בחר תחום" />
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    flexDirection: 'row',
                                    paddingBottom: 4,
                                }}
                                style={{ marginHorizontal: -4 }}
                            >
                                {CATEGORIES.map((cat) => (
                                    <CategoryChip
                                        key={cat.id}
                                        category={cat}
                                        isSelected={selectedCategory?.id === cat.id}
                                        onPress={() => handleCategorySelect(cat)}
                                    />
                                ))}
                            </ScrollView>
                        </View>

                        {/* Sub-category selection card */}
                        {selectedCategory && (
                            <View
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.75)',
                                    borderRadius: 32,
                                    padding: 20,
                                    marginBottom: 16,
                                }}
                            >
                                <SectionTitle title="בחר תת-תחום" />
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    {selectedCategory.subCategories.map((sub) => (
                                        <SubCategoryChip
                                            key={sub.id}
                                            sub={sub}
                                            isSelected={selectedSubCategory?.id === sub.id}
                                            onPress={() => setSelectedSubCategory(sub)}
                                            accentColor={selectedCategory.color}
                                        />
                                    ))}
                                </View>
                            </View>
                        )}

                        {/* Comment card */}
                        <View
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.75)',
                                borderRadius: 32,
                                padding: 20,
                                marginBottom: 24,
                            }}
                        >
                            <SectionTitle title="הערה (אופציונלי)" />
                            <TextInput
                                value={comment}
                                onChangeText={setComment}
                                placeholder="הוסף הערה..."
                                placeholderTextColor="#C5DDD2"
                                multiline
                                numberOfLines={3}
                                textAlign="right"
                                style={{
                                    color: '#1A2E25',
                                    fontSize: 14,
                                    lineHeight: 22,
                                    minHeight: 70,
                                    textAlignVertical: 'top',
                                    backgroundColor: '#F5FBF7',
                                    borderRadius: 16,
                                    padding: 14,
                                    borderWidth: 1.5,
                                    borderColor: '#E8F3ED',
                                }}
                            />
                        </View>

                        {/* Submit button */}
                        <Pressable
                            onPress={handleSubmit}
                            disabled={!isFormValid || isSubmitting}
                            onPressIn={() =>
                                Animated.spring(submitScaleAnim, {
                                    toValue: 0.96,
                                    useNativeDriver: true,
                                    speed: 40,
                                }).start()
                            }
                            onPressOut={() =>
                                Animated.spring(submitScaleAnim, {
                                    toValue: 1,
                                    useNativeDriver: true,
                                    speed: 30,
                                }).start()
                            }
                        >
                            <Animated.View
                                style={{
                                    backgroundColor: isFormValid ? '#E05555' : '#D1E8DC',
                                    borderRadius: 22,
                                    paddingVertical: 18,
                                    alignItems: 'center',
                                    transform: [{ scale: submitScaleAnim }],
                                    shadowColor: isFormValid ? '#E05555' : 'transparent',
                                    shadowOffset: { width: 0, height: 6 },
                                    shadowOpacity: 0.4,
                                    shadowRadius: 12,
                                    elevation: isFormValid ? 6 : 0,
                                }}
                            >
                                <Text
                                    style={{
                                        color: isFormValid ? '#fff' : '#9BBFAD',
                                        fontSize: 16,
                                        fontWeight: '800',
                                        letterSpacing: 0.3,
                                    }}
                                >
                                    {isSubmitting ? '⏳ שומר...' : '✓ שמור הוצאה'}
                                </Text>
                            </Animated.View>
                        </Pressable>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ScreenWrapper>
    );
};

export default AddExpense;