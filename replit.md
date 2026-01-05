# Digital Portfolio Website

## Overview

A digital portfolio website showcasing services and projects. Built as a full-stack TypeScript application with a React frontend and Express backend. The site features an ultra-clean, minimalist design inspired by Linear, Apple, and Stripe aesthetics, with smooth animations and interaction-driven UI components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack Query for server state caching and synchronization
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for smooth page transitions and micro-interactions
- **Fonts**: DM Sans (primary), JetBrains Mono (monospace for tech tags)

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **Build Tool**: esbuild for server bundling, Vite for client
- **API Pattern**: RESTful JSON endpoints under `/api/*`
- **Static Serving**: Express static middleware serves the built client in production

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` contains database tables and TypeScript types
- **Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod
- **Current Data**: Services and projects are defined as static arrays in schema.ts with helper functions for lookup

### Project Structure
```
client/           # React frontend application
  src/
    components/   # UI components (shadcn/ui)
    pages/        # Route page components
    hooks/        # Custom React hooks
    lib/          # Utilities and query client
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route definitions
  storage.ts      # In-memory storage abstraction
  static.ts       # Static file serving
  vite.ts         # Vite dev server integration
shared/           # Shared code between client and server
  schema.ts       # Database schema and type definitions
```

### Key Design Patterns
- **Monorepo Structure**: Client, server, and shared code in single repository with path aliases (`@/`, `@shared/`)
- **Type Sharing**: TypeScript interfaces defined in shared folder, imported by both frontend and backend
- **Component Architecture**: Atomic design with base UI primitives from shadcn/ui, composed into page layouts
- **API Fetching**: Standardized query functions with error handling and 401 behavior configuration

## External Dependencies

### Database
- **PostgreSQL**: Primary database (configured via `DATABASE_URL` environment variable)
- **Drizzle Kit**: Database migrations and schema push (`npm run db:push`)

### Frontend Libraries
- **Radix UI**: Accessible, unstyled component primitives
- **Embla Carousel**: Carousel/slider functionality
- **React Day Picker**: Date picker component
- **React Hook Form**: Form state management
- **Recharts**: Chart/data visualization

### Development Tools
- **Vite**: Frontend build tool with HMR
- **tsx**: TypeScript execution for development
- **Replit Plugins**: Error overlay, cartographer, and dev banner for Replit environment

### Session Management
- **connect-pg-simple**: PostgreSQL session store (available but not currently active)
- **express-session**: Session middleware support