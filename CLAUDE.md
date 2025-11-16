# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React vocabulary learning application (영어 단어장) built with Vite and Firebase Firestore. Users can register, view, edit, and delete English vocabulary words with their Korean meanings.

## Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## Architecture

### Firebase Integration
- **Configuration**: Firebase config is in `src/firebase/config.js`
- **Environment Variables**: Firebase credentials must be set in `.env` file (use `.env.example` as template)
  - Required: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`
- **Database**: Firestore collection name is `vocabulary`
- **Real-time Updates**: Uses Firestore `onSnapshot` for live data synchronization

### Component Structure
- **App.jsx**: Root component that manages state and Firestore operations (CRUD)
  - Handles all Firestore operations: create (`addDoc`), read (`onSnapshot`), update (`updateDoc`), delete (`deleteDoc`)
  - Manages edit mode state for vocabulary items
  - Uses real-time listener with automatic cleanup on unmount
- **VocaForm.jsx**: Form component for adding/editing vocabulary
  - Dual-mode: registration or edit based on `editingVoca` prop
  - Controlled inputs with validation
- **VocaList.jsx**: Container component that renders vocabulary list
  - Displays count and empty state
- **VocaItem.jsx**: Individual vocabulary card component
  - Displays word, meaning, and action buttons (edit/delete)
  - Includes confirmation dialog before deletion

### Data Flow
1. App.jsx subscribes to Firestore `vocabulary` collection with `orderBy('createdAt', 'desc')`
2. All CRUD operations are handled in App.jsx and passed down as props
3. VocaForm receives `onAddVoca`/`onUpdateVoca` callbacks and `editingVoca` state
4. VocaList/VocaItem receive `onEdit`/`onDelete` callbacks
5. Real-time listener automatically updates UI when Firestore data changes

### Firestore Schema
```javascript
{
  word: string,      // English word
  meaning: string,   // Korean meaning
  createdAt: Timestamp
}
```

### PWA (Progressive Web App)
- **Plugin**: Uses `vite-plugin-pwa` for PWA functionality
- **Configuration**: PWA settings in `vite.config.js`
- **Manifest**: Auto-generated `manifest.webmanifest` with Korean app name "영어 단어장"
- **Service Worker**: Workbox-based service worker with auto-update
- **Offline Support**: Caches static assets and Firebase Storage resources
- **Install**: App can be installed on mobile devices and desktop
- **Icons**: PWA icons located in `public/` directory
  - See `public/PWA-ICONS-README.md` for icon generation instructions
  - Requires proper PNG icons (192x192, 512x512) for production

## Important Notes

- All Firebase operations include error handling with console logs and user alerts
- The app uses Korean language for UI text and user feedback
- Environment variables are accessed via `import.meta.env.VITE_*` (Vite convention)
- Real-time listener cleanup is handled in useEffect return function to prevent memory leaks
- PWA features require HTTPS in production (except localhost)
