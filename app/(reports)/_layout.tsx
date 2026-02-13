import { Stack } from "expo-router";
import React from "react";

export default function ReportsLayout() {
    return (
        <Stack>
            <Stack.Screen name="dailyExpense" options={{ headerShown: false }} />
        </Stack>
    );
}