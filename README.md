# React + TypeScript + Vite

This project is a modern React application built with TypeScript and Vite, focused on performance, scalability, and maintainability.

# Tech Stack
- React – Component-based UI development
- TypeScript – Static typing for improved reliability and developer experience
- Vite – Fast development server and optimized build tooling

# Theming & UI
  - The application uses Material UI (MUI) for component styling and layout.
  - MUI provides a consistent design system, responsive grid layouts, and theming capabilities.

# Testing
  - Testing is implemented using Vitest.
  - The test configuration is defined in `vitest.config.ts`
  - React Testing Library is used for DOM-based component testing.

## Running the test
 `yarn test` or `npm test`

## Test Coverage
`yarn test:coverage` or `npm test:coverage`



# Running the Project Locally
`npm install
` or `yarn install`

## Start the development server
`npm run dev` or `yarn dev`
 The application will be available at http://localhost:5175


# Project Architecture
 ## src/Components
Contains presentational components, it is focused on rendering and user actions like click, key press ,etc
### Examples
  - DogThumbnail
  - MainDog
  - SideBar

## src/Context
- Given the small scope of the project, introducing a more complex state management solution such as Redux, MobX, or Zustand was intentionally avoided. React Context provides a lightweight, sufficient, and maintainable solution for sharing state across components without unnecessary complexity.

### Examples
     - FavoriteContext 

## src/api
Contains modules responsible for communicating with external APIs, handling data fetching, and abstracting network logic. In this project, it includes functions such as `fetchRandomDogs`.

## src/domain
Contains core business logic, models, and type definitions for the application. It is independent of UI and framework-specific code, focusing purely on the shape and behavior of your data.

## src/hooks
Contains custom React hooks that encapsulate reusable logic for components. Hooks allow you to separate stateful logic, side effects, and data fetching from presentation, making your components cleaner and more focused on rendering.
- Example: `useDogs` Fetch and manage remote data

## src/theme
Contains Material UI (MUI) theme customization for the application.


# Architectural Trade-offs

## 1. Global State Management (React Context)
- Decision: Use React Context instead of Redux or other state management libraries.

- Benefits: Lightweight, simple, no extra dependencies, easy to understand and maintain for a small project.

Trade-offs:

- Context can cause unnecessary re-renders if not carefully memoized.

- Less powerful than Redux for very complex apps (middleware, devtools, advanced state logic).

- Scaling beyond a few contexts may become cumbersome.

## API / Services Layer
- Decision: Encapsulate fetch logic in services/ instead of calling fetch directly in components or hooks.

- Benefits: Separation of concerns, reusability, easier testing, centralized error handling.

Trade-offs:

- Slight boilerplate overhead for small/simple APIs.

- Adds an extra layer of indirection.

- Requires developers to understand and maintain service abstraction.

## Domain Layer
 - Decision: Create domain/ folder for type definitions, models, and parsers.

 - Benefits: Type safety, reusability, separation of concerns, easier testing.

 Trade-offs:
 - May feel like over-engineering for very small projects.
 - Requires keeping domain models in sync with API changes.


## Components Layer
- Decision: Components are mostly presentational and small, using MUI for layout and styling.
- Benefits: Clean separation of UI from logic, responsive design with MUI grid, easy to maintain.

Trade-offs:
- Over-reliance on MUI may make custom styling harder.
- Some small components might feel verbose due to additional wrappers or styling props.

## Hooks Layer
- Decision: Use custom hooks for data fetching and shared logic.
- Benefits: Encapsulates stateful logic, improves reusability and testability, keeps components clean.

Trade-offs:
- Must carefully manage hook dependencies to avoid stale closures or unnecessary re-renders.
- Over-abstraction if the logic is trivial or used only once.

## Testing (Vitest + React Testing Library)

- Decision: Use Vitest for testing components, hooks, context, and api services.
- Benefits: Fast tests, modern syntax, good integration with React Testing Library, supports mocking.

Trade-offs:

- Extra setup required for mocking fetch and global context.
- May feel like overhead for very small projects with simple UI logic.

