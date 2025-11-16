# ⚡ Quick Fix Checklist
## React Native Performance Fixes - HideOut Kava App

**Print this and check off as you go!**

---

## 🔴 CRITICAL PRIORITY (Do First!)

### Static Data Outside Components
```
□ HomeScreen.js - Move CATEGORIES, PRODUCTS, REWARDS_PROGRESS outside
□ RewardsScreen.js - Move AVAILABLE_REWARDS, WAYS_TO_EARN, BADGES outside
□ ProductDetailScreen.js - Move sizes, addons outside
```

### Nested Components (SEVERE ISSUE!)
```
□ CartScreen.js:179 - Move EmptyCart component outside
□ ProfileScreen.js:47 - Move MenuButton component outside
□ ProfileScreen.js:82 - Move MenuDivider component outside
□ AppNavigator.js:68 - Move CartTabBadge component outside
```

### Add useCallback to Event Handlers
```
□ HomeScreen.js - handleCategorySelect, handleProductAdd
□ ProductDetailScreen.js - toggleAddon, incrementQuantity, decrementQuantity, handleAddToCart
□ CartScreen.js - updateQuantity, removeItem, clearAll
□ ProfileScreen.js - handleNotificationsToggle, handleDarkModeToggle
□ RewardsScreen.js - handleRewardRedeem
```

### Add useMemo to Calculations
```
□ HomeScreen.js - filteredProducts
□ ProductDetailScreen.js - calculateTotal
□ CartScreen.js - subtotal, tax, total
□ RewardsScreen.js - displayedRewards
```

---

## 🟡 HIGH PRIORITY (Do Next!)

### Fix Keys in Lists
```
□ HomeScreen.js:254 - Use category name instead of index
□ HomeScreen.js:308 - Use product.id instead of index
□ CategoryPill.js:29 - Use category name instead of index
```

### Fix Invalid Styles
```
□ CategoryPill.js:74 - Remove whiteSpace: 'nowrap', add numberOfLines={1}
```

### Fix Animation Issues
```
□ FloatingCartBar.js:147 - Add cleanup function to useEffect
□ FloatingCartBar.js:193 - Replace _value access with state
```

### Error Handling
```
□ ProductDetailScreen.js:247 - Add try-catch to handleAddToCart
□ CartContext.js - Improve AsyncStorage error handling
□ UserContext.js - Improve AsyncStorage error handling
```

### Remove Debug Logs
```
□ ProductDetailScreen.js:257 - Wrap in __DEV__
□ CartContext.js:99,129 - Wrap in __DEV__
□ UserContext.js:159,185 - Wrap in __DEV__
```

---

## 🟢 MEDIUM PRIORITY (When You Can)

### Extract Constants
```
□ Create src/constants/app.js
□ Add DELIVERY_FEE = 3.0
□ Add TAX_RATE = 0.08
□ Add MAX_CART_BADGE_COUNT = 99
□ Update CartScreen.js to use constants
```

### Add PropTypes/TypeScript
```
□ ProductCard.js - Add PropTypes
□ CategoryPill.js - Add PropTypes
□ CustomButton.js - Add PropTypes
□ StatusBar.js - Add PropTypes
□ ProfileMenuItem.js - Add PropTypes
□ RewardCard.js - Add PropTypes
□ FloatingCartBar.js - Add PropTypes
```

### Accessibility
```
□ Add accessibilityLabel to TouchableOpacity elements
□ Add accessibilityHint where helpful
□ Add accessibilityRole="button" to buttons
□ Test with screen reader
```

---

## ⚪ LOW PRIORITY (Nice to Have)

### Error Boundaries
```
□ Create ErrorBoundary component
□ Wrap app in ErrorBoundary
□ Add error logging service
```

### Testing
```
□ Add unit tests for context providers
□ Add component tests
□ Add navigation tests
□ Add integration tests
```

### Optimization
```
□ Consider FlatList for large product lists
□ Add image optimization
□ Add bundle size analysis
□ Profile with React DevTools
```

---

## 📋 Testing After Each Fix

After each checkbox, test:
```
□ App loads without errors
□ No console errors/warnings
□ Navigation works correctly
□ Animations are smooth
□ No performance regressions
```

---

## 🎯 Quick Win Order

**Start Here (Biggest Impact, Easiest Fixes):**

1. ✅ CartScreen.js - Move EmptyCart outside (5 min)
2. ✅ ProfileScreen.js - Move MenuButton/MenuDivider outside (5 min)
3. ✅ HomeScreen.js - Move CATEGORIES, PRODUCTS outside (5 min)
4. ✅ RewardsScreen.js - Move static arrays outside (5 min)
5. ✅ CategoryPill.js - Fix whiteSpace style (2 min)
6. ✅ CategoryPill.js - Fix keys (2 min)
7. ✅ HomeScreen.js - Fix product keys (2 min)

**Total: ~30 minutes for 7 high-impact fixes!**

---

## 📊 Progress Tracker

Total Items: 23 critical issues

Progress:
```
[___________________________________________] 0%

After Day 1:
[#########__________________________________] 25%

After Day 3:
[####################_______________________] 50%

After Day 5:
[################################___________] 75%

Complete:
[###########################################] 100%
```

---

## ⏱️ Time Estimates

| Priority | Items | Est. Time | Cumulative |
|----------|-------|-----------|------------|
| Critical | 4 groups | 2-3 days | 3 days |
| High | 5 items | 1-2 days | 5 days |
| Medium | 3 groups | 2-3 days | 8 days |
| Low | 3 groups | 2-3 days | 11 days |

**MVP (Critical + High): 5 days**
**Full Fix: 8-11 days**

---

## 🚨 Common Mistakes to Avoid

While fixing, DON'T:
```
❌ Define new components inside components
❌ Use inline arrow functions in render
❌ Forget dependencies in useCallback/useMemo
❌ Use index as key for dynamic lists
❌ Skip testing after changes
❌ Use console.log without __DEV__ check
❌ Access animated values with ._value
❌ Forget cleanup functions in useEffect
```

---

## ✅ Verification Steps

After all fixes, verify:
```
□ Run React Native Debugger
□ Check for yellow/red warnings
□ Profile with React DevTools
□ Test on low-end device
□ Test all navigation flows
□ Test all user interactions
□ Check animation smoothness
□ Verify cart operations
□ Test error scenarios
□ Check memory usage
```

---

## 📝 Notes Section

Use this space to track issues you find:

```
Issue: _________________________________________________
Fix: ___________________________________________________
Date: __________________________________________________

Issue: _________________________________________________
Fix: ___________________________________________________
Date: __________________________________________________

Issue: _________________________________________________
Fix: ___________________________________________________
Date: __________________________________________________
```

---

**Print Date:** _______________
**Started:** _______________
**Completed:** _______________
