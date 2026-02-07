import { Redirect } from 'expo-router';
import { useGlobalContext } from "@/context/GlobalProvider";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
    const { user, isLoading } = useGlobalContext();
    // 1. מחכים שה-Root Layout יסיים להיטען וה-Provider יסיים לבדוק סשן
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // 2. רק כשאנחנו בטוחים ב-100% ש-isLoading הוא false
    if (user) {
        return <Redirect href="/(tabs)" />;
    }

    return <Redirect href="/(auth)/login" />;
}