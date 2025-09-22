# CollabForge - Base Mini App

Find your creative co-pilot for epic projects within the Base ecosystem.

## Features

- **Skill-Based Matching**: Discover collaborators based on specific creative or technical skills
- **Project Portfolio Showcase**: Display your work to attract the right collaborators
- **Integrated Project Briefing**: Define project scope and requirements clearly
- **Farcaster Integration**: Seamless social discovery within the Farcaster ecosystem
- **Micro-transaction Model**: Pay-per-connection for quality interactions

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base Network
- **Wallet Integration**: OnchainKit + MiniKit
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Getting Started

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd collabforge
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your OnchainKit API key from [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx           # Main application page
├── providers.tsx      # MiniKit and OnchainKit providers
├── globals.css        # Global styles and Tailwind imports
├── loading.tsx        # Loading UI component
└── error.tsx          # Error boundary component

components/
├── Header.tsx                    # App header with navigation
├── ProfileCard.tsx              # User profile display
├── ProjectCard.tsx              # Project showcase card
├── SkillTag.tsx                 # Skill badge component
├── SkillFilter.tsx              # Skill filtering interface
├── CreateProjectModal.tsx       # Project creation modal
└── CollaborationRequestModal.tsx # Collaboration request form

lib/
├── types.ts           # TypeScript type definitions
├── mockData.ts        # Sample data for development
└── utils.ts           # Utility functions
```

## Key Features Implementation

### User Profiles
- Farcaster identity integration
- Skill tagging system
- Portfolio link management
- Bio and display information

### Project Management
- Project creation with skill requirements
- Status tracking (active, completed, paused)
- Collaboration request handling

### Discovery & Matching
- Skill-based filtering
- Profile browsing interface
- Search and discovery optimization

### Micro-transactions
- Pay-per-connection model ($0.05 per request)
- Featured profile placement ($1 for 24hr)
- Base network integration for payments

## Development Guidelines

- Follow TypeScript best practices
- Use proper error handling and loading states
- Implement mobile-first responsive design
- Maintain clean component architecture
- Follow Next.js 15 App Router patterns

## Deployment

The app is optimized for deployment on Vercel or similar platforms that support Next.js applications.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
