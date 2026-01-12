# The Wild Oasis Website

A luxurious cabin hotel booking application located in the heart of the Italian Dolomites. This project is a customer-facing website allowing users to explore cabins, manage their guest profile, and book reservations.

## Features

- **Cabin Exploration**: Browse a list of luxury cabins with details and images.
- **User Authentication**: Secure sign-in using Google Authentication via NextAuth.
- **Guest Area**: Manage your profile and view past/upcoming reservations.
- **Server-Side Rendering**: Built with Next.js App Router for optimal performance and SEO.
- **Data Management**: Integration with Supabase for real-time data and persistent storage.
- **Date Selection**: Interactive calendar for booking dates using `react-day-picker`.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Backend**: [Supabase](https://supabase.com/) (Database & Auth)
- **Authentication**: [NextAuth.js](https://authjs.dev/) (v5 Beta)
- **Icons**: Heroicons
- **Fonts**: Josefin Sans (via `next/font/google`)

## Getting Started

Follow these steps to set up the project locally.

### 1. Clone the repository

```bash
git clone <repository-url>
cd 22-the-wild-oasis-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add the following keys:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Google Authentication
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# NextAuth Configuration
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

> **Note**: This project reuses `VITE_` prefixed variables for Supabase, likely for consistency with a related client-side project. Ensure these are set in your environment.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Main application routes (App Router).
  - `_components/`: Private components used within the app.
  - `_lib/`: Helper functions, Supabase client, and Auth configuration.
  - `_styles/`: Global styles and CSS files.
  - `cabins/`: Cabin listing and details pages.
  - `account/`: Protected guest account pages.
  - `api/`: API routes (e.g., auth).
- `public/`: Static assets (images, logos).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
