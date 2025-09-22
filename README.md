# CollabForge - Base Mini App

Find your creative co-pilot for epic projects within the Base ecosystem.

## Features

- **Skill-Based Matching**: Discover collaborators based on specific creative or technical skills
- **Project Portfolio Showcase**: Display your work to attract the right collaborators
- **Integrated Project Briefing**: Define project scope and requirements clearly
- **Farcaster Integration**: Seamless identity and social features
- **Micro-transaction Model**: Pay-per-connection requests and featured placements

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base Network integration via MiniKit
- **Identity**: OnchainKit for wallet and identity management
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety throughout

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Copy `.env.local` and add your OnchainKit API key:
   ```bash
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in Base App**:
   Navigate to `http://localhost:3000` in Base App or compatible Farcaster client

## Project Structure

```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx           # Main application page
├── providers.tsx      # MiniKit and OnchainKit providers
├── globals.css        # Global styles and design tokens
└── loading.tsx        # Loading UI

components/
├── Header.tsx                    # App header with user info
├── ProfileCard.tsx              # User profile display
├── ProjectCard.tsx              # Project showcase
├── SkillFilter.tsx              # Skill filtering component
├── CreateProjectModal.tsx       # Project creation modal
├── CollaborationRequestModal.tsx # Collaboration request form
└── LoadingSpinner.tsx           # Loading indicator

lib/
├── types.ts           # TypeScript type definitions
├── mockData.ts        # Sample data for development
└── utils.ts           # Utility functions
```

## Key Components

### User Profiles
- Display skills, bio, and portfolio links
- Skill-based filtering and search
- Collaboration request system

### Projects
- Project creation with skill requirements
- Status tracking (active, completed, paused)
- Collaborator management

### Micro-transactions
- $0.05 per collaboration request
- $1 for 24-hour featured profile placement
- Integrated with Base network for payments

## Design System

The app uses a custom design system with:
- **Primary Color**: `hsl(210, 90%, 50%)` (Blue)
- **Accent Color**: `hsl(130, 70%, 55%)` (Green)
- **Purple Gradient**: Matching the brand aesthetic
- **Mobile-first**: Responsive design optimized for mobile

## Development

### Adding New Features

1. Define types in `lib/types.ts`
2. Create components in `components/`
3. Add mock data to `lib/mockData.ts`
4. Implement in main page or create new routes

### Styling Guidelines

- Use Tailwind CSS classes
- Follow the design system tokens
- Ensure mobile-first responsive design
- Use semantic color variables

## Deployment

The app is designed to be deployed as a Base Mini App:

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to your preferred hosting platform
3. Configure the Mini App manifest for Base App discovery

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
