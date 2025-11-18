# HideOut Kava - Production Backend Implementation Plan

**Version:** 1.0  
**Date:** January 2025  
**Backend:** Supabase + Stripe + Sanity CMS  
**Timeline:** 8 weeks to production

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Backend Architecture](#2-backend-architecture)
3. [Database Schema Design](#3-database-schema-design)
4. [Authentication System](#4-authentication-system)
5. [Product Management](#5-product-management-sanity-cms)
6. [Order Processing Flow](#6-order-processing-flow)
7. [Promo Code System](#7-promo-code-system)
8. [Rewards & Loyalty Program](#8-rewards--loyalty-program)
9. [Payment Integration](#9-payment-integration-stripe)
10. [Push Notifications](#10-push-notifications)
11. [Admin Dashboard](#11-admin-dashboard)
12. [API Integration Layer](#12-api-integration-layer)
13. [Security & Privacy](#13-security--privacy)
14. [Implementation Phases](#14-implementation-phases)
15. [Code Examples](#15-code-examples)
16. [Cost Breakdown](#16-cost-breakdown)
17. [Migration & Scaling Strategy](#17-migration--scaling-strategy)
18. [Testing Strategy](#18-testing-strategy)
19. [Deployment Checklist](#19-deployment-checklist)
20. [Appendices](#20-appendices)

---

## 1. Executive Summary

### Overview

This document outlines the complete backend implementation strategy for transitioning the HideOut Kava mobile app from mockup to production using modern, cost-effective technologies.

### Tech Stack

| Component | Technology | Cost | Why |
|-----------|-----------|------|-----|
| **Database & Backend** | Supabase (PostgreSQL) | $0-25/mo | Real-time, PostgreSQL, excellent free tier, RLS security |
| **CMS** | Sanity.io | $0 | Flexible content modeling, great DX, free for 3 users |
| **Payments** | Stripe | 2.9% + $0.30 | Industry standard, best mobile SDK, secure |
| **Push Notifications** | Expo Push | Free | Built into Expo, reliable, easy to use |
| **Hosting** | Expo/Vercel | $0 | Free tier sufficient for app + admin dashboard |

### Key Deliverables

✅ Production-ready backend (Weeks 1-2)  
✅ Complete order management system (Weeks 3-4)  
✅ Rewards & loyalty program (Weeks 5-6)  
✅ Admin dashboard & launch (Weeks 7-8)

### Cost Projections (Realistic)

**Year 1 (0-1,000 users):**
- **Monthly:** $0-5
- **Annual:** $136 (app store fees + domain)
- **Transaction fees:** 2.9% + $0.30 per order

**Year 2 (1,000-5,000 users):**
- **Monthly:** $25-75
- **Annual:** $300-900
- **Transaction fees:** Same

**Scaling (5,000+ users):**
- **Monthly:** $100-200
- **Transaction fees:** Same
- By this point, you should be profitable!

---

## 2. Backend Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     HIDEOUT KAVA APP                        │
│                  (React Native + Expo)                      │
└────────────┬────────────────────────────────────────────────┘
             │
             │ (API Calls)
             │
┌────────────▼────────────────────────────────────────────────┐
│                      SUPABASE BACKEND                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  PostgreSQL  │  │     Auth     │  │   Storage    │     │
│  │   Database   │  │   (Email,    │  │  (Product    │     │
│  │              │  │   Google,    │  │   Images)    │     │
│  │  - Products  │  │   Apple)     │  │              │     │
│  │  - Orders    │  └──────────────┘  └──────────────┘     │
│  │  - Users     │                                           │
│  │  - Rewards   │  ┌──────────────┐  ┌──────────────┐     │
│  │  - Promos    │  │  Realtime    │  │   Edge       │     │
│  └──────────────┘  │  (Live       │  │  Functions   │     │
│                     │   Updates)   │  │  (Business   │     │
│                     └──────────────┘  │   Logic)     │     │
│                                       └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
             │                            │
             │                            │
      ┌──────▼──────┐            ┌───────▼────────┐
      │   SANITY    │            │    STRIPE      │
      │     CMS     │            │   Payments     │
      │             │            │                │
      │  - Product  │            │  - Payment     │
      │    Content  │            │    Intents     │
      │  - Images   │            │  - Customer    │
      │  - Category │            │    Portal      │
      └─────────────┘            └────────────────┘
```

### Data Flow

**1. User Authentication Flow:**
```
User → Supabase Auth → JWT Token → Stored in Secure Storage
```

**2. Product Browsing Flow:**
```
App → Sanity CMS API → Product Data → Display in App
```

**3. Order Creation Flow:**
```
Cart (Local) → Supabase Orders Table → Stripe Payment → Order Confirmation
```

**4. Real-time Updates Flow:**
```
Order Status Change (Admin) → Supabase Realtime → Push Notification → App Update
```

---

## 3. Database Schema Design

### Complete PostgreSQL Schema

#### Users Table (Extended from Supabase Auth)

```sql
-- Users Profile Table (extends supabase.auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  
  -- Preferences
  notifications_enabled BOOLEAN DEFAULT true,
  dark_mode_enabled BOOLEAN DEFAULT false,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies: Users can read and update their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);
```

#### Products Table (Synced from Sanity)

```sql
-- Products Table
CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sanity_id TEXT UNIQUE NOT NULL, -- Reference to Sanity CMS
  
  -- Product Info
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'kava-cocktails', 'teas', 'shots', etc.
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  
  -- Availability
  available BOOLEAN DEFAULT true,
  in_stock BOOLEAN DEFAULT true,
  seasonal BOOLEAN DEFAULT false,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read available products
CREATE POLICY "Anyone can view available products"
  ON public.products FOR SELECT
  USING (available = true);
```

#### Product Modifiers Table

```sql
-- Product Modifiers (sizes, add-ons, etc.)
CREATE TABLE public.product_modifiers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  
  -- Modifier Info
  name TEXT NOT NULL, -- 'Size', 'Add-ons', etc.
  type TEXT NOT NULL, -- 'single', 'multiple'
  required BOOLEAN DEFAULT false,
  
  -- Options (JSON array of {label, priceModifier})
  options JSONB NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Example options JSONB:
-- [
--   {"label": "Small", "priceModifier": 0},
--   {"label": "Medium", "priceModifier": 2.00},
--   {"label": "Large", "priceModifier": 4.00}
-- ]
```

#### Orders Table

```sql
-- Orders Table
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  
  -- Order Details
  order_number TEXT UNIQUE NOT NULL, -- Human-readable (e.g., 'ORDER-2024-001')
  status TEXT NOT NULL DEFAULT 'pending', 
  -- Status: 'pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'
  
  -- Pricing
  subtotal DECIMAL(10, 2) NOT NULL,
  delivery_fee DECIMAL(10, 2) DEFAULT 0,
  tax DECIMAL(10, 2) NOT NULL,
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  
  -- Promo Code
  promo_code_id UUID REFERENCES public.promo_codes(id),
  promo_code_used TEXT,
  
  -- Payment
  stripe_payment_intent_id TEXT UNIQUE,
  payment_status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
  
  -- Fulfillment
  fulfillment_type TEXT NOT NULL, -- 'pickup', 'delivery'
  pickup_time TIMESTAMP WITH TIME ZONE,
  delivery_address JSONB,
  
  -- Notes
  customer_notes TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

#### Order Items Table

```sql
-- Order Items Table (line items)
CREATE TABLE public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  
  -- Item Details
  product_name TEXT NOT NULL, -- Snapshot in case product is deleted
  product_price DECIMAL(10, 2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  
  -- Modifiers selected (JSON)
  modifiers JSONB, -- [{"name": "Size", "value": "Large", "price": 4.00}]
  
  -- Calculated
  item_total DECIMAL(10, 2) NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view items from their own orders
CREATE POLICY "Users can view own order items"
  ON public.order_items FOR SELECT
  USING (
    order_id IN (
      SELECT id FROM public.orders WHERE user_id = auth.uid()
    )
  );
```

#### Promo Codes Table

```sql
-- Promo Codes Table
CREATE TABLE public.promo_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Code Details
  code TEXT UNIQUE NOT NULL,
  description TEXT,
  
  -- Discount Configuration
  discount_type TEXT NOT NULL, -- 'percentage', 'fixed_amount', 'bogo'
  discount_value DECIMAL(10, 2) NOT NULL,
  
  -- Restrictions
  min_order_amount DECIMAL(10, 2) DEFAULT 0,
  max_discount_amount DECIMAL(10, 2), -- Cap for percentage discounts
  
  -- Validity
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  valid_until TIMESTAMP WITH TIME ZONE,
  
  -- Usage Limits
  usage_limit INTEGER, -- NULL = unlimited
  usage_per_user INTEGER DEFAULT 1,
  times_used INTEGER DEFAULT 0,
  
  -- Status
  active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read active promo codes (for validation)
CREATE POLICY "Anyone can view active promo codes"
  ON public.promo_codes FOR SELECT
  USING (active = true AND valid_until > NOW());
```

#### Promo Code Usage Tracking

```sql
-- Track promo code usage by user
CREATE TABLE public.promo_code_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  promo_code_id UUID REFERENCES public.promo_codes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  order_id UUID REFERENCES public.orders(id),
  
  discount_applied DECIMAL(10, 2) NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.promo_code_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own promo usage"
  ON public.promo_code_usage FOR SELECT
  USING (auth.uid() = user_id);
```

#### Rewards Program Tables

```sql
-- User Rewards Program Status
CREATE TABLE public.user_rewards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) UNIQUE NOT NULL,
  
  -- Points & Tier
  points_balance INTEGER DEFAULT 0,
  lifetime_points INTEGER DEFAULT 0,
  tier TEXT DEFAULT 'bronze', -- 'bronze', 'silver', 'gold', 'platinum'
  
  -- Tier Progress
  tier_start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  next_tier_threshold INTEGER,
  
  -- Lifetime Stats
  lifetime_spend DECIMAL(10, 2) DEFAULT 0,
  total_orders INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own rewards"
  ON public.user_rewards FOR SELECT
  USING (auth.uid() = user_id);

-- Rewards Transactions Log
CREATE TABLE public.rewards_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  
  -- Transaction Details
  transaction_type TEXT NOT NULL, -- 'earned', 'redeemed', 'expired', 'bonus'
  points_change INTEGER NOT NULL, -- Positive for earned, negative for redeemed
  points_balance_after INTEGER NOT NULL,
  
  -- Related Entities
  order_id UUID REFERENCES public.orders(id),
  reward_id UUID REFERENCES public.redeemable_rewards(id),
  
  -- Description
  description TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.rewards_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions"
  ON public.rewards_transactions FOR SELECT
  USING (auth.uid() = user_id);
```

#### Redeemable Rewards Catalog

```sql
-- Redeemable Rewards Catalog
CREATE TABLE public.redeemable_rewards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Reward Details
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  
  -- Cost & Availability
  points_cost INTEGER NOT NULL,
  tier_required TEXT DEFAULT 'bronze', -- Minimum tier to redeem
  
  -- Type
  reward_type TEXT NOT NULL, -- 'free_item', 'discount', 'exclusive'
  reward_value JSONB, -- Configuration for the reward
  
  -- Availability
  available BOOLEAN DEFAULT true,
  expiry_days INTEGER DEFAULT 30, -- Days until reward expires after redemption
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.redeemable_rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available rewards"
  ON public.redeemable_rewards FOR SELECT
  USING (available = true);

-- Example reward_value JSONB:
-- {"type": "free_item", "product_id": "uuid-here"}
-- {"type": "discount", "amount": 5.00}
-- {"type": "percentage", "value": 20}
```

#### User Claimed Rewards

```sql
-- User Claimed Rewards (Active rewards ready to use)
CREATE TABLE public.user_claimed_rewards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  reward_id UUID REFERENCES public.redeemable_rewards(id),
  
  -- Reward Details (snapshot)
  reward_name TEXT NOT NULL,
  reward_type TEXT NOT NULL,
  reward_value JSONB NOT NULL,
  
  -- Status
  status TEXT DEFAULT 'active', -- 'active', 'used', 'expired'
  
  -- Usage
  used_on_order_id UUID REFERENCES public.orders(id),
  
  -- Expiry
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  used_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.user_claimed_rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own claimed rewards"
  ON public.user_claimed_rewards FOR SELECT
  USING (auth.uid() = user_id);
```

#### Badges & Achievements

```sql
-- Badges Catalog
CREATE TABLE public.badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Badge Details
  name TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  
  -- Unlock Criteria
  criteria_type TEXT NOT NULL, -- 'orders_count', 'spend_amount', 'streak_days', 'referrals'
  criteria_value INTEGER NOT NULL,
  
  -- Rewards
  points_reward INTEGER DEFAULT 0,
  
  -- Display
  display_order INTEGER,
  active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active badges"
  ON public.badges FOR SELECT
  USING (active = true);

-- User Earned Badges
CREATE TABLE public.user_badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  badge_id UUID REFERENCES public.badges(id),
  
  progress INTEGER DEFAULT 0, -- Current progress toward earning
  earned BOOLEAN DEFAULT false,
  earned_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, badge_id)
);

-- Enable RLS
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own badges"
  ON public.user_badges FOR SELECT
  USING (auth.uid() = user_id);
```

### Database Functions & Triggers

```sql
-- Function: Update user rewards after order completion
CREATE OR REPLACE FUNCTION update_rewards_after_order()
RETURNS TRIGGER AS $$
DECLARE
  points_earned INTEGER;
  user_rewards_record RECORD;
BEGIN
  -- Only process if order status changed to 'completed'
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    
    -- Calculate points (10 points per dollar spent)
    points_earned := FLOOR(NEW.total * 10);
    
    -- Update user rewards
    UPDATE public.user_rewards
    SET 
      points_balance = points_balance + points_earned,
      lifetime_points = lifetime_points + points_earned,
      lifetime_spend = lifetime_spend + NEW.total,
      total_orders = total_orders + 1,
      updated_at = NOW()
    WHERE user_id = NEW.user_id
    RETURNING * INTO user_rewards_record;
    
    -- Log transaction
    INSERT INTO public.rewards_transactions (
      user_id,
      transaction_type,
      points_change,
      points_balance_after,
      order_id,
      description
    ) VALUES (
      NEW.user_id,
      'earned',
      points_earned,
      user_rewards_record.points_balance,
      NEW.id,
      'Points earned from order ' || NEW.order_number
    );
    
    -- Check and update tier if needed
    -- (Additional tier logic can be added here)
    
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: Call function after order update
CREATE TRIGGER trigger_update_rewards_after_order
  AFTER UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION update_rewards_after_order();
```

---

## 4. Authentication System

**Supabase Auth Features:**
- Email/password signup with automatic email confirmation
- Social login (Google, Apple) with OAuth
- Session management with JWT tokens
- Password reset flow built-in
- Automatic profile creation on signup

**Setup Steps:**
1. Enable auth providers in Supabase dashboard
2. Configure OAuth redirect URLs
3. Implement signup/signin in React Native
4. Store session in SecureStore
5. Create profile and rewards account on first signup

**Code Example:**
```typescript
import { supabase } from './supabase';

// Sign up
const { data, error } = await supabase.auth.signUp({
  email, password,
  options: { data: { full_name: fullName } }
});

// Create profile
await supabase.from('profiles').insert({ id: data.user.id, ...});

// Initialize rewards
await supabase.from('user_rewards').insert({ user_id: data.user.id });
```

---

## 5. Product Management (Sanity CMS)

**Why Sanity:**
- FREE tier (unlimited API calls, 3 users)
- Real-time collaboration
- CDN-optimized images
- Version history
- Great mobile-friendly admin UI

**Product Schema:** Name, description, category, price, image, modifiers, availability

**Sync Strategy:** Fetch products on app load → Cache locally → Refresh periodically

---

## 6. Order Processing Flow

**Workflow:**
1. Cart (local) → Checkout → Validate promo → Calculate total
2. Create Stripe PaymentIntent → Collect payment
3. On success → Create order in Supabase → Award points
4. Send confirmation notification → Clear cart

**Order States:** pending → confirmed → preparing → ready → completed

---

## 7. Promo Code System

**Features:**
- Percentage discounts (e.g., 20% off)
- Fixed amount discounts (e.g., $5 off)
- Minimum order requirements
- Usage limits (total & per-user)
- Expiration dates
- One-time or multi-use codes

**Validation Logic:**
1. Check code exists and is active
2. Check expiration date
3. Check minimum order amount
4. Check usage limits
5. Calculate discount
6. Log usage

---

## 8. Rewards & Loyalty Program

**Points System:**
- Earn 10 points per $1 spent
- Points awarded when order status = 'completed'
- Automatic tier upgrades based on lifetime points

**Tiers:**
- Bronze: 0-999 points
- Silver: 1,000-2,499 points
- Gold: 2,500-4,999 points
- Platinum: 5,000+ points

**Rewards Catalog:**
- Free items (e.g., "Free Kava Shot" - 500 points)
- Discounts (e.g., "$5 Off" - 750 points)
- Exclusive items (tier-locked)

**Badge System:**
- "Early Bird" - 5 morning orders
- "Kava Explorer" - Try 10 different drinks
- "30-Day Streak" - Order 30 days in a row

---

## 9. Payment Integration (Stripe)

**Setup:**
1. Create Stripe account → Get API keys (test & live)
2. Install `@stripe/stripe-react-native`
3. Create PaymentIntent on backend (Supabase Edge Function)
4. Collect payment in app
5. Confirm payment → Create order

**Flow:**
```typescript
// 1. Create payment intent
const { client_secret } = await createPaymentIntent(total);

// 2. Collect payment
const { error } = await confirmPayment(client_secret, {
  type: 'Card',
  billingDetails: { email: user.email }
});

// 3. On success, create order
if (!error) {
  await createOrder(cart, total, paymentIntentId);
}
```

**Cost:** 2.9% + $0.30 per transaction (no monthly fees)

---

## 10. Push Notifications

**Expo Push Notifications:**
- FREE and unlimited
- No configuration needed
- Works on iOS and Android

**Use Cases:**
- Order confirmed
- Order ready for pickup
- Rewards milestone reached
- New promo code available

**Implementation:**
```typescript
import * as Notifications from 'expo-notifications';

// Get push token
const token = (await Notifications.getExpoPushTokenAsync()).data;

// Save token to user profile
await supabase.from('profiles').update({ push_token: token });

// Send notification (from backend)
await fetch('https://exp.host/--/api/v2/push/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: userPushToken,
    title: 'Order Ready!',
    body: 'Your order is ready for pickup',
  }),
});
```

---

## 11. Admin Dashboard

**Sanity Studio:** Product management (FREE, included)

**Custom Admin Panel Options:**
1. **Retool** (easiest, drag & drop) - $10/user/month
2. **Supabase Dashboard** (basic, FREE)
3. **Custom React app** (most control, host on Vercel FREE)

**Features Needed:**
- View & update order status
- Create promo codes
- View analytics (orders, revenue, popular products)
- Manage users & rewards
- View customer support requests

**Recommended:** Start with Sanity Studio + Supabase Dashboard (both FREE), add Retool later if needed

---

## 12. API Integration Layer

**Supabase Client Setup:**
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
    },
  }
);
```

**Service Layer Pattern:**
```
services/
  ├── auth.service.ts       # Authentication
  ├── products.service.ts   # Product fetching
  ├── orders.service.ts     # Order management
  ├── rewards.service.ts    # Rewards & points
  └── payments.service.ts   # Stripe integration
```

**Error Handling:**
```typescript
try {
  const { data, error } = await supabase.from('orders').select();
  if (error) throw error;
  return data;
} catch (error) {
  console.error('Order fetch failed:', error);
  // Show user-friendly error message
  Alert.alert('Error', 'Failed to load orders');
}
```

---

## 13. Security & Privacy

**Row-Level Security (RLS):** Enabled on all tables
**API Keys:** Use environment variables, never commit
**PCI Compliance:** Handled by Stripe (never store card data)
**GDPR:** Allow users to export/delete their data
**Data Encryption:** Postgres encryption at rest (automatic)

**Key RLS Policies:**
- Users can only view/edit their own data
- Orders tied to user_id
- Admin role for dashboard access

---

## 14. Implementation Phases

### Phase 1: Foundation (Weeks 1-2)
**Goal:** Backend setup & auth working

**Tasks:**
- [ ] Create Supabase project
- [ ] Set up database schema (run SQL migrations)
- [ ] Configure authentication providers
- [ ] Create Sanity CMS project
- [ ] Define product schema
- [ ] Integrate Supabase auth in app
- [ ] Test signup/signin flow
- [ ] Fetch products from Sanity

**Deliverable:** Users can sign up and browse products

---

### Phase 2: Core Features (Weeks 3-4)
**Goal:** Complete ordering system

**Tasks:**
- [ ] Integrate Stripe SDK
- [ ] Implement checkout flow
- [ ] Create order submission logic
- [ ] Test payment processing
- [ ] Display order history
- [ ] Add order status tracking

**Deliverable:** Users can place and pay for orders

---

### Phase 3: Loyalty & Promos (Weeks 5-6)
**Goal:** Rewards system functional

**Tasks:**
- [ ] Implement promo code validation
- [ ] Create admin promo code generator
- [ ] Build rewards points system
- [ ] Create rewards redemption flow
- [ ] Implement badge system
- [ ] Display points/tier on profile

**Deliverable:** Complete loyalty program working

---

### Phase 4: Polish & Launch (Weeks 7-8)
**Goal:** Production-ready app

**Tasks:**
- [ ] Set up push notifications
- [ ] Create admin dashboard
- [ ] End-to-end testing
- [ ] Security audit
- [ ] App Store assets
- [ ] Submit to App Store & Google Play

**Deliverable:** App live in stores!

---

## 15. Code Examples

### Complete Order Flow Example

```typescript
// services/checkout.service.ts
import { supabase } from './supabase';
import { createPaymentIntent, confirmPayment } from './stripe.service';

export const completeCheckout = async (
  cart: CartItem[],
  promoCode?: string
) => {
  try {
    // 1. Calculate totals
    const subtotal = calculateSubtotal(cart);
    const tax = subtotal * 0.08;
    const delivery = 3.00;
    let discount = 0;
    
    // 2. Validate promo code
    if (promoCode) {
      const { discount: promoDiscount } = await validatePromoCode(
        promoCode,
        user.id,
        subtotal
      );
      discount = promoDiscount;
    }
    
    const total = subtotal + tax + delivery - discount;
    
    // 3. Create Stripe payment intent
    const { clientSecret, paymentIntentId } = await createPaymentIntent(total);
    
    // 4. Show payment sheet
    const { error: paymentError } = await confirmPayment(clientSecret);
    if (paymentError) throw new Error('Payment failed');
    
    // 5. Create order in Supabase
    const order = await createOrder({
      cart,
      subtotal,
      tax,
      delivery,
      discount,
      total,
      paymentIntentId,
      promoCode,
    });
    
    // 6. Clear cart
    clearCart();
    
    // 7. Navigate to order confirmation
    navigation.navigate('OrderConfirmation', { orderId: order.id });
    
    return order;
  } catch (error) {
    console.error('Checkout failed:', error);
    Alert.alert('Error', error.message);
  }
};
```

---

## 16. Cost Breakdown

### Startup Costs (One-time)
| Item | Cost |
|------|------|
| Apple Developer Account | $99/year |
| Google Play Developer | $25 one-time |
| Domain name | $12/year |
| **Total** | **$136/year** |

### Monthly Operating Costs

**Year 1 (0-1,000 users):**
| Service | Cost |
|---------|------|
| Supabase | $0 (free tier) |
| Sanity CMS | $0 (free tier) |
| Stripe | 2.9% + $0.30 per transaction |
| Expo Push | $0 (free) |
| **Monthly Total** | **$0-10** |

**Year 2 (1,000-5,000 users):**
| Service | Cost |
|---------|------|
| Supabase | $25/mo (Pro plan) |
| Sanity CMS | $0 (still free!) |
| Stripe | 2.9% + $0.30 |
| CDN (Cloudflare) | $0 (free tier) |
| **Monthly Total** | **$25-50** |

**At Scale (5,000+ users):**
| Service | Cost |
|---------|------|
| Supabase | $100/mo |
| Sanity CMS | $99/mo (if >3 admins) |
| Stripe | 2.9% + $0.30 |
| CDN | $20/mo |
| **Monthly Total** | **$120-220** |

**Revenue Projection:**
- 5,000 users × 2 orders/month × $15 average = **$150,000/month**
- Backend costs: $220/month = **0.15% of revenue**

---

## 17. Migration & Scaling Strategy

**When to Upgrade:**
- **Free → Pro ($25/mo):** When you hit 500 MB database or 2 GB bandwidth
- **Pro → Team ($100/mo):** When you need daily backups & priority support

**Performance Optimization:**
1. Add database indexes on frequently queried columns
2. Use Supabase Edge Functions for complex business logic
3. Implement caching for products (AsyncStorage)
4. Use CDN for images (Sanity has this built-in)
5. Paginate order history queries

**If You Outgrow Supabase:**
- Self-host Supabase (it's open source!)
- Migrate to AWS RDS + custom API
- But honestly, Supabase scales to millions of users

---

## 18. Testing Strategy

**Unit Tests:**
- Business logic (points calculation, discount validation)
- Use Jest

**Integration Tests:**
- API calls to Supabase
- Mock responses for offline scenarios

**E2E Tests:**
- Complete order flow (Detox)
- Payment flow (Stripe test mode)

**Manual QA Checklist:**
- [ ] Sign up new user
- [ ] Browse products
- [ ] Add to cart
- [ ] Apply promo code
- [ ] Complete checkout
- [ ] Verify order in database
- [ ] Check points awarded
- [ ] Test push notifications
- [ ] Redeem reward

---

## 19. Deployment Checklist

### Pre-Launch
- [ ] Set up production Supabase project
- [ ] Configure production Stripe account
- [ ] Set up Sanity production dataset
- [ ] Add production API keys to environment variables
- [ ] Enable RLS on all tables
- [ ] Test payment flow with real card
- [ ] Set up database backups
- [ ] Configure error monitoring (Sentry)

### App Store Submission
- [ ] Create App Store Connect account
- [ ] Prepare screenshots (6.5", 5.5")
- [ ] Write app description
- [ ] Set privacy policy URL
- [ ] Build production iOS IPA
- [ ] Build production Android AAB
- [ ] Submit for review

### Post-Launch
- [ ] Monitor error logs
- [ ] Watch Supabase metrics
- [ ] Track Stripe dashboard
- [ ] Respond to reviews
- [ ] Fix critical bugs quickly

---

## 20. Appendices

### A. Supabase SQL Migration File

Save as `supabase/migrations/001_initial_schema.sql` and run in Supabase SQL editor.

### B. Environment Variables

```bash
# .env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key

SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production

STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...  # Server-side only!
```

### C. Useful Resources

**Supabase:**
- Docs: https://supabase.com/docs
- React Native Guide: https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native

**Stripe:**
- React Native SDK: https://stripe.dev/stripe-react-native
- Test Cards: https://stripe.com/docs/testing

**Sanity:**
- Getting Started: https://www.sanity.io/docs
- React Native: https://www.sanity.io/guides/sanity-nextjs-preview-mode

**Expo:**
- Push Notifications: https://docs.expo.dev/push-notifications/overview/

### D. Support & Community

- Supabase Discord: https://discord.supabase.com
- Stripe Support: https://support.stripe.com
- React Native Community: https://reactnative.dev/community/overview

---

## Conclusion

This plan provides a complete, production-ready backend architecture for the HideOut Kava app using modern, cost-effective tools. The total cost to launch is under $200, and monthly costs remain under $50 until you reach significant scale.

**Key Takeaways:**
- ✅ **FREE to start** (under $150/year for first 1,000 users)
- ✅ **8 weeks to production** (if you work on it consistently)
- ✅ **Scales automatically** (no server management)
- ✅ **Industry-standard security** (RLS + Stripe + JWT)
- ✅ **Easy to maintain** (minimal code, managed services)

**Next Steps:**
1. Create Supabase account → Set up database
2. Create Sanity account → Define product schema
3. Create Stripe account → Get API keys
4. Start implementing Phase 1!

Good luck with your launch! 🚀☕

---

*Document Version: 1.0*  
*Last Updated: January 2025*  
*Questions? Review the code examples or check the resource links above.*

