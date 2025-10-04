## Overview

This React Native project is a technical assignment for the Mobile Engineer position at Immfly.

It simulates a simple in-flight shopping flow:

- Screen 1: product list fetched from an API (JSON Server)
- Screen 2: payment simulation (always 200 response)

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

## Tech Stack

- **React Native (Expo)**
- **TypeScript**
- **Tamagui** (UI kit)
- **Zustand** – lightweight state management with fine-grained selectors
- **React Navigation (stack)** – two-screen flow
- **JSON Server** – mock REST API with `/products` and `/pay` endpoints
- **AsyncStorage** – local persistence for cart and currency used with zustand
- **React Native Picker** - system UI for picking between several options (dropdowns) supported in Expo

## Architecture & Decisions

- **Feature-based Architecture:** Organizes code by feature for better modularity and maintainability.
- **Tamagui for UI:** Used for its cross-platform, performant, and themeable component library, enabling rapid development of consistent and visually appealing interfaces across native and web.
- **Zustand over Redux:** Chosen for its small API and performant selector-based updates.
  It fits the two-screen scope better than a full Redux setup.
- **Normalized Data:** Products are stored by ID (byId) to allow O(1) lookups from cart items.
- **AsyncStorage Persistence:** Only minimal state (cart, currency) is persisted.
