# CollabForge - Base Mini App

Find your creative co-pilot for epic projects. A social platform for discovering and connecting with creative collaborators based on skills and project needs within the Base ecosystem.

## Features

- **Skill-Based Matching**: Discover collaborators based on specific creative or technical proficiencies
- **Project Portfolio Showcase**: Present ongoing or past creative work to attract collaborators
- **Integrated Project Briefing**: Streamlined way to define project scope, goals, and deliverables
- **Farcaster Integration**: Leverage Farcaster identity and in-frame actions for seamless discovery

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Blockchain**: Base Network
- **Wallet**: OnchainKit + MiniKit
- **Language**: TypeScript

## Getting Started

1. **Clone and install dependencies**:
```bash
git clone <repository-url>
cd collabforge
npm install
```

2. **Set up environment variables**:
```bash
cp .env.local.example .env.local
```

Add your OnchainKit API key to `.env.local`:
```
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here
```

3. **Run the development server**:
```bash
npm run dev
```

4. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── providers.tsx      # App providers
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ProfileCard.tsx    # User profile display
│   ├── ProjectCard.tsx    # Project display
│   ├── SkillTag.tsx       # Skill badges
│   └── PrimaryButton.tsx  # Button component
├── lib/                   # Utilities and types
│   ├── types.ts           # TypeScript definitions
│   ├── utils.ts           # Helper functions
│   └── constants.ts       # App constants
└── public/                # Static assets
```

## Key Components

### ProfileCard
Displays user profiles with skills, bio, and portfolio links. Supports collaboration requests.

### ProjectCard
Shows project details, required skills, and collaboration opportunities.

### SkillTag
Interactive skill badges for filtering and display.

## Business Model

- **Micro-transactions**: $0.05 per collaboration request
- **Featured Profiles**: $1 for 24-hour featured placement
- Low barrier to entry with direct revenue from high-value interactions

## Development

### Adding New Features

1. Define types in `lib/types.ts`
2. Create components in `components/`
3. Add pages in `app/`
4. Update constants in `lib/constants.ts`

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow the design system tokens defined in `tailwind.config.js`
- Maintain mobile-first responsive design
- Use semantic color variables

### API Integration

The app is designed to integrate with:
- Farcaster Hub API for social features
- Base Network RPC for blockchain interactions
- OnchainKit for wallet and identity management

## Deployment

1. **Build the application**:
```bash
npm run build
```

2. **Deploy to your preferred platform**:
- Vercel (recommended for Next.js)
- Netlify
- Railway
- Or any Node.js hosting provider

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For questions or support, please open an issue on GitHub or contact the development team.
