import { Stack } from "expo-router";
import './globals.css';
import { StatusBar } from "react-native";
import GlobalProvider from "@/context/GlobalProvider";

export default function RootLayout() {
    return (
        <GlobalProvider>
            <StatusBar hidden={true} />
            {/* ה-Stack חייב להיות כאן כדי שה-Index יוכל לבצע ניווט בתוכו */}
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </GlobalProvider>
    );
}