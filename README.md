# HideOut Kava App

A mobile ordering and rewards app for the Kava Community Hub, built with React Native and Expo.

## Design Philosophy

**Warm Minimalism** - A fusion of two distinct concepts:
- **Minimalist Structure**: Clean, uncluttered interfaces with generous use of negative space
- **Warm Kava-centric Theme**: Evokes the cozy, communal atmosphere of a kava bar

## Features

### Core Screens
- **Home**: Discovery screen with featured products, rewards widget, and category browsing
- **Rewards**: Loyalty program with points tracking, redeemable rewards, and achievement badges
- **Cart**: Shopping cart with item management, promo codes, and order summary
- **Profile**: User account management, order history, and preferences
- **Product Detail**: Product customization with size selection, add-ons, and quantity control

### Key Components
- **Floating Cart Bar**: Persistent cart summary that slides in when items are added
- **Rewards Widget**: Progress tracking toward next reward on the home screen
- **Category Pills**: Horizontal scrolling category selector
- **Product Cards**: Grid display of menu items
- **Navigation**: Bottom tab navigation with 4 main tabs

## Tech Stack

- **React Native** 0.74.5
- **Expo** ~51.0.28
- **React Navigation** 6.x (Bottom Tabs + Stack)
- **AsyncStorage** for data persistence
- **Expo Linear Gradient** for premium design elements
- **Expo Vector Icons** for consistent iconography

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
- **Font Family**: SF Pro Display / SF Pro Text (iOS system fonts)
- **Hierarchy**: Established through font weight and size, not color variety

### Layout
- **Spacing**: 8pt grid system with generous negative space
- **Border Radius**: Consistent rounded corners (12-24px)
- **Shadows**: Soft, premium elevation styles
- **Icons**: Feather and Ionicons for consistent line-art style

## Project Structure

```
HideoutApp/
├── App.tsx                 # Main entry point
├── package.json
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── StatusBar.js
│   │   ├── CategoryPill.js
│   │   ├── ProductCard.js
│   │   ├── RewardCard.js
│   │   ├── ProfileMenuItem.js
│   │   ├── CustomButton.js
│   │   ├── FloatingCartBar.js
│   │   └── index.js
│   ├── screens/           # Screen components
│   │   ├── HomeScreen.js
│   │   ├── RewardsScreen.js
│   │   ├── CartScreen.js
│   │   ├── ProfileScreen.js
│   │   ├── ProductDetailScreen.js
│   │   └── index.ts
│   ├── navigation/        # Navigation setup
│   │   └── AppNavigator.js
│   ├── context/          # State management
│   │   ├── CartContext.js
│   │   ├── UserContext.js
│   │   └── AppProvider.js
│   └── theme/            # Design tokens
│       ├── colors.js
│       ├── typography.js
│       ├── spacing.js
│       ├── shadows.js
│       └── index.js
└── assets/               # Images, fonts, etc.
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your phone (iOS or Android)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your device:
- Scan the QR code with Expo Go app (Android) or Camera app (iOS)
- Or press `a` for Android emulator / `i` for iOS simulator

### Development Commands

```bash
npm start          # Start Expo development server
npm run android    # Run on Android device/emulator
npm run ios        # Run on iOS device/simulator
npm run web        # Run in web browser
npm run lint       # Run ESLint
```

## State Management

### Cart Context
- Add/remove items from cart
- Update item quantities
- Calculate totals with tax and delivery
- Persist cart data with AsyncStorage

### User Context
- User profile management
- Rewards points and tier tracking
- Order history
- User preferences (notifications, dark mode, etc.)

## UI/UX Guidelines

### Interaction Design
- **Add to Cart**: Shows immediate feedback with toast message + floating cart bar animation
- **Button States**: Clear default, pressed, and disabled states
- **Transitions**: Simple, fast, native-feeling animations
- **Thumb-Friendly**: Primary CTAs are large, high-contrast, and bottom-positioned

### Component Best Practices
- Use theme tokens from `/src/theme`
- Follow 8pt grid spacing
- Maintain warm minimalist aesthetic
- Ensure proper safe area handling
- Test on both iOS and Android

## Design Specifications

Full design specifications are available in `ui-ux.md`, including:
- Global design system (color palette, typography, icons)
- App architecture and navigation
- Core user flows
- Component specifications
- Screen-by-screen layouts

## Contributing

When adding new features:
1. Follow the warm minimalist design philosophy
2. Use existing theme tokens and components
3. Maintain consistent spacing and typography
4. Test on multiple device sizes
5. Ensure accessibility (contrast ratios, touch targets)

## License

Proprietary - HideOut Kava Bar

## Support

For issues or questions, please contact the development team.
