import { Stack } from "expo-router";
import GlobalFloatingButton from "@/app/GlobalFloatingButton";
import React from "react";

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack>
    );
}