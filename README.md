# TODO App

A responsive task management application built with React. Create, complete, and delete tasks with automatic local storage persistence.

**Live Demo:** https://selitskayaaline.github.io/todo-app/

## Features

- Create tasks using Enter or the Add Task button.
- Mark tasks as completed or active.
- Delete tasks.
- Persist tasks in browser localStorage.
- Restore tasks after page reload.
- Cancel task creation with Escape.
- Prevent empty and duplicate submissions.

## Tech Stack

React · JavaScript · Vite · CSS Modules · Vitest · React Testing Library · ESLint

## Installation

```bash
git clone <repository-url>
cd todo-app
npm install
```

## Development

```bash
npm run dev
```

Application: `http://localhost:5173`

## Build

```bash
npm run lint
npm run test:run
npm run build
```

Preview production build:

```bash
npm run preview
```

## Tests

20 tests covering:

- `storage` — localStorage persistence and invalid data handling.
- `useTasks` — task creation, deletion, and completion.
- `TaskInput` — keyboard interactions, validation, and duplicate submission protection.
- `App` — main user flows and component integration.

Run tests:

```bash
npm run test:run
```

## Project Structure

```text
src/
├── components/
│   ├── EmptyState/
│   ├── Header/
│   ├── TaskInput/
│   ├── TaskItem/
│   └── TaskList/
├── hooks/
│   └── useTasks.js
├── utils/
│   └── storage.js
├── test/
│   └── setup.js
├── App.jsx
└── main.jsx
```

## Data Persistence

Tasks are stored in the browser using `localStorage`. The application works without a backend or external database.
