# replit.md

## Overview

This is a full-stack web application for "Talenta" - an African IT education platform. The application provides online courses, certifications, and university partnerships specifically designed for African learners. It features a modern React frontend with TypeScript, a Node.js/Express backend, PostgreSQL database with Drizzle ORM, and integrated Stripe payment processing.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Authentication**: Replit Authentication integration
- **Payment**: Stripe integration for course payments

### Backend Architecture
- **Runtime**: Node.js with Express framework
- **Language**: TypeScript with ESM modules
- **API Style**: RESTful APIs with JSON responses
- **Authentication**: Replit OAuth with Passport.js
- **Session Management**: Express sessions with PostgreSQL storage
- **Error Handling**: Centralized error middleware
- **Development**: Hot reloading with tsx

### Database Architecture
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with schema-first approach
- **Migrations**: Drizzle-kit for schema management
- **Connection**: Connection pooling with @neondatabase/serverless

## Key Components

### Authentication System
- **Provider**: Replit OAuth integration
- **Session Storage**: PostgreSQL-backed sessions
- **User Management**: Automatic user creation/updates
- **Authorization**: Route-based protection for authenticated content

### Course Management
- **Course Catalog**: Full CRUD operations for courses
- **Categories**: Programming, Data Science, Cybersecurity, Mobile Development, Cloud Computing
- **Enrollments**: User course enrollment tracking
- **Progress Tracking**: Module completion and progress percentages
- **Reviews**: Course rating and review system

### Payment System
- **Provider**: Stripe integration
- **Support**: Multiple currencies (USD, ETB)
- **Features**: One-time payments, financial aid applications
- **Security**: Stripe Elements for secure payment processing

### Certificate System
- **Generation**: Dynamic certificate creation
- **Templates**: Professional certificate templates
- **Distribution**: Download and sharing capabilities
- **Verification**: Unique certificate IDs for verification

### Content Management
- **Universities**: Partner university profiles
- **Newsletter**: Email subscription system
- **Financial Aid**: Application and approval workflow
- **Contact**: Support and inquiry system

## Data Flow

### User Authentication Flow
1. User initiates login via Replit OAuth
2. Backend validates with Replit OIDC
3. User session created in PostgreSQL
4. Frontend receives authentication status
5. Protected routes become accessible

### Course Enrollment Flow
1. User browses course catalog
2. Course selection triggers payment modal
3. Stripe processes payment securely
4. Backend creates enrollment record
5. User gains access to course content
6. Progress tracking begins

### Certificate Generation Flow
1. User completes course (100% progress)
2. System generates certificate with unique ID
3. Certificate stored in database
4. User can download/share certificate
5. Certificate available in user dashboard

## External Dependencies

### Payment Processing
- **Stripe**: Payment processing and subscription management
- **Integration**: React Stripe.js for frontend, Stripe Node.js for backend
- **Security**: PCI DSS compliant payment handling

### Database Hosting
- **Neon**: Serverless PostgreSQL hosting
- **Features**: Connection pooling, automatic scaling
- **Configuration**: WebSocket support for real-time features

### Authentication
- **Replit OAuth**: Primary authentication provider
- **Session Management**: PostgreSQL session store
- **Security**: HTTPS-only cookies, CSRF protection

### UI Components
- **shadcn/ui**: Pre-built accessible components
- **Radix UI**: Low-level UI primitives
- **Tailwind CSS**: Utility-first styling framework

## Deployment Strategy

### Development Environment
- **Command**: `npm run dev`
- **Features**: Hot reloading, development middleware
- **Database**: Development database with seed data

### Production Build
- **Build Process**: 
  1. Frontend build with Vite (`vite build`)
  2. Backend build with esbuild (`esbuild server/index.ts`)
  3. Static files served from `dist/public`
- **Optimization**: Code splitting, minification, tree shaking

### Environment Variables
- **Required**: `DATABASE_URL`, `STRIPE_SECRET_KEY`, `REPLIT_DOMAINS`
- **Optional**: `ISSUER_URL`, `SESSION_SECRET`, `VITE_STRIPE_PUBLIC_KEY`

### Database Management
- **Schema**: Managed via Drizzle migrations
- **Deployment**: `npm run db:push` for schema updates
- **Seeding**: Initial data population via seed scripts

## Changelog

```
Changelog:
- July 08, 2025. Initial setup
- July 08, 2025. Added comprehensive About Us page with African theme
- July 08, 2025. Enhanced Contact page with chatbot and voice assistant features
- July 08, 2025. Added Ethiopian bank transfer and TeleBirr payment options
- July 08, 2025. Expanded course catalog with 6 additional courses (AI/ML, Blockchain, UI/UX, IoT, Game Development, Digital Marketing)
- July 08, 2025. Implemented sample certificate system with professional templates
- July 08, 2025. Added About page to navigation menu
- July 08, 2025. Integrated African theme colors (purple, amber, green) throughout the platform
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```