import { SplashScreen, Stack } from 'expo-router'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import "./global.css"
import { useFonts } from "expo-font"
import { GlobalProvider } from '@/global-provider'

const RootLayout = () => {
    const [fontsLoaded] = useFonts({
        "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
        "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
        "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
        "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
        "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
        "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
    })


    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded])

    if (!fontsLoaded) return null;



    return (
        <GlobalProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </GlobalProvider>
    )
}

export default RootLayout

const styles = StyleSheet.create({})