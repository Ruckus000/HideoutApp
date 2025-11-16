import React from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';

/**
 * HideOut Kava App
 * Main entry point for the application
 *
 * A warm minimalist mobile ordering and rewards app
 * for the Kava Community Hub
 */
export default function App() {
  return (
    <>
      <AppNavigator />
      <StatusBar style="dark" />
    </>
  );
}
