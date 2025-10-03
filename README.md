# Rick and Morty Character Comparison App

A Next.js application that allows you to compare Rick and Morty characters and discover their shared episodes.

## Demo

Check out the live demo: [https://rick-and-morty-app-nine-black.vercel.app/](https://rick-and-morty-app-nine-black.vercel.app/)

## Features

- **Server-Side Rendering**: Initial character data is fetched server-side for optimal performance
- **Character Selection**: Browse and select characters from two paginated columns
- **Episode Comparison**: View exclusive and shared episodes between selected characters
- **Dark Mode**: Toggle between light and dark themes
- **Skeleton Loaders**: Smooth loading states with skeleton components
- **Fully Tested**: Comprehensive unit tests with Jest and React Testing Library

## Getting Started

To run the app locally:

1. **Install dependencies**  
   Use your preferred package manager (e.g. `pnpm`, `npm`, or `yarn`):

   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

2. **Configure environment variables**  
   Create a `.env` file in the project root and set the `APP_URL` variable:

   ```
   API_URL=http://rickandmortyapi
   ```

3. **Start the development server**  
   Run:

   ```bash
   pnpm run dev
   # or
   npm run dev
   # or
   yarn dev
   ```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Testing

\`\`\`bash

# Run all tests

npm test

# Run tests in watch mode

npm run test:watch

# Run tests with coverage

npm run test:coverage
\`\`\`

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **SWR** - Data fetching and caching
- **Jest** - Testing framework
- **React Testing Library** - Component testing
- **Rick and Morty API** - Character and episode data

## Project Structure

\`\`\`
├── app/
│ ├── page.tsx # Server component with initial data fetching
│ ├── layout.tsx # Root layout
│ └── globals.css # Global styles and theme tokens
├── components/
│ ├── character-card.tsx # Character card component
│ ├── character-column.tsx # Character list with pagination
│ ├── character-selection.tsx # Main selection component
│ ├── episode-section.tsx # Episode comparison sections
│ ├── character-skeleton.tsx # Skeleton loaders for characters
│ ├── episode-skeleton.tsx # Skeleton loaders for episodes
│ └── theme-toggle.tsx # Dark/light mode toggle
├── lib/
│ └── api.ts # API functions for server-side fetching
└── **tests**/
├── components/ # Component tests
└── lib/ # API function tests
\`\`\`

## API Integration

The app uses the [Rick and Morty API](https://rickandmortyapi.com/) to fetch character and episode data. Initial data is fetched server-side for better performance, while pagination and episode filtering happen client-side.
