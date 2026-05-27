# 🚀 PORTFOLIO MANAGER PRO - SETUP & DEPLOYMENT GUIDE
**Free Pilot | Deploy in 4 hours**

---

## ⚡ Quick Start (TL;DR)

```bash
# 1. Clone/setup repo
git clone <your-repo>
cd portfolio-insight-pro
npm install

# 2. Setup database
cp .env.example .env.local
# Edit .env.local with your credentials

npm run db:push
npm run db:seed

# 3. Start dev server
npm run dev

# 4. Visit http://localhost:3000

# 5. Deploy to Vercel
vercel --prod
```

**Total time**: ~2 hours for full setup + deployment ✅

---

## 📋 Prerequisites

- **Node.js**: 18+ (https://nodejs.org/)
- **Git**: Latest version
- **GitHub Account**: For version control
- **Vercel Account**: Free (https://vercel.com)
- **Neon PostgreSQL**: Free tier (https://neon.tech) - OR use your own PostgreSQL
- **NewsAPI Key**: Free tier (https://newsapi.org)

All tools have free tiers. **Total setup cost: $0** 🎉

---

## 🔧 Step-by-Step Setup

### Step 1: Create Project & Initialize

```bash
# Create directory
mkdir portfolio-insight-pro
cd portfolio-insight-pro

# Initialize git
git init

# Copy all files from codebase (provided below)
# Then run:
npm install
```

### Step 2: Setup Environment Variables

```bash
# Copy template
cp .env.example .env.local

# Edit .env.local with your values:
```

**`.env.local` template** (update with your values):
```env
# Database (Free: Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@host.neon.tech/database?sslmode=require"

# NextAuth (generate: openssl rand -base64 32)
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# API Keys (all free tiers)
NEWSAPI_KEY="your-newsapi-key"
FINNHUB_API_KEY="your-finnhub-key"

# Zerodha (optional)
ZERODHA_CLIENT_ID=""
ZERODHA_SECRET=""

# API Endpoints
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### Step 3: Setup Database

```bash
# Create tables
npm run db:push

# Seed with sample data
npm run db:seed
```

### Step 4: Start Development Server

```bash
npm run dev
```

Open http://localhost:3000 → You should see login page

### Step 5: Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Follow prompts to link GitHub repo and set env variables
```

**Your app will be live at**: `https://portfolio-insight-pro-xxx.vercel.app` 🎉

---

## 📁 Project Structure

```
portfolio-insight-pro/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (app)/
│   │   ├── dashboard/page.tsx
│   │   ├── screener/page.tsx
│   │   ├── portfolio/page.tsx
│   │   ├── watchlist/page.tsx
│   │   ├── alerts/page.tsx
│   │   ├── news/page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── stocks/route.ts
│   │   ├── screener/route.ts
│   │   ├── portfolio/route.ts
│   │   ├── watchlist/route.ts
│   │   ├── news/route.ts
│   │   └── alerts/route.ts
│   └── layout.tsx
├── components/
│   ├── Dashboard.tsx
│   ├── Screener.tsx
│   ├── Portfolio.tsx
│   ├── Watchlist.tsx
│   ├── Alerts.tsx
│   ├── News.tsx
│   ├── Chart.tsx
│   └── Navigation.tsx
├── lib/
│   ├── db.ts (Prisma client)
│   ├── nse-data.ts (yfinance integration)
│   ├── screener.ts (screening logic)
│   ├── indicators.ts (MACD, Ichimoku, EMA)
│   ├── news-fetch.ts (news aggregation)
│   ├── zerodha.ts (broker integration)
│   └── utils.ts (helpers)
├── scripts/
│   ├── seed.js (populate sample data)
│   ├── fetchNews.js (2x daily news fetch)
│   └── runScreener.js (periodic screening)
├── prisma/
│   └── schema.prisma (database schema)
├── public/ (images, icons)
├── styles/ (global CSS)
├── .env.example
├── .env.local (🔒 never commit)
├── next.config.js
├── tsconfig.json
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 🗄️ Database Setup

### Option A: Neon (Recommended for pilot) - **FREE**

1. Go to https://neon.tech
2. Sign up → Create project
3. Create database "portfolio_insight"
4. Copy connection string
5. Paste in `.env.local` as `DATABASE_URL`

```
postgresql://username:password@project-region.neon.tech/database?sslmode=require
```

### Option B: Local PostgreSQL

```bash
# Mac
brew install postgresql
brew services start postgresql

# Linux
sudo apt-get install postgresql

# Windows
# Download from https://www.postgresql.org/download/windows/

# Create database
createdb portfolio_insight

# Copy connection string
DATABASE_URL="postgresql://postgres:password@localhost:5432/portfolio_insight"
```

### Verify Connection

```bash
# Test database connection
psql $DATABASE_URL -c "SELECT NOW;"
```

---

## 🔑 API Keys Setup (All Free)

### 1. NewsAPI (for news aggregation)
- Go to https://newsapi.org/
- Sign up → Generate API key
- Add to `.env.local`

### 2. FinnHub (optional, for sentiment)
- Go to https://finnhub.io/
- Sign up → Free tier API key
- Add to `.env.local`

### 3. Zerodha (optional, for broker integration)
- If user wants broker integration:
  - They provide their Zerodha Client ID/Secret
  - You store securely (encrypted)
  - They authenticate with Zerodha

---

## 🧪 Testing Locally

### Login
- Email: `demo@portfolioinsight.app`
- Password: `password123` (after running seed script)

### Test Data
- 50 sample NSE stocks (RELIANCE, TCS, INFY, etc.)
- Sample watchlist
- Sample portfolio positions (read-only)

### Run Screener
1. Go to Screener tab
2. Input criteria (P/E, ROE, etc.)
3. Click "Run Screener"
4. See results with charts

### View Charts
1. Click any stock
2. See candlestick chart (daily/weekly/monthly)
3. Add indicators: MACD, Ichimoku, EMA
4. Play with timeframes

---

## 📰 News Setup (Automated)

### 2x Daily Fetching (8 AM & 8 PM IST)

Add to your server cron job (Vercel serverless functions or external service):

```bash
# Option 1: Node-cron (in your backend)
- Runs at 8:00 AM IST and 8:00 PM IST
- Fetches from NewsAPI, FinnHub, RSS feeds
- Deduplicates, ranks, stores in DB

# Option 2: External service (GitHub Actions / cron-job.org)
- Set webhook to: https://your-app.vercel.app/api/news/fetch
- Runs automatically 2x daily
```

See `scripts/fetchNews.js` for implementation.

---

## 🔌 Real Data Integration

### Stock Data Flow

```
User searches "RELIANCE"
      ↓
Backend calls yfinance API
      ↓
Gets OHLCV (open, high, low, close, volume)
      ↓
Calculates indicators (MACD, Ichimoku, EMA)
      ↓
Returns to frontend
      ↓
TradingView Lightweight Charts renders candlestick
```

**Data sources** (all free):
- **Prices**: yfinance Python library + Node wrapper
- **Fundamentals**: Screener.in API (free tier)
- **Charts**: TradingView Lightweight Charts library
- **News**: NewsAPI + RSS feeds
- **Broker**: Zerodha Kite API (if connected)

---

## 🚀 Deployment Checklist

- [ ] Database created and connected
- [ ] Environment variables set
- [ ] npm install completed
- [ ] Database schema pushed (npm run db:push)
- [ ] Seed data loaded (npm run db:seed)
- [ ] Local development working (npm run dev)
- [ ] Built successfully (npm run build)
- [ ] GitHub repo created and pushed
- [ ] Vercel project created
- [ ] Vercel connected to GitHub
- [ ] Environment variables set in Vercel
- [ ] Domain configured (optional)
- [ ] SSL certificate active
- [ ] News cron job configured
- [ ] Zerodha integration configured (if needed)
- [ ] Testing completed
- [ ] Launched to beta testers ✅

---

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Test connection
psql $DATABASE_URL

# If fails, check:
# 1. DATABASE_URL format is correct
# 2. Database exists
# 3. Firewall allows connections (for Neon)
```

### Port 3000 Already in Use
```bash
# Kill process on port 3000
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Build Fails on Vercel
```bash
# Clear cache
vercel env pull
npm install --legacy-peer-deps
npm run build
```

### News Not Updating
```bash
# Check cron job is running
# View logs in Vercel dashboard
# Or manually trigger:
# curl https://your-app.vercel.app/api/news/fetch
```

---

## 📊 Monitoring & Maintenance

### Weekly
- Check database usage (Neon free tier: 5GB)
- Monitor API rate limits (NewsAPI: 100/day free)
- Review error logs (Vercel dashboard)

### Monthly
- Update dependencies: `npm update`
- Review security: `npm audit`
- Backup database (Neon auto-backups)

### Quarterly
- Optimize database queries (add indexes)
- Review and rotate API keys
- Performance testing and optimization

---

## 🎯 Next Steps After Launch

1. **Beta Testing** (Week 1)
   - Invite 20-30 beta testers
   - Collect feedback
   - Fix critical bugs

2. **Feedback Integration** (Week 2)
   - Improve UI based on user feedback
   - Optimize performance
   - Add requested features

3. **Broker Integration** (Week 3)
   - For users who want to trade live
   - Start with Zerodha read-only
   - Add buy/sell later

4. **Scale & Improve** (Week 4+)
   - More stock data sources
   - Advanced ML recommendations
   - Mobile app
   - Premium features

---

## 📞 Support & Resources

### Documentation
- [Specification](./PORTFOLIO_MANAGER_SPEC_FINAL.md)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)

### API Documentation
- yfinance: https://github.com/ranaroussi/yfinance
- NewsAPI: https://newsapi.org/docs
- TradingView Charts: https://tradingview.github.io/lightweight-charts/
- Zerodha Kite: https://kite.trade/

### Tools & Debugging
- Vercel Logs: https://vercel.com/dashboard
- Database Explorer: Neon console
- API Testing: Postman, Insomnia, cURL

---

## 🔒 Security Notes

- **Never commit `.env.local`** (add to `.gitignore`)
- **Use strong JWT secret** (openssl rand -base64 32)
- **Database credentials**: Use environment variables only
- **Zerodha credentials**: Encrypt before storing
- **API keys**: Rotate quarterly
- **HTTPS only** in production (Vercel auto-enables)

---

## 💬 FAQ

**Q: Can I run this locally and not deploy?**
A: Yes! Just run `npm run dev` and access http://localhost:3000. You'll use your local database.

**Q: Is this completely free?**
A: Yes, at pilot level (100-500 users). Costs may increase with scale.

**Q: How do I connect Zerodha?**
A: Users click "Connect Zerodha" → They authenticate → API token stored securely → Portfolio synced.

**Q: Can I modify the screener criteria?**
A: Yes! Edit `lib/screener.ts` to add/remove criteria, then redeploy.

**Q: How often does news update?**
A: 2x daily (8 AM & 8 PM IST). Edit schedule in `scripts/fetchNews.js`.

**Q: Can I add more indicators?**
A: Yes! Add calculation to `lib/indicators.ts`, then configure in Chart component.

---

## 📄 License & Terms

- **License**: MIT (open-source)
- **Terms**: See TERMS.md (provide disclaimer about trading risks)
- **Privacy**: See PRIVACY.md (explain data handling)

---

## 📧 Next Action Items

1. **Get API keys** (NewsAPI, FinnHub)
2. **Create Neon PostgreSQL** free account
3. **Clone repo** from GitHub
4. **Run setup** commands
5. **Test locally**
6. **Deploy to Vercel**
7. **Share with beta testers**
8. **Collect feedback**
9. **Iterate**

**Timeline**: You can be live within 4 hours ⏱️

---

**Let's build! 🚀**

Questions? Issues? Check troubleshooting section or reach out.
