# CollabForge

A social platform for discovering and connecting with creative collaborators based on skills and project needs within the Base ecosystem.

## Features

- **Skill-Based Matching**: Find collaborators with complementary creative skills
- **Project Portfolio Showcase**: Display your work to attract collaborators
- **Integrated Project Briefing**: Define project scope and requirements
- **Farcaster Integration**: Seamless social discovery and connection
- **Micro-transactions**: Pay-per-connection model for high-value interactions

## Tech Stack

- **Frontend**: Next.js 15, React 18, TailwindCSS, TypeScript
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: JWT with Farcaster integration
- **Social**: Farcaster (frames.js)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Farcaster account (for authentication)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd collabforge
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
# Update .env with your database URL
# Run database migrations
npx prisma migrate dev
```

4. Generate Prisma client:
```bash
npx prisma generate
```

5. Start the development server:
```bash
npm run dev
```

### Environment Variables

Create a `.env` file with the following variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/collabforge?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
```

## API Documentation

### Authentication
- `POST /api/auth/farcaster` - Authenticate with Farcaster

### Users
- `GET /api/users` - Get all users (with filtering)
- `GET /api/users/[farcasterId]` - Get user by Farcaster ID
- `PUT /api/users/[farcasterId]` - Update user profile
- `POST /api/users` - Create new user

### Projects
- `GET /api/projects` - Get all projects (with filtering)
- `GET /api/projects/[projectId]` - Get project by ID
- `PUT /api/projects/[projectId]` - Update project
- `POST /api/projects` - Create new project

### Collaborations
- `GET /api/collaborations` - Get collaboration requests
- `GET /api/collaborations/[requestId]` - Get collaboration request by ID
- `PUT /api/collaborations/[requestId]` - Update collaboration status
- `POST /api/collaborations` - Send collaboration request

## Database Schema

### User
- `farcasterId` (String, Primary Key)
- `displayName` (String)
- `bio` (String, Optional)
- `profilePicUrl` (String, Optional)
- `skills` (String[], Array)
- `portfolioUrls` (String[], Array)

### Project
- `projectId` (String, Primary Key, CUID)
- `projectName` (String)
- `description` (String)
- `requiredSkills` (String[], Array)
- `status` (Enum: active, completed, paused)
- `ownerFarcasterId` (String, Foreign Key)

### CollaborationRequest
- `requestId` (String, Primary Key, CUID)
- `senderFarcasterId` (String, Foreign Key)
- `recipientFarcasterId` (String, Foreign Key)
- `projectId` (String, Foreign Key, Optional)
- `message` (String)
- `status` (Enum: pending, accepted, declined)

## Business Model

- **Micro-transactions**: $0.05 per connection request, $1 for 24hr featured profile placement
- **Subscription option**: Advanced filtering and unlimited requests
- **Tokenized features**: Future on-chain governance and ownership

## Deployment

### Production Setup

1. Set up PostgreSQL database
2. Configure environment variables
3. Run database migrations: `npx prisma migrate deploy`
4. Build the application: `npm run build`
5. Start the production server: `npm start`

### Environment Variables for Production

```env
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"
JWT_SECRET="your-production-jwt-secret"
NODE_ENV="production"
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

