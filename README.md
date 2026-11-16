# Giggles

Giggles is a real-time chat app for finding people and keeping conversations going. This repository contains the React frontend.

## Features

- Real-time one-to-one messaging with sent, delivered, and seen indicators
- Online status and chat-list updates
- Search for people by name, username, or email
- Share images in conversations
- Editable profile details, including profile photo and bio
- Responsive chat interface for desktop and mobile

## Tech stack

- React 19 and Vite
- React Router
- Zustand
- Socket.IO client
- Axios
- Tailwind CSS and daisyUI

## Getting started

### Prerequisites

- Node.js and npm
- A running Giggles backend

### Install dependencies

```bash
npm install
```

### Configure the backend URL

Create a `.env` file in the project root:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Replace the example URL with your backend's origin. Do not add `/api/v1` to the value: the app adds that path for API requests and uses the origin for the Socket.IO connection.

### Run the app

```bash
npm run dev
```

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## App routes

- `/` — landing page
- `/signup` — create an account
- `/login` — sign in
- `/home` — conversations
- `/profile` — view and edit your profile
