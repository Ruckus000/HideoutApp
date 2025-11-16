# HideOut Kava App - Setup Guide

Welcome to the HideOut Kava mobile application! This guide will help you get started with development.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or later) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Package manager (comes with Node.js)
- **Expo CLI** - Install globally: `npm install -g expo-cli`
- **Expo Go** app on your mobile device - Available on [iOS App Store](https://apps.apple.com/app/expo-go/id982107779) or [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

## Installation

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Start the development server:**

   ```bash
   npm start
   # or
   expo start
   ```

3. **Run on your device:**
   - Scan the QR code with the Expo Go app (Android) or Camera app (iOS)
   - Or press `a` for Android emulator or `i` for iOS simulator

## Project Structure

```
HideoutApp/
├── App.tsx                 # Main application entry point
├── app.json               # Expo configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── babel.config.js        # Babel configuration
├── assets/                # Images, fonts, and other assets
└── src/
    ├── components/        # Reusable UI components
    │   ├── Button.tsx
    │   ├── Card.tsx
    │   └── index.ts
    ├── screens/           # Screen components
    │   ├── HomeScreen.tsx
    │   ├── CartScreen.tsx
    │   ├── RewardsScreen.tsx
    │   ├── ProfileScreen.tsx
    │   └── index.ts
    ├── navigation/        # Navigation configuration
    │   ├── index.tsx
    │   ├── BottomTabNavigator.tsx
    │   └── types.ts
    ├── theme/             # Design system (colors, typography, spacing)
    │   ├── colors.ts
    │   ├── typography.ts
    │   ├── spacing.ts
    │   └── index.ts
    ├── context/           # React Context providers
    │   └── AppContext.tsx
    └── utils/             # Utility functions
        ├── formatters.ts
        ├── validation.ts
        └── index.ts
```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Path Aliases

The project uses path aliases for cleaner imports:

```typescript
import { Button } from '@components';
import { HomeScreen } from '@screens';
import { theme } from '@theme';
import { formatCurrency } from '@utils';
```

Available aliases:
- `@/*` - src directory
- `@components/*` - src/components
- `@screens/*` - src/screens
- `@navigation/*` - src/navigation
- `@theme/*` - src/theme
- `@context/*` - src/context
- `@utils/*` - src/utils

## Features

### Current Implementation

- Bottom tab navigation (Home, Rewards, Cart, Profile)
- Theme system with consistent colors and typography
- Reusable components (Button, Card)
- Global state management with Context API
- TypeScript for type safety
- Safe area handling for notched devices

### Planned Features

- Menu browsing and ordering
- Rewards point tracking
- User authentication
- Shopping cart functionality
- Order history
- Push notifications
- Payment integration

## Development Guidelines

1. **Use TypeScript** - All new files should be `.tsx` or `.ts`
2. **Follow the theme** - Use colors and spacing from `src/theme`
3. **Create reusable components** - Add common UI elements to `src/components`
4. **Type your components** - Define proper interfaces for props
5. **Use path aliases** - Import using `@` aliases instead of relative paths

## Troubleshooting

### Metro bundler issues
```bash
# Clear cache and restart
expo start -c
```

### Package installation issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### iOS simulator not opening
```bash
# Install watchman (macOS)
brew install watchman
```

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [React Navigation Documentation](https://reactnavigation.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## Support

For issues or questions, please refer to the project documentation or contact the development team.

---

Happy coding! Enjoy building the HideOut Kava app.
