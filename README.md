## Overview

This React Native project is a technical assignment for the Mobile Engineer position at Immfly.

It simulates a simple in-flight shopping flow:

- **Screen 1 (Home)**: Product catalog with multi-currency support, quantity selection, and product type filtering
- **Screen 2 (Cart)**: Shopping cart management with seat selection, payment methods, and inventory updates after payment

## Running the app

- Install the dependencies:

  ```sh
  npm install
  ```

- Start the development server:

  ```sh
  npm start
  ```

- Build and run iOS and Android development builds:

  ```sh
  npm run ios
  # or
  npm run android
  ```

- In the terminal running the development server, press `i` to open the iOS simulator, `a` to open the Android device or emulator, or `w` to open the web browser.

## Features

### Home Screen (Product Catalog)

- **Quantity Selection**: Modal-based quantity picker with stock validation
- **Product Type Filtering**: Business, Retail, Crew, Happy Hour, and Invitation categories
- **Stock Display**: Shows available units for each product
- **Pull-to-Refresh**: Refresh product data from API
- **Cart Indicators**: Visual badges showing selected quantities

### Cart Screen (Shopping Management)

- **Cart Items Management**: Add, remove, and adjust quantities
- **Swipe-to-Delete**: Left swipe gesture to remove items from cart
- **Seat Selection**: Picker for seat letters (A-K) and numbers (1-30)
- **Payment Methods**: Cash and Card payment options (only UI is implemented, both payment methods are mocked)
- **Multi-Currency Total**: Dynamic total calculation in selected currency
- **Inventory Updates**: Automatic stock reduction after successful payment (not persistent)
- **Empty Cart**: Cart clears automatically after successful payment

### Multi-Currency System

- **Supported Currencies**: EUR (base), USD, GBP
- **Real-time Conversion**: Fixed exchange rates (EUR: 1.0, USD: 1.08, GBP: 0.85)
- **Persistent Selection**: Currency preference saved locally (AsyncStorage)
- **Dynamic Pricing**: All prices update instantly when currency changes
- **Cross-Currency Display**: Shows totals in alternative currencies

### Inventory Management

- **Automatic Deduction**: Stock reduces after successful payment (not persistent)
- **Out-of-Stock Handling**: Products with 0 stock are removed from catalog (not persistent)

### Payment Processing

- **Mock Payment API**: Simulates payment gateway with always-200 response
- **Success Flow**: Returns to home screen with empty cart after payment

## Tech Stack

- **React Native (Expo)**
- **TypeScript**
- **Tamagui** (UI kit)
- **Zustand** – lightweight state management with fine-grained selectors
- **React Navigation (stack)** – two-screen flow
- **JSON Server** – mock REST API with `/products` and `/pay` endpoints
- **AsyncStorage** – local persistence for cart and currency used with zustand
- **React Native Picker** - system UI for picking between several options (dropdowns) supported in Expo
- **React Native Gesture Handler** - swipe gestures for cart item deletion

## API Endpoints

### Mock Server (JSON Server)

The app uses a mock REST API for development and testing:

- **GET `/products`**: Fetches available products with stock information
- **POST `/pay`**: Processes payment with seat and cart information
  - Request body: `{ seatCode: string, items: [{ id: string, qty: number }] }`
  - Response: Always returns 200 status (simulated success)

### Data Structure

```json
{
  "products": [
    {
      "id": "snack-1",
      "name": "Pringles Original",
      "priceEUR": 350,
      "stock": 10,
      "image": "https://picsum.photos/seed/pringles/200/200"
    }
  ]
}
```

## Architecture & Decisions

### 🏗️ Feature-based Architecture

Organizes code by feature for better modularity, maintainability and scalability:

```
src/
├── components/          # Shared UI components
├── features/
│   ├── home/            # Product catalog feature
│   └── cart/            # Shopping cart feature
├── navigation/           # Navigation setup
├── store/               # Zustand state management
└── utils/               # Shared utilities
```

### UI & State Management Decisions

- **Tamagui for UI:** Used for its prebuilt UI components, enabling rapid development of consistent and visually appealing interfaces. If you do not require a full UI kit, [Shopify Restyle](https://github.com/Shopify/restyle) is also alternative for building custom design systems in RN.
- **Zustand over Redux:** Chosen for its small API surface and performant selector-based updates, making it a better fit for a simple two-screen flow than a full Redux setup.
- **Server state management:** For a sake of time, I used zustand to manage the state of the server response as well as the global state, but in a real-world scenario, I would use Tanstack Query to manage it.

### Data Management

- **Normalized Data:** Products are stored by ID (byId) to allow O(1) lookups from cart items.
- **AsyncStorage Persistence:** Only minimal state (cart, currency) is persisted.
- **Currency Conversion:** Real-time conversion with fixed exchange rates for simplicity.

### Testing Status

- **Unit Tests:** Not implemented due to time constraints, but recommended for production use
- **Testing Framework:** Would recommend Jest + React Native Testing Library for comprehensive testing
