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
- **Wallet Integration**: MiniKit + OnchainKit
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   - Copy `.env.local` and add your OnchainKit API key
   - Get your API key from [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx           # Main application page
├── providers.tsx      # MiniKit and OnchainKit providers
├── globals.css        # Global styles and Tailwind
├── loading.tsx        # Loading UI
└── error.tsx          # Error boundary

components/
├── ProfileCard.tsx           # User profile display
├── ProjectCard.tsx          # Project showcase
├── CreateProjectModal.tsx   # Project creation form
├── CollaborationRequestModal.tsx # Collaboration requests
├── SkillFilter.tsx          # Skill-based filtering
└── Navigation.tsx           # Bottom navigation

lib/
├── types.ts           # TypeScript interfaces
└── mockData.ts        # Sample data for development
```

## Key Features Implementation

### User Profiles
- Farcaster identity integration
- Skill tagging system
- Portfolio link showcase
- Bio and display information

### Project Management
- Create and manage projects
- Define required skills
- Track project status
- Collaboration requests

### Discovery & Matching
- Skill-based filtering
- Search functionality
- Profile browsing
- Connection requests

### Micro-transactions
- Pay-per-connection model ($0.05)
- Featured profile placement ($1/24hr)
- Base network integration

## Environment Variables

```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_RPC_URL=https://mainnet.base.org
```

## Deployment

This app is optimized for deployment on Vercel or similar platforms that support Next.js 15.

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
3. **Configure environment variables** in your deployment platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.
