import {useContext, useEffect, useState} from "react";
import {deleteSession, getCurrentSession, getCurrentUser} from "@/services/appWrite";
import {createContext} from "react";
import {AppState, AppStateStatus} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router} from "expo-router";


const GlobalContext = createContext<any>(null);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initApp = async () => {
            try {
                console.log("--- START AUTH CHECK ---");

                const lastExit = await AsyncStorage.getItem('lastExitTime');
                if (lastExit) {
                    const elapsed = Date.now() - parseInt(lastExit);
                    if (elapsed > 60000) {
                        await logout(); // זה ינקה את הסשן
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
                    try {
                        await deleteSession('current');
                    } catch (e) { /* התעלם אם נכשל */ }
                }
                setUser(null);
            } finally {
                setIsLoading(false);
                console.log("--- AUTH CHECK FINISHED ---");
            }
        };
        initApp();
    }, []);

// 2. האזנה למעברים בין "פתוח" ל"רקע" (AppState)
    useEffect(() => {
        const handleAppStateChange = async (nextAppState: AppStateStatus) => {
            // המשתמש סגר את האפליקציה או עבר לוואטסאפ (Background)
            if (nextAppState === 'background' || nextAppState === 'inactive') {
                await AsyncStorage.setItem('lastExitTime', Date.now().toString());
                console.log("App moved to background, exit time saved.");
            }

            // המשתמש חזר לאפליקציה (Active)
            if (nextAppState === 'active') {
                const lastExit = await AsyncStorage.getItem('lastExitTime');
                if (lastExit) {
                    const elapsed = Date.now() - parseInt(lastExit);
                    const oneMinute = 60 * 1000;

                    if (elapsed > oneMinute) {
                        console.log("Welcome back, but you were gone too long. Logging out...");
                        await logout(); // קורא ל-deleteSession ומעדכן setUser(null)
                    } else {
                        console.log("Welcome back! You were gone for less than a minute.");
                    }
                }
            }
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => subscription.remove();
    }, []);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace("/(auth)/login"); // מעביר אותו לדף ההתחברות
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
            // בכל מקרה - מנקים את המידע המקומי כדי שהאפליקציה תחזור למסך התחברות
            await AsyncStorage.removeItem('lastExitTime');
            setUser(null);
            console.log("Local session cleared.");
        }
    };

    return (

        <GlobalContext.Provider value={{ user, setUser, logout, isLoading}}>
            {children}
        </GlobalContext.Provider>
    );
}
export default  GlobalProvider