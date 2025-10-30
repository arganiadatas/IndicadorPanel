# Economic Dashboard - Panel de Indicadores Económicos

## Overview

This is an economic indicators dashboard application for Argentina that displays real-time financial and economic metrics. The application presents key economic indicators such as inflation (IPC), basic basket costs, economic activity (EMAE), unemployment, reserves, and other financial data through interactive cards and detailed modal views with time-series charts.

The application follows a modern full-stack architecture with a React-based frontend using shadcn/ui components and a lightweight Express backend serving economic indicator data. The design emphasizes data clarity, professional presentation, and efficient scanning of financial information, drawing inspiration from platforms like TradingView and Bloomberg Terminal.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18+ with TypeScript and Vite as the build tool

**Routing**: Wouter for lightweight client-side routing

**State Management**: TanStack Query (React Query) for server state management with custom query client configuration. No global state management beyond server cache - component state is sufficient for UI interactions.

**UI Component Library**: shadcn/ui (Radix UI primitives with Tailwind CSS styling) using the "new-york" style variant. All UI components are locally maintained in `client/src/components/ui/` for full customization control.

**Styling System**: 
- Tailwind CSS with custom design tokens defined in `tailwind.config.ts`
- Custom CSS variables for theming (light/dark mode support via CSS classes)
- Material Design principles with financial dashboard patterns
- Typography: Inter for general text, Roboto Mono for numerical data
- Spacing system based on Tailwind primitives (4px increments: 4, 6, 8, 12, 16)
- Responsive grid layout: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)

**Charting**: lightweight-charts library for rendering economic time-series data with customizable styling that matches the application theme

**Design Philosophy**: Data-first approach prioritizing clarity over decoration, with scannable information hierarchy and professional aesthetics. Full design guidelines documented in `design_guidelines.md`.

### Backend Architecture

**Framework**: Express.js with TypeScript running on Node.js

**API Design**: RESTful API with two primary endpoints:
- `GET /api/indicators` - Returns all economic indicators
- `GET /api/indicators/:id` - Returns a specific indicator by ID

**Data Storage Strategy**: Currently using in-memory storage (`MemStorage` class) with hardcoded economic indicator data. The architecture is abstracted through an `IStorage` interface to allow future migration to persistent database storage without changing the API layer.

**Development Server**: Custom Vite integration for HMR (Hot Module Replacement) in development mode, with Express serving the built static files in production.

**Error Handling**: Centralized error handling with appropriate HTTP status codes (404 for not found, 500 for server errors) and JSON error responses.

### Data Schema Design

**Type Safety**: Zod schemas in `shared/schema.ts` provide runtime validation and TypeScript type inference for:
- `DataPoint`: Time-series data points with ISO date strings and numeric values
- `EconomicIndicator`: Complete indicator structure including metadata, data array, units, and trend percentages
- `IndicatorId`: Strongly-typed indicator IDs using const assertions

**Shared Types**: Schema definitions are shared between client and server via the `@shared` path alias to ensure type consistency across the full stack.

### Project Structure

**Monorepo Pattern**: Client and server code coexist in a single repository:
- `client/` - React application source and build configuration
- `server/` - Express API routes and business logic  
- `shared/` - Shared TypeScript types and Zod schemas
- Root-level configuration for TypeScript, Tailwind, Vite, and build tools

**Path Aliases**: TypeScript path mapping enables clean imports:
- `@/` → client source directory
- `@shared/` → shared schema directory
- `@assets/` → attached assets directory

**Build Process**: 
- Client: Vite bundles React app to `dist/public/`
- Server: esbuild bundles Express server to `dist/index.js`
- Production: Single Node.js process serves API and static files

### Database Configuration

**ORM**: Drizzle ORM configured for PostgreSQL with schema in `shared/schema.ts`

**Database Provider**: Neon serverless PostgreSQL (based on `@neondatabase/serverless` dependency)

**Migration Strategy**: Drizzle Kit for schema migrations with `db:push` script for applying changes

**Note**: While Drizzle is configured, the current implementation uses in-memory storage. Database integration is prepared but not yet active in the codebase.

## External Dependencies

### Core Runtime Dependencies

**Frontend Libraries**:
- React ecosystem: `react`, `react-dom`, `react-router` (via wouter)
- TanStack Query: Server state management and caching
- Radix UI: Comprehensive primitive component library (@radix-ui/react-*)
- Charting: `lightweight-charts` for financial charts
- Form handling: `react-hook-form` with `@hookform/resolvers` for Zod integration

**Styling**:
- `tailwindcss` with `autoprefixer` for CSS processing
- `class-variance-authority` for component variant management
- `clsx` and `tailwind-merge` for conditional class composition

**Backend**:
- `express` for HTTP server
- `drizzle-orm` for database operations (configured for future use)
- `@neondatabase/serverless` for PostgreSQL connectivity
- `connect-pg-simple` for session storage (indicates planned authentication)

**Utilities**:
- `zod` for runtime type validation and schema definition
- `date-fns` for date manipulation
- `nanoid` for unique ID generation

### Development Dependencies

**Build Tools**:
- Vite with React plugin for development server and production builds
- esbuild for server-side bundling
- TypeScript compiler for type checking

**Replit Integration**:
- `@replit/vite-plugin-runtime-error-modal` for error overlay
- `@replit/vite-plugin-cartographer` for code mapping (dev only)
- `@replit/vite-plugin-dev-banner` for development indicators

### External Services

**Font Delivery**: Google Fonts CDN for Inter and Roboto Mono typefaces (preconnected in HTML for performance)

**Future Integration Points**: 
- PostgreSQL database via Neon (credentials via `DATABASE_URL` environment variable)
- Session management infrastructure present (suggests future authentication system)
- API structure ready for real-time economic data integration