# Daily To-Do List

A simple React-based to-do list application for managing daily tasks. Built with Vite for fast development and deployment.

## Features

- Add new tasks
- Edit existing tasks
- Mark tasks as complete
- Delete tasks
- Clean and responsive UI

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

### Build

Build the app for production:
```bash
npm run build
```

### Preview

Preview the production build:
```bash
npm run preview
```

## Deployment

This app can be deployed to GitHub Pages.

1. Create a new repository on GitHub.
2. Push this code to the repository:
   ```bash
   git remote add origin https://github.com/your-username/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```
3. Build and deploy:
   ```bash
   npm run build
   npm run deploy
   ```
4. Enable GitHub Pages in the repository settings, selecting the `gh-pages` branch as the source.

The app will be available at `https://your-username.github.io/your-repo-name/`

## Technologies Used

- React
- Vite
- CSS
