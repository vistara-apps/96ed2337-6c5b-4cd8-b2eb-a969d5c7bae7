# CollabForge

A social platform for discovering and connecting with creative collaborators based on skills and project needs within the Base ecosystem.

## 🚀 Features

### Core Features
- **Skill-Based Matching**: Users can create profiles highlighting their creative skills and search for others with complementary skills
- **Project Portfolio Showcase**: Users can upload or link to examples of their previous work
- **Integrated Project Briefing**: A simple template to define project scope, goals, deliverables, and required skill sets
- **Farcaster Integration**: Leverage Farcaster identity and allow users to initiate collaboration requests directly from their feed

### Business Model
- **Micro-transactions**: Pay per 'connection request' or for 'featured profile' placement
- **Pricing**: $0.05 per connection request, $1 for 24hr featured placement
- **Platform**: Built on Base network for seamless Web3 integration

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.0.0** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling framework
- **MiniKit & OnchainKit** - Base integration and Web3 functionality
- **Viem & Wagmi** - Ethereum interaction

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **SQLite** - Database (development)
- **Base Network RPC** - Blockchain interactions

### Integrations
- **Farcaster Hub API** - Social graph integration
- **Base Network** - On-chain features and payments
- **Frames.js** - Farcaster frame support

## 📁 Project Structure

```
collabforge/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── users/               # User management
│   │   ├── projects/            # Project management
│   │   ├── collaborations/      # Collaboration requests
│   │   ├── payments/            # Payment processing
│   │   ├── farcaster/           # Farcaster integration
│   │   └── webhook/             # Webhook handling
│   ├── components/              # React components
│   ├── lib/                     # Utility functions and types
│   └── page.tsx                 # Main page
├── components/                  # Shared components
├── lib/                         # Shared utilities
├── public/                      # Static assets
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Base network wallet (for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd collabforge
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Data Models

### User
```typescript
{
  farcasterId: string;
  displayName: string;
  bio: string;
  profilePicUrl: string;
  skills: string[];
  portfolioUrls: string[];
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
}
```

### Project
```typescript
{
  projectId: string;
  projectName: string;
  description: string;
  requiredSkills: string[];
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  ownerFarcasterId: string;
  collaborators: string[];
  budget?: string;
  deadline?: string;
}
```

### CollaborationRequest
```typescript
{
  requestId: string;
  senderFarcasterId: string;
  recipientFarcasterId: string;
  projectId?: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
  respondedAt?: string;
  paymentTxHash?: string;
}
```

## 🎨 Design System

### Colors
- **Primary**: `hsl(210, 90%, 50%)` - Base blue
- **Accent**: `hsl(130, 70%, 55%)` - Success green
- **Background**: `hsl(210, 36%, 96%)` - Light blue-gray
- **Surface**: `hsl(0, 0%, 100%)` - White
- **Text Primary**: `hsl(210, 40%, 15%)` - Dark blue-gray
- **Text Secondary**: `hsl(210, 40%, 35%)` - Medium blue-gray

### Typography
- **Display**: `text-2xl font-bold leading-tight`
- **Heading**: `text-xl font-semibold leading-normal`
- **Body**: `text-base leading-7`
- **Caption**: `text-sm text-muted-foreground`

### Layout
- **Grid**: 12-column fluid grid with 16px gutter
- **Container**: `max-w-xl px-4`
- **Spacing**: 4px, 8px, 16px, 24px scale

## 🔧 API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/[farcasterId]` - Get user by Farcaster ID
- `POST /api/users` - Create new user
- `PUT /api/users/[farcasterId]` - Update user

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/[projectId]` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/[projectId]` - Update project

### Collaborations
- `GET /api/collaborations` - Get collaboration requests
- `POST /api/collaborations` - Create collaboration request
- `PUT /api/collaborations/[requestId]` - Update request status

### Payments
- `POST /api/payments` - Process payment transaction

### Farcaster
- `POST /api/farcaster/frame` - Handle frame interactions
- `POST /api/webhook` - Handle webhooks

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables for Production
```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
DATABASE_URL=your-production-database-url
FARCASTER_HUB_URL=https://hub.farcaster.xyz
BASE_RPC_URL=https://mainnet.base.org
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built on the Base network
- Powered by Farcaster social graph
- Inspired by the creative collaboration needs of the Web3 community

