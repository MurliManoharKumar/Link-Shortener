<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Link Shortener Project Agents

This document defines specialized agents for developing and maintaining the Link Shortener application, a Next.js-based URL shortening service.

## Project Overview

The Link Shortener is built with:
- **Frontend**: Next.js 16.2.4 with App Router, TypeScript, Tailwind CSS v4, Turbopack bundler
- **UI Components**: shadcn/ui components (Button, Input) + custom dark-themed components
- **Database**: PostgreSQL with Drizzle ORM (Neon serverless)
- **Authentication**: Clerk v7.3.0 (exclusive authentication provider)
- **Styling**: Tailwind CSS v4 with custom gradients, animations, and dark theme
- **Animations**: 7 custom keyframe animations (float, glow, shimmer, slideInUp, slideInDown, scaleIn, pulse-slow)
- **Deployment**: Vercel-ready configuration

### Authentication Requirements
- **Provider**: All authentication handled exclusively by Clerk
- **Protected Routes**: `/dashboard` page requires user login and must be protected using Clerk's authentication
- **Redirect Logic**: Logged-in users accessing homepage are redirected to `/dashboard`
- **No Alternative Auth**: Do not implement or use any other authentication methods
- **Implementation Details**: 
  - Clerk is the sole authentication provider (v7.3.0)
  - Dashboard route protection uses Clerk's authentication components
  - Homepage redirect uses Clerk's authentication state to detect if user is signed in
  - Signed-out users on dashboard are redirected appropriately

## Authentication Rules

Under no circumstances should any authentication method other than Clerk be used. The implementation must:

1. Use Clerk as the exclusive authentication provider for all authentication needs
2. Protect the `/dashboard` route so only signed-in users can access it
3. Redirect signed-in users from the homepage to `/dashboard`
4. Not implement any alternative authentication systems (Firebase, Auth0, custom JWT, etc.)

Any deviation from these rules is strictly prohibited. The /dashboard page is a protected route and must require the user to be logged in to be able to access this page. If the user is logged in and trying to access the homepage, they should be redirected to the /dashboard page.

## Specialized Agents

### Frontend Agent
**Role**: Handles all frontend development tasks including UI components, pages, and client-side logic.

**Responsibilities**:
- Create and modify React components in `/app` and `/components`
- Implement responsive designs with Tailwind CSS v4 and custom animations
- Build dark-themed, interactive, and engaging user interfaces
- Handle form validation and user interactions (URL input, link management)
- Optimize for performance and accessibility
- Maintain consistent design system with gradient effects and hover states

**Key Files**:
- `app/page.tsx` - Landing page with hero section, URL shortener form, feature grid, stats, CTA (includes Clerk redirect logic)
- `app/layout.tsx` - Root layout with ClerkProvider, sticky navigation header (Clerk authentication integration)
- `app/dashboard/page.tsx` - Protected dashboard with link management, animated cards (protected by Clerk)
- `components/ui/button.tsx` - Custom shadcn Button component (dark-themed)
- `components/ui/input.tsx` - Custom shadcn Input component (dark-themed)
- `app/globals.css` - Global styles, custom animations, utility classes

**Authentication Implementation**:
- Clerk v7.3.0 is the exclusive authentication provider
- Homepage redirects signed-in users to `/dashboard` using `useAuth()` hook
- Dashboard is protected using Clerk's `<Show when="signed-in">` component
- Unauthenticated users on dashboard are redirected with `<RedirectToSignIn />`
- No alternative authentication methods should be implemented

### Backend Agent
**Role**: Manages server-side logic, API routes, and data processing.

**Responsibilities**:
- Implement URL shortening algorithms and generation
- Create API endpoints for CRUD operations on shortened links
- Handle server-side validation and error handling
- Implement rate limiting and security measures (DNS checks, spam detection)
- Manage server configuration and middleware

**Current Status**:
- API routes: To be created (currently using mock setTimeout for demo)
- URL generation: Placeholder implementation using Math.random()

**Key Files**:
- `app/api/*` - API routes (to be created)
- `src/index.ts` - Drizzle ORM initialization
- `proxy.ts` - Proxy configuration

### Database Agent
**Role**: Manages database schema, migrations, and data operations using Drizzle ORM.

**Responsibilities**:
- Design and maintain database schema
- Create and run migrations
- Implement data access layers
- Optimize queries and indexes
- Handle database connections and pooling

**Key Files**:
- `src/drizzle.config.ts` - Drizzle configuration
- `src/db/schema.ts` - Database schema (to be created)
- `src/db/index.ts` - Database connection (to be created)

### Testing Agent
**Role**: Ensures code quality through comprehensive testing.

**Responsibilities**:
- Write unit tests for components and utilities
- Create integration tests for API endpoints
- Implement end-to-end tests for user flows
- Maintain test coverage and CI/CD pipelines
- Debug and fix failing tests

**Key Files**:
- `tests/*` - Test files
- Jest/Playwright configurations

### DevOps Agent
**Role**: Handles deployment, configuration, and infrastructure.

**Responsibilities**:
- Configure build and deployment pipelines
- Manage environment variables and secrets
- Optimize for production performance
- Set up monitoring and logging
- Handle Vercel deployment configurations

**Key Files**:
- `next.config.ts` - Next.js configuration
- `package.json` - Dependencies and scripts
- `eslint.config.mjs` - Linting configuration
- `postcss.config.mjs` - CSS processing

## Development Workflow

1. **Planning**: Use appropriate agent based on task type
2. **Implementation**: Follow agent-specific guidelines
3. **Testing**: Validate with Testing Agent
4. **Review**: Cross-agent code review for consistency
5. **Deployment**: DevOps Agent handles production rollout

## Agent Communication

Agents should:
- Document decisions in code comments
- Use consistent naming conventions
- Follow TypeScript best practices
- Maintain clean git history with descriptive commits
- Update this document when new patterns emerge

## Current Status

- ✅ Frontend Agent: Active (UI implemented)
- ✅ Authentication: Clerk integration complete with protected dashboard and redirect logic
- 🔄 Backend Agent: Pending API implementation
- 🔄 Database Agent: Schema design needed
- 🔄 Testing Agent: Test suite to be built
- ✅ DevOps Agent: Basic config in place
