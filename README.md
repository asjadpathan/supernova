# StudyGenius: AI-Powered Learning Platform

StudyGenius is a modern AI-powered learning platform designed to provide a personalized and interactive educational experience. It uses generative AI to create custom learning roadmaps, generate study materials, and foster a collaborative community environment.

## Key Features

- **User Authentication**: Secure sign-up and login with Firebase Authentication.
- **Personalized Dashboard**: Track study streaks, mastered skills, progress, and upcoming lessons.
- **AI-Generated Learning Roadmaps**: Build customized learning plans based on goals, expertise, and preferences.
- **Interactive Concept Learning**: Get AI-generated concept explanations and quizzes within roadmaps.
- **Material Processing**: Upload study files (PDF, DOCX, TXT, images) to generate summaries, quizzes, and flashcards.
- **Dynamic Resource Discovery**: Find curated resources, competitions, and news by interest.
- **Saved Resources Library**: Access bookmarked resources in one place.
- **Community Study Zone**: Collaborate through real-time discussion channels.
- **Topic Search**: Get instant explanations, resources, and quiz suggestions for any topic.

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Generative AI**: [Google AI & Genkit](https://firebase.google.com/docs/genkit)
- **Backend & Database**: [Firebase](https://firebase.google.com/) (Authentication, Cloud Firestore)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Hooks (`useState`, `useEffect`) and `react-hook-form`

## Firebase Setup

### 1. Create a Firebase Project

- Go to the [Firebase Console](https://console.firebase.google.com/).
- Click **Add project** and follow the setup flow.

### 2. Register Your Web App

- In your Firebase project dashboard, click the web icon (`</>`) to add a web app.
- Register the app and copy the generated `firebaseConfig` values.

### 3. Configure Environment Variables

Create a `.env` file in the project root and add:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...
```

### 4. Enable Firebase Services

- **Authentication**
  - Go to **Build > Authentication > Sign-in method**.
  - Enable **Email/Password**.
- **Firestore**
  - Go to **Build > Firestore Database**.
  - Create a database (start in Test Mode for local development).

### 5. Set Firestore Security Rules

In Firestore **Rules**, use:

```rules
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, update, delete: if request.auth.uid == userId;
      allow create: if request.auth.uid == userId;

      match /roadmaps/{roadmapId} {
        allow read, write, delete: if request.auth.uid == userId;
      }

      match /savedResources/{resourceId} {
        allow read, write, delete: if request.auth.uid == userId;
      }
    }

    match /discussionChannels/{channelId} {
      allow read, write: if request.auth != null;

      match /messages/{messageId} {
        allow read: if request.auth != null;
        allow create: if request.auth != null
                      && request.auth.uid == request.resource.data.userId
                      && 'text' in request.resource.data
                      && 'userEmail' in request.resource.data;
        allow update, delete: if false;
      }
    }
  }
}
```

Click **Publish** after updating the rules.

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file using the Firebase configuration above.

4. **Run the development server**

   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:9002`.

## License

This project is licensed under the MIT License.

## Contributing

Fork the repository, create a branch, commit your changes, and open a pull request.
