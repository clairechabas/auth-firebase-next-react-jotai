# 🚀 Starter Next.js App With Firebase Auth

This repo is a starter to initialize a Next.js application with a fully functional authentication system using Firebase v9, using TypeScript, React & Jotai.

Feel free to clone or fork this repo to kickstart your next project in minutes 🔥

If you're interested in learning the concepts used in this repo, I wrote a complete guide to set up and manage auth in a React application with Firebase and Jotai.

**🚧 This project and its associated article are work in progress 🚧**

## Features
- Sign-up/sign-in with email/password
- Sign-in with Google
- Sign-in with magic link
- Reset password
- Create user in Firestore on sign-up with Cloud Functions

## Getting Started

1. Clone this repo and install the dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Create a new project in Firebase and set it up for Firebase Auth, Functions and Firestore.

3. Set the environment variables
Copy the `.env.example` into a `.env.local` file and set each variable with your own values.

4. Install the Firebase CLI
```bash
npm install -g firebase-tools
# or
yarn global add firebase-tools
# or
pnpm add -g firebase-tools
```

4. Deploy the Firebase Cloud Functions
```bash
firebase deploy --only functions
```

5. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<br/>

![Preview of the home page and modal in sign-in view](./public/images/preview.png "Preview of the home page and modal in sign-in view.")

<br/>

Enjoy!