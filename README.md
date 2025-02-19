# Icebreaker Cards - React Native App

Icebreaker Cards is a **React Native** game built with **Expo** and **TypeScript**. It provides a deck of cards containing questions to help break the ice in conversations. The questions are ranked by levels (**1, 2, 3**) and progressively become more personal. Users start with **90 default questions** but can also create their own. Additionally, they can favorite questions and play exclusively with those.

## Technologies Used

- **React Native** (Expo)
- **TypeScript**
- **Styled-Components** for styling
- **Dependency Injection** using `useContext`
- **Clean Architecture** (Data, Domain, Layer separation)
- **Authentication**
- **Custom-made Express/PostgreSQL API** (PERN Stack) – [Backend Repository](https://github.com/soulyvap/icebreaker-cards-backend)

- **React Native** (Expo)
- **TypeScript**
- **Styled-Components** for styling
- **Dependency Injection** using `useContext`
- **Clean Architecture** (Data, Domain, Layer separation)
- **Authentication**
- **Custom-made Express/PostgreSQL API** (PERN Stack)

## Features

- 🚀 **Preloaded Questions** – Start playing with 90 default questions.
- ✍️ **Custom Questions** – Create your own icebreaker questions.
- ⭐ **Favorite Questions** – Select favorite questions and play only with them.
- 🔒 **User Authentication** – Secure login system.
- 🎭 **Progressive Levels** – Questions become more personal at each level (1 to 3).
- 🔌 **Works with a Custom Backend** – Connects to an Express/PostgreSQL API.

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- Node.js
- Expo CLI
- A physical or emulator device (iOS/Android)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/soulyvap/icebreaker-cards-frontend.git
   cd icebreaker-cards-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables: Create a `.env` file in the root directory and define the API URL:
   ```env
   API_URL=https://icebreaker-cards-backend.onrender.com/api
   ```
4. Start the development server:
   ```sh
   npx expo start
   ```
1. Clone the repository:
   ```sh
   git clone https://github.com/soulyvap/icebreaker-cards-frontend.git
   cd icebreaker-cards-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npx expo start
   ```

## Download & Demo

📥 **[Download APK](https://drive.google.com/file/d/1eBS388tohwEB8_DcCkU-2O-ccyIrf5EP/view?usp=sharing)**  
🎥 **[Watch Demo Video](https://drive.google.com/file/d/17v0Z4_ZTksp19OQqwZG-7sVoyfzi0tri/view?usp=sharing)**

## Project Structure
```
icebreaker-cards-frontend/
├── src/
│   ├── components/       # Reusable UI components
│   ├── screens/          # App screens
│   ├── navigation/       # Navigation logic
│   ├── context/          # Dependency Injection using useContext
│   ├── data/             # API calls and data management
│   ├── domain/           # Business logic
│   ├── styles/           # Global styles with Styled-Components
│   ├── utils/            # Helper functions
│   ├── App.tsx           # Root component
├── package.json
├── tsconfig.json
├── app.json
├── babel.config.js
```

---
🚀 Happy icebreaking! 🎉

