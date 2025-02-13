# My Website - React Application

## Overview

This project is a **React** web application that includes features such as pagination, sorting, and filtering of data from an API, along with user authentication. The application is styled using **Mantine UI**, manages data fetching with **React Query**, and uses **Axios** for API calls. **React Router** is used for navigation, and **Zustand** (if applicable) is used for global state management.

## Features

- **Pagination**: Fetch and display paginated data from an external API.
- **Sorting**: Sort data by columns (e.g., by name or height).
- **Search**: Filter data based on search input.
- **User Authentication**: Login/logout functionality with state management.
- **API Integration**: Fetch data from a Star Wars API (SWAPI) using Axios.
- **React Query**: Data fetching and caching with React Query.
- **React Router**: Navigation between pages (e.g., Home, About, Contact, Person Details).
- **State Management**: Global state management using Zustand for handling authentication and user sessions.

## Tech Stack

- **React**: Frontend framework
- **Mantine UI**: Component library for styling
- **React Router**: For navigation and routing
- **React Query**: For handling server-state and data fetching
- **Axios**: For making API requests
- **Zustand**: (Optional) State management library
- **TypeScript**: For static type checking

## Installation

### Prerequisites

- **Node.js**: Make sure you have Node.js installed (version >= 14).
- **npm** or **yarn**: Either npm or yarn for managing dependencies.

### Steps

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd <repository-name>

   ```

2. **Install dependencies:**:

   ```Using npm
   npm install

   ```

3. **Set up environment variables**:

Create a .env file in the root of the project, and add the following environment variables:
VITE_API_KEY=https://swapi.dev/api 4. **Run the application**:
npm run dev

Using npm:

├── public # Public assets
├── src
│ ├── api # API routes and Axios setup
│ ├── components # Reusable components (e.g., Navbar, Table)
│ ├── pages # Pages (e.g., Home, About, Contact, Person Details)
│ ├── store # Zustand store (for global state management)
│ ├── App.tsx # Main App component
│ ├── main.tsx # Entry point of the app
│ ├── styles # Global and component-specific styles
├── package.json # Project dependencies and scripts
└── README.md # Project readme

### Dependencies

React: ^17.0.0
React Query: ^3.0.0
React Router DOM: ^6.0.0
Axios: ^0.21.0
Mantine: ^4.0.0
Zustand: ^4.0.0
NodeJS: ^20.0.0
