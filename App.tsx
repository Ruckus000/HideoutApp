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
/**
 * The root component of the HideOut Kava App.
 * This function serves as the main entry point for the application,
 * setting up the navigation and status bar.
 *
 * @returns {JSX.Element} The rendered application.
 */
export default function App() {
  return (
    <>
      <AppNavigator />
      <StatusBar style="dark" />
    </>
  );
}
