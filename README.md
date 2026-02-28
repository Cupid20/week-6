# Task and Project Management Dashboard (Beginner React)

A simple React capstone project that includes a splash loader, account creation, confirm login, protected project page (to do list), profile page, navbar navigation, and light or dark theme toggle using localStorage.

## Features
- Splash screen loader shows once using `localStorage` (`sploaderShown`)
- Create account page (`/login`) with basic validation
- Confirm login page (`/confirm-login`) with username and password
- Protected Project page (`/project`) redirects to confirm login when not logged in
- Profile page (`/profile`) displays saved user details
- Navbar navigation (hidden on splash, create account, confirm login)
- Light or dark theme saved in `localStorage` (`current_theme`)
- Tasks saved in `localStorage` (`data`)

## Tech Stack
- React (functional components and hooks)
- React Router DOM
- CSS (separate files per page or component)
- localStorage for persistence

## Routes
- `/` Splash loader (SpLoader)
- `/login` Create account (LoginForm)
- `/confirm-login` Login for existing users (ConfirmLogin)
- `/project` Project task list (ProjectList)
- `/profile` User profile (ProfileForm)

## localStorage Keys Used
- `user` Stores account details as JSON (username, email, password)
- `isLoggedIn` Stores login state (`"true"` or `"false"`)
- `sploaderShown` Prevents splash from showing again after first visit
- `data` Stores task list HTML (current beginner approach)
- `current_theme` Stores theme (`"light"` or `"dark"`)

## Setup
1. Install dependencies
   - `npm install`
2. Start development server
   - `npm run dev`

## App Structure (Main Files)
- `App.jsx`
  - Theme state and saving to localStorage
  - Route setup using `Routes` and `Route`
  - Navbar hidden on `/`, `/login`, `/confirm-login` using `useLocation`
- `components/NavBar.jsx`
  - Links to Home (`/project`) and Profile (`/profile`)
  - Logout sets `isLoggedIn` to `"false"` and navigates to `/confirm-login`
  - Theme toggle changes images and updates theme state
- `pages/LoginForm.jsx`
  - Creates account and saves `user` to localStorage
  - Sets `isLoggedIn` to `"true"` after successful submit
  - Navigates to `/project`
- `pages/ConfirmLogin.jsx`
  - Reads `user` from localStorage
  - Validates username and password
  - Sets `isLoggedIn` to `"true"` and navigates to `/project`
  - Has a link to `/login` for new users
- `pages/ProjectList.jsx`
  - Checks `isLoggedIn` in `useEffect`
  - Redirects to `/confirm-login` if not logged in
  - Task add, delete, edit, search
  - Saves tasks to localStorage under `data`
- `pages/ProfileForm.jsx`
  - Reads `user` from localStorage and displays username and email
- `pages/SpLoader.jsx`
  - Shows splash for 3 seconds
  - Uses `sploaderShown` to show only once
  - After splash, shows LoginForm or routes onward depending on your flow

## Notes
- This project uses localStorage for a beginner friendly persistence approach.
- The Project page uses direct DOM creation for tasks (beginner style). A future improvement is to store tasks as an array in React state.
- If styles clash between pages, avoid using very generic class names like `.container` globally, or make selectors page specific.

## Deployment
Deploy on Netlify or Vercel:
- Build command: `npm run build`
- Output folder: `dist`