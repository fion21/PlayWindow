# 🚀 PlayWindow

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Status](https://img.shields.io/badge/status-MVP--in--progress-orange)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-blue)
![Expo](https://img.shields.io/badge/Expo-55-black?logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.83-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Privacy](https://img.shields.io/badge/privacy-first-green)
![Tests](https://img.shields.io/badge/tests-not%20yet-lightgrey)
![Coverage](https://img.shields.io/badge/coverage-0%25-red)

PlayWindow is a **React Native (Expo)** mobile app that helps people quickly find others nearby to join sports or social activities — without pressure, profiles, or barriers.

## 📱 Overview

PlayWindow allows a user to:

- Open a **local activity window**
- Specify a **sport, venue, and time**
- Alert nearby users within a **safe geo range**
- Let others **join, pass, or message**

The app focuses on:
- 🧠 Simplicity  
- 🤝 Social inclusion  
- 🔒 Safety-first design  

---

## 🧱 Tech Stack

![React Native](https://img.shields.io/badge/React%20Native-0.83-blue?logo=react)
![Expo](https://img.shields.io/badge/Expo-55-black?logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Navigation](https://img.shields.io/badge/React%20Navigation-7-purple)
![Status](https://img.shields.io/badge/status-MVP--in--progress-orange)

---

## 📂 Project Structure

```text
playwindow/
├── App.tsx
├── package.json
├── assets/
│   ├── icon.png
│   ├── splash-icon.png
│   └── ...
├── src/
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── OpenWindowScreen.tsx
│   │   └── NearbyWindowsScreen.tsx
│   ├── constants/
│   │   └── colors.ts
│   ├── lib/
│   │   ├── config.ts
│   │   └── supabase.ts
│   └── types/
│       ├── navigation.ts
│       └── index.ts

```

🧭 App Flow (MVP)
Home Screen
Entry point
Navigate to create or browse
Open Window
Select sport
Add venue + time
Add notes (optional)
(Next: Stripe payment)
Nearby Windows
View activity invites
Join or pass
🛡️ Safety Principles
No personal data sharing in chat
No asking for:
name
age
home address
Public venue meetups only
User responsibility for attendance & costs
⚙️ Getting Started
Install dependencies
npm install
Start the app
npm start

Then:

Scan QR with Expo Go
Or run on simulator


### 🔜 Roadmap
 Supabase backend (data persistence)
 Save and load activity windows
 Geo-based discovery (coarse location)
 Stripe payments (open window)
 Chat system with safety filters
 Push notifications
💡 Vision

PlayWindow removes friction from sport and social activity by allowing people to:

Join in — without judgement, pressure, or planning.

📌 Status

🚧 MVP in development
📍 Built locally with Expo + VS Code
📦 Version-controlled via GitHub

👤 Author

Built by an independent developer exploring social, fitness, and community tech.