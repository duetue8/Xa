# Quick eLoans Canada

A Canadian loan matching service that connects borrowers with licensed Canadian lenders.

## Features

- Canadian postal code validation (K1A 0A6 format)
- Secure application form with validation
- Admin dashboard for managing applications
- Lead generation and export functionality
- Responsive design optimized for all devices

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Build Tool**: Vite
- **Deployment**: Netlify ready

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Deployment to Netlify

### Option 1: Netlify CLI
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Build the project: `npm run build`
3. Deploy: `netlify deploy --prod --dir=dist`

### Option 2: Git Integration
1. Push your code to GitHub/GitLab
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables in Netlify dashboard

### Option 3: Drag & Drop
1. Run `npm run build`
2. Drag the `dist` folder to Netlify's deploy area

## Database Setup

1. Create a Supabase project
2. Run the migrations in the `supabase/migrations` folder
3. Set up Row Level Security policies
4. Configure authentication settings

## Important Notes

- This is a lead generation service, not a direct lender
- Complies with Canadian privacy laws (PIPEDA)
- Supports Canadian postal codes and provinces
- All monetary amounts are in CAD

## License

Proprietary - All rights reserved