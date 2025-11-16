# HideOut Kava App

A mobile ordering and rewards app for the Kava Community Hub, built with React Native and Expo. This application provides a seamless and user-friendly experience for customers to browse the menu, place orders, and earn loyalty rewards.

## Design Philosophy

**Warm Minimalism** - A fusion of two distinct concepts:
- **Minimalist Structure**: Clean, uncluttered interfaces with generous use of negative space.
- **Warm Kava-centric Theme**: Evokes the cozy, communal atmosphere of a kava bar.

## Features

### Core Screens
- **Home**: A welcoming discovery screen featuring new and popular products, an at-a-glance rewards widget, and intuitive category browsing.
- **Rewards**: A dedicated space for the loyalty program, where users can track their points, view redeemable rewards, and see their earned achievement badges.
- **Cart**: A fully functional shopping cart that allows users to manage items, apply promo codes, and review their order summary before checkout.
- **Profile**: A personalized section for users to manage their account details, view their order history, and set their application preferences.
- **Product Detail**: A detailed view for each product, allowing users to customize their order with size selections, add-ons, and quantity adjustments.

### Key Components
- **Floating Cart Bar**: A persistent and convenient cart summary that gracefully slides into view whenever an item is added to the cart.
- **Rewards Widget**: A motivational component on the home screen that visually tracks the user's progress toward their next reward.
- **Category Pills**: An elegant, horizontally scrolling selector that allows users to filter the product list by category.
- **Product Cards**: A clean, grid-based display for menu items, designed for easy browsing and quick additions to the cart.
- **Navigation**: A standard bottom tab navigator for seamless switching between the four main application screens.

## Tech Stack

- **React Native** 0.74.5
- **Expo** ~51.0.28
- **React Navigation** 6.x (Bottom Tabs + Stack)
- **AsyncStorage** for local data persistence
- **Expo Linear Gradient** for creating premium design elements
- **Expo Vector Icons** for a consistent and high-quality iconography set

## Design System

### Colors (Warm Minimalist Palette)
- **Primary**: Deep Olive Green (#6B7F47)
- **Accent**: Terracotta (#B8654B)
- **Secondary**: Warm Gold (#D4A574)
- **Background**: Warm Off-White (#FAFAF8)
- **Surface**: Pure White (#FFFFFF)
- **Text Primary**: Deep Charcoal (#1C1C1E)
- **Text Secondary**: Gray (#8E8E93)

### Typography
- **Font Family**: SF Pro Display / SF Pro Text (leveraging native iOS system fonts)
- **Hierarchy**: A clear visual hierarchy established through font weight and size, rather than relying on a wide variety of colors.

### Layout
- **Spacing**: A consistent 8pt grid system with generous use of negative space to create a breathable and uncluttered layout.
- **Border Radius**: Consistent rounded corners (ranging from 12-24px) for a soft and modern aesthetic.
- **Shadows**: Soft, subtle shadows to create a sense of depth and a premium feel.
- **Icons**: Feather and Ionicons are used to maintain a consistent line-art style throughout the app.

## Project Structure

```
HideoutApp/
├── App.tsx                 # The main entry point for the application. Initializes all providers and the main navigator.
├── package.json            # Lists project dependencies and scripts.
├── src/
│   ├── components/         # Contains reusable UI components used across multiple screens.
│   │   ├── StatusBar.js
│   │   ├── CategoryPill.js
│   │   ├── ProductCard.js
│   │   ├── RewardCard.js
│   │   ├── ProfileMenuItem.js
│   │   ├── CustomButton.js
│   │   ├── FloatingCartBar.js
│   │   └── index.js         # Exports all components for easy importing.
│   ├── screens/            # Contains the main screen components of the application.
│   │   ├── HomeScreen.js
│   │   ├── RewardsScreen.js
│   │   ├── CartScreen.js
│   │   ├── ProfileScreen.js
│   │   ├── ProductDetailScreen.js
│   │   └── index.ts         # Exports all screens for the navigator.
│   ├── navigation/         # Handles all navigation logic, including the tab navigator and stack navigators.
│   │   └── AppNavigator.js
│   ├── context/            # Manages global application state using React Context.
│   │   ├── CartContext.js   # Manages the state of the shopping cart.
│   │   ├── UserContext.js   # Manages user-related data like profile and rewards.
│   │   └── AppProvider.js   # A wrapper component that provides all contexts to the application.
│   └── theme/              # Contains design tokens for a consistent visual style.
│       ├── colors.js
│       ├── typography.js
│       ├── spacing.js
│       ├── shadows.js
│       └── index.js         # Exports all theme-related constants.
└── assets/                 # Contains static assets like images, fonts, etc.
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your physical device (iOS or Android) for testing.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/HideOut-Kava-App.git
    cd HideOut-Kava-App
    ```

2.  **Install dependencies:**
    This command will install all the necessary packages defined in `package.json`.
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm start
    ```

4.  **Run the app on your device:**
    - Scan the QR code generated by the Metro Bundler with the Expo Go app (on Android) or the Camera app (on iOS).
    - Alternatively, you can run the app on an emulator by pressing `a` for an Android emulator or `i` for an iOS simulator in the terminal where the server is running.

### Development Commands

```bash
npm start          # Starts the Expo development server.
npm run android    # Runs the app on a connected Android device or emulator.
npm run ios        # Runs the app on a connected iOS device or simulator.
npm run web        # Runs the app in a web browser (experimental).
npm run lint       # Runs ESLint to check for code quality and style issues.
```

## State Management

Global state is managed using React's Context API to avoid prop drilling and keep the codebase clean.

### Cart Context (`CartContext.js`)
- Manages adding and removing items from the cart.
- Handles updating item quantities.
- Calculates order totals, including tax and delivery fees.
- Persists the cart data to `AsyncStorage` to retain it between sessions.

### User Context (`UserContext.js`)
- Manages user profile information.
- Tracks rewards points and loyalty tier status.
- Stores order history.
- Manages user preferences, such as notification settings or dark mode.

## UI/UX Guidelines

### Interaction Design
- **Add to Cart**: Instant visual feedback is provided via a toast message and a smooth animation of the floating cart bar.
- **Button States**: All interactive elements have clear `default`, `pressed`, and `disabled` states to enhance usability.
- **Transitions**: Screen transitions are designed to be simple, fast, and feel native to the platform.
- **Thumb-Friendly Design**: Primary calls-to-action (CTAs) are large, high-contrast, and positioned at the bottom of the screen for easy one-handed use.

### Component Best Practices
- Always use theme tokens from `/src/theme` for colors, fonts, and spacing.
- Adhere strictly to the 8pt grid system for layout consistency.
- Maintain the warm minimalist aesthetic in all new components.
- Ensure proper handling of safe areas to avoid UI obstructions on notched devices.
- Test all new components on both iOS and Android platforms.

## Design Specifications

Full design specifications are available in `ui-ux.md`. This document includes:
- The global design system (color palette, typography, icons).
- The application architecture and navigation flows.
- Core user flow diagrams.
- Detailed specifications for each component.
- Screen-by-screen layouts and component placement.

## Contributing

When contributing to the project, please follow these guidelines:
1. Adhere to the **warm minimalist** design philosophy.
2. Utilize existing theme tokens and reusable components whenever possible.
3. Maintain consistent spacing, typography, and color usage.
4. Test your changes on multiple device sizes and both platforms (iOS/Android).
5. Ensure your code is accessible (e.g., sufficient color contrast, large touch targets).

## License

Proprietary - HideOut Kava Bar

## Support

For any issues or questions, please contact the development team.
