import {useContext, useEffect, useState} from "react";
import {deleteSession, getCurrentSession, getCurrentUser} from "@/services/appWrite";
import {createContext} from "react";
import {DevSettings, Platform, AppState, AppStateStatus, I18nManager} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router} from "expo-router";
import i18n from "i18next";
import * as Updates from 'expo-updates';

const GlobalContext = createContext<any>(null);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [language, setLanguage] = useState(i18n.language);

    // 1. פונקציית לוגאוט אחת בלבד - מעודכנת עבור ה-Service שלך
    const logout = async () => {
        try {
            // אנחנו שולחים 'current' כדי לרצות את ה-Service שדורש string
            // אבל עוטפים את זה כדי למנוע זליגת ארגומנטים מה-UI
            await deleteSession('current');
        } catch (error: any) {
            console.log("Logout failed:", error.message);
        } finally {
            await AsyncStorage.removeItem('lastExitTime');
            setUser(null);
            console.log("Local session cleared.");
        }
    };

    const toggleLanguage = async () => {
        try {
            const newLang = i18n.language === 'he' ? 'en' : 'he';
            const isRTL = newLang === 'he';

            await AsyncStorage.setItem('user-language', newLang);
            await i18n.changeLanguage(newLang);
            setLanguage(newLang);

            if (I18nManager.isRTL !== isRTL) {
                I18nManager.allowRTL(isRTL);
                I18nManager.forceRTL(isRTL);

                if (Platform.OS !== 'web') {
                    // תיקון ה-setTimeout למניעת שגיאת ארגומנטים
                    setTimeout(() => {
                        Updates.reloadAsync().catch(() => {});
                    }, 200);
                }
            }
        } catch (error) {
            console.error("Language toggle error:", error);
        }
    };

    useEffect(() => {
        const initApp = async () => {
            try {
                const savedLang = await AsyncStorage.getItem('user-language');
                if (savedLang) {
                    await i18n.changeLanguage(savedLang);
                    setLanguage(savedLang);

                    const shouldBeRTL = savedLang === 'he';
                    if (I18nManager.isRTL !== shouldBeRTL) {
                        I18nManager.allowRTL(shouldBeRTL);
                        I18nManager.forceRTL(shouldBeRTL);

                        if (Platform.OS !== 'web') {
                            setTimeout(() => { Updates.reloadAsync().catch(() => {}); }, 10);
                            return;
                        }
                    }
                }

                const userAccount = await getCurrentUser();
                if (userAccount) setUser(userAccount);

            } catch (error: any) {
                // קריאה בטוחה לניקוי סשן במקרה של שגיאת Auth
                try { await deleteSession('current'); } catch (e) {}
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        initApp();
    }, []);

    useEffect(() => {
        const handleAppStateChange = async (nextAppState: AppStateStatus) => {
            if (nextAppState === 'background' || nextAppState === 'inactive') {
                await AsyncStorage.setItem('lastExitTime', Date.now().toString());
            }

            if (nextAppState === 'active') {
                const lastExit = await AsyncStorage.getItem('lastExitTime');
                if (lastExit) {
                    const elapsed = Date.now() - parseInt(lastExit);
                    if (elapsed > 60000) {
                        await logout();
                    }
                }
            }
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => subscription.remove();
    }, [user]);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace("/(auth)/login");
        }
    }, [user, isLoading]);

    return (
        <GlobalContext.Provider value={{ user, setUser, logout, isLoading, language, toggleLanguage }}>
            {children}
        </GlobalContext.Provider>
    );
};
export default GlobalProvider;