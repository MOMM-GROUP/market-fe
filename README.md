# MOMM - Multi-Vendor Marketplace Platform

> A modern, multi-vendor e-commerce platform connecting minority-owned businesses with consumers.

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green)](https://supabase.com/)

## 🌐 Live Platform

**Production:** [market.momm.group](https://market.momm.group)  
**Staging:** [preview.momm.group](https://preview.momm.group)

## 📋 About

MOMM (Minority-Owned Marketplace & More) is an open-source platform that empowers minority-owned businesses by providing them with a modern e-commerce presence and connecting them with customers who value supporting diverse entrepreneurs.

### Features

- 🏪 Multi-vendor marketplace
- 🔍 Advanced product search and filtering
- 🎯 Vendor verification system
- 📱 Mobile-responsive design
- 🔒 Secure authentication and payments
- 📊 Vendor analytics dashboard

## 🚀 Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Deployment:** Vercel
- **Automation:** n8n workflows
- **Package Manager:** npm

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Git

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/your-org/momm-marketplace.git
   cd momm-marketplace
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**
```bash
   cp .env.example .env.local
```
   
   Fill in your Supabase credentials:
```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   SITE_URL=http://localhost:3000
```

4. **Run the development server**
```bash
   npm run dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌳 Git Workflow

We use a three-branch strategy:
```
┌─────────────┐
│   feature   │ ─── Work on new features/fixes
└──────┬──────┘
       │ PR + merge
       ▼
┌─────────────┐
│   preview   │ ─── Staging environment (test here)
└──────┬──────┘
       │ PR + squash merge
       ▼
┌─────────────┐
│    main     │ ─── Production (always stable)
└─────────────┘
```

### Branch Descriptions

- **`main`** - Production branch, deployed to [momm.group](https://momm.group)
- **`preview`** - Staging branch, deployed to preview environment
- **`feature/*`** - Feature branches for active development

### Working on a Feature
```bash
# 1. Create a feature branch from preview
git checkout preview
git pull origin preview
git checkout -b feature/your-feature-name

# 2. Make your changes
# ... code, commit, code, commit ...

# 3. Push your branch
git push -u origin feature/your-feature-name

# 4. Create a Pull Request to preview
# Go to GitHub and create PR: feature/your-feature-name → preview

# 5. After review and merge, test on staging
# 6. When ready, create PR: preview → main
```

## 🤝 Contributing

We love contributions! Here's how to get started:

### 1. Find an Issue

- Browse our [issues](https://github.com/your-org/momm-marketplace/issues)
- Look for `good first issue` or `help wanted` labels
- Comment on the issue to let us know you're working on it

### 2. Development Process

1. Fork the repository
2. Create a feature branch from `preview`
3. Make your changes
4. Write/update tests if applicable
5. Ensure code passes linting: `npm run lint`
6. Commit with clear messages (see commit conventions below)
7. Push to your fork
8. Create a Pull Request to `preview`

### 3. Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/):
```
feat: add new product filter
fix: resolve checkout bug
docs: update README
style: format code with prettier
refactor: simplify category logic
test: add product tests
chore: update dependencies
```

### 4. Pull Request Guidelines

- ✅ Fill out the PR template completely
- ✅ Link related issues
- ✅ Ensure CI checks pass
- ✅ Request review from maintainers
- ✅ Respond to feedback promptly

## 🔒 Branch Protection Rules

### `main` Branch
- ✅ Require pull request reviews (1+ approvals)
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Do not allow bypassing the above settings

### `preview` Branch  
- ✅ Require status checks to pass (optional)
- ✅ Allow direct commits from maintainers (for quick fixes)

## 📝 Code Style

- **TypeScript:** Strict mode enabled
- **Linting:** ESLint with Next.js config
- **Formatting:** Prettier (run `npm run format`)
- **Components:** Use TypeScript functional components
- **Styling:** Tailwind CSS utility classes

## 🧪 Testing
```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e
```

## 📦 Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # Check TypeScript types
```

## 🗄️ Database

We use Supabase (PostgreSQL) for our database. See [CONTRIBUTING.md](./CONTRIBUTING.md) for database schema and migration guidelines.

### Key Tables
- `products` - Product listings
- `vendors` - Vendor profiles
- `categories` - Product categories
- `orders` - Customer orders
- `certifications` - Vendor certifications

## 📚 Documentation

- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Component Library](./docs/COMPONENTS.md)
- [Contributing Guide](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)

## 🐛 Reporting Bugs

Found a bug? Please [create an issue](https://github.com/your-org/momm-marketplace/issues/new) with:

- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/device information

## 💬 Community

- **Discord:** [Join our community](https://discord.gg/your-invite)

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

**What does GPL-3.0 mean for you?**

- ✅ You can freely use, modify, and distribute this software
- ✅ You can use it for commercial purposes
- ⚠️ If you distribute modified versions, they must also be open-source under GPL-3.0
- ⚠️ You must include the original license and copyright notice
- ⚠️ You must disclose the source code of any modifications

For more details, see the [full license text](https://www.gnu.org/licenses/gpl-3.0.en.html).

## 🙏 Acknowledgments

- All our amazing [contributors](https://github.com/your-org/momm-marketplace/graphs/contributors)
- The open-source community
- Minority-owned businesses who inspire this platform

## 🗺️ Roadmap

See our [public roadmap](https://github.com/your-org/momm-marketplace/projects/1) for upcoming features and improvements.

---

**Built with ❤️ by the MOMM community**

[Website](https://momm.group) • [Documentation](./docs) • [Contributing](./CONTRIBUTING.md) • [Issues](https://github.com/your-org/momm-marketplace/issues)
