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

const GlobalProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [language, setLanguage] = useState(i18n.language);

    const toggleLanguage = async () => {
        const newLang = i18n.language === 'he' ? 'en' : 'he';
        const isRTL = newLang === 'he';

        // שמירת השפה בזיכרון המכשיר
        await AsyncStorage.setItem('user-language', newLang);
        await i18n.changeLanguage(newLang);
        setLanguage(newLang);

        if (I18nManager.isRTL == isRTL) {
            I18nManager.allowRTL(isRTL);
            I18nManager.forceRTL(isRTL);

        }
    };

    useEffect(() => {
        const initApp = async () => {
            try {
                console.log("--- START AUTH CHECK ---");

                // טעינת השפה שנשמרה
                const savedLang = await AsyncStorage.getItem('user-language');
                if (savedLang) {
                    i18n.changeLanguage(savedLang);
                    setLanguage(savedLang);
                }

                const lastExit = await AsyncStorage.getItem('lastExitTime');
                if (lastExit) {
                    const elapsed = Date.now() - parseInt(lastExit);
                    if (elapsed > 60000) {
                        await logout();
                        setIsLoading(false);
                        return;
                    }
                }

                const userAccount = await getCurrentUser();
                if (userAccount) {
                    console.log("User found:", userAccount.email);
                    setUser(userAccount);
                }
            } catch (error: any) {
                if (error.code === 401 || error.message.includes("missing scopes")) {
                    console.log("Cleaning up invalid/guest session...");
                    try { await deleteSession('current'); } catch (e) { }
                }
                setUser(null);
            } finally {
                setIsLoading(false);
                console.log("--- AUTH CHECK FINISHED ---");
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
    }, [user]); // הוספת תלות ב-user

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace("/(auth)/login");
        }
    }, [user, isLoading]);

    const logout = async () => {
        try {
            await deleteSession('current');
        } catch (error: any) {
            if (error.code !== 401) {
                console.error("Logout from server failed:", error.message);
            }
        } finally {
            await AsyncStorage.removeItem('lastExitTime');
            setUser(null);
            console.log("Local session cleared.");
        }
    };

    return (
        <GlobalContext.Provider value={{ user, setUser, logout, isLoading, language, toggleLanguage }}>
            {children}
        </GlobalContext.Provider>
    );
}
export default GlobalProvider;