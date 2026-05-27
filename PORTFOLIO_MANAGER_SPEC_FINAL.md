# PortfolioInsight Pro - Final Production Specification
**Free Pilot Level | MVP for Rapid Deployment**

---

## 🎯 Project Overview

**PortfolioInsight Pro** is an AI-powered portfolio manager and stock recommendation platform for Indian investors (NSE focus, expandable to BSE/US).

### Core Mission
- **Read real NSE stock data** and analyze using flexible criteria
- **Recommend stocks** that match 70%+ of user's criteria + AI deviations with explanation
- **Track real portfolio** (when broker connected) or simulate (read-only mode)
- **Provide market news** (portfolio-specific + market-wide) 2x daily
- **Alert system** for price moves, news, stop-loss hits
- **User choice**: Manual approval or auto-trading (both options available)

### Target Portfolio Return
⚠️ **"Target portfolio return potential of ~10% annually with select opportunities"**
- Not guaranteed
- Depends on market conditions, user's risk tolerance, decision-making
- Requires active monitoring and decision-making
- AI suggests; user decides

---

## 🏗️ Architecture at a Glance

```
┌─────────────────────────────────────────────────────────────┐
│ Frontend: Next.js + React (5 Simple Tabs)                   │
│ ├─ Dashboard (KPIs, top recommendations)                    │
│ ├─ Screener (Search, filter, run criteria)                 │
│ ├─ My Portfolio (Real tracking if connected)               │
│ ├─ Watchlist (Saved stocks)                                │
│ ├─ Alerts (Price, news, portfolio alerts)                  │
│ └─ News (Market + Portfolio-specific)                      │
└─────────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────────┐
│ Backend API: Node.js + Express (Serverless on Vercel)       │
│ ├─ NSE Stock Data (real-time)                              │
│ ├─ Technical Indicators (MACD, Ichimoku, Fibo, EMA)        │
│ ├─ Screening Engine (70%+ matching)                        │
│ ├─ News Aggregator (2x daily cron jobs)                    │
│ ├─ Portfolio Manager (tracking + alerts)                   │
│ ├─ Zerodha Integration (optional, read-write)              │
│ └─ AI Recommendation Engine                                │
└─────────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────────┐
│ Data Sources                                                 │
│ ├─ NSE: yfinance, bseindia.com, screener.in               │
│ ├─ Charts: TradingView Lightweight Charts (free)            │
│ ├─ News: NewsAPI, FinnHub, RSS feeds (Reuters, Bloomberg)  │
│ ├─ Broker: Zerodha Kite API (optional)                     │
│ └─ Database: PostgreSQL (or free Neon for pilot)           │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Key Features

### 1. **Screening Engine** (Core)
- **Flexible Criteria Matching**: 70%+ of user's input criteria
- **Deviation Explanation**: Show why stock doesn't meet 100%, why it's still recommended
- **Real Data**: Live NSE stock fundamentals and technicals
- **Ranking**: Confidence score (0-100%) based on criteria match + AI model

### 2. **Real-Time Charts**
- **TradingView Style**: Candlestick, OHLC data
- **Timeframes**: Intraday (1m, 5m, 15m, 1h), Daily, Weekly, Monthly, Yearly
- **Indicators**:
  - MACD (12, 26, 9)
  - Ichimoku Cloud (9, 26, 52, 26)
  - Fibonacci Retracement (levels: 0.236, 0.382, 0.618, 0.786)
  - Exponential Moving Average (20, 50, 200)
  - Volume bars
  - Support/Resistance lines

### 3. **Portfolio Management**
- **Read-Only Mode** (no broker): View recommendations, watchlist, simulated tracking
- **Connected Mode** (Zerodha linked): Real positions, real P&L, real alerts
- **Execution Options**:
  - Manual: 1-click buy/sell approval before execution
  - Auto: Buy at signal, sell at target/stoploss automatically
  - User configurable per stock

### 4. **News Aggregation** (Updated 8 AM & 8 PM IST)
- **Portfolio-Specific News**: News on your holdings + relevant sectors
- **Market-Wide News**: General market trends, indices, macroeconomics
- **Separate Sections**:
  - Your Portfolio Stocks (if connected)
  - Watchlist Stocks
  - Recommended Stocks
  - Market News
  - International News (affect Indian markets)
- **Sources**: Reuters, Bloomberg, MoneyControl, CNBC-TV18, Economic Times, ZerodhaVariety, IndMoney, RSS feeds, NewsAPI

### 5. **Alert System**
- **Price Alerts**: Stock hits target/stoploss, breaks support/resistance
- **News Alerts**: Breaking news on your holdings
- **Portfolio Alerts**: Portfolio P&L milestones, sector imbalance
- **Delivery**: In-app, Email, (future: SMS, Telegram)

### 6. **AI Recommendation Engine**
- **Not just rule-based**: Suggests stocks beyond strict criteria
- **Scoring Model**:
  - Fundamental score (P/E, ROE, FCF, Piotroski)
  - Technical score (MACD, Ichimoku, trend)
  - Momentum score (recent news, price action)
  - Combined AI score (0-100)
- **Output**: Show all input parameters, actual values, deviations, and recommendation reasoning

---

## 📱 UI / Tabs (5 Simplified)

### Tab 1: **Dashboard**
- KPIs: Total portfolio value, P&L (₹ + %), win rate, avg holding period
- Top 5 Recommendations (with match %)
- Portfolio allocation pie chart (if connected)
- Recent alerts (3 most recent)
- Quote ticker (NIFTY50, SENSEX, top gainers)

### Tab 2: **Screener**
- Input your criteria:
  - P/E range (min, max)
  - ROE threshold
  - Sector
  - Market cap range
  - Risk profile (conservative, balanced, aggressive)
- Run screener
- Results table:
  - Stock name, price, criteria match %
  - Confidence score
  - Reasoning (one-liner)
- Click stock → See full details (chart, all criteria breakdown, recommendation explanation)
- Filters: Sort by match %, confidence, sector, price change

### Tab 3: **My Portfolio**
- **If Read-Only Mode** (no broker connected):
  - Watchlist with "Paper Tracking" feature
  - Add stock → Set entry price → Track P&L manually
  - Edit/remove positions
- **If Connected** (Zerodha linked):
  - Live positions from broker
  - Real P&L, entry price, quantity, unrealized gain/loss
  - Targets and stoploss (set in PortfolioInsight)
  - Option to manually exit or auto-exit
- Portfolio composition: Sector allocation, top holdings
- Performance chart: Monthly returns

### Tab 4: **Watchlist**
- Save stocks you're tracking
- Add notes/alerts per stock
- Quick view: Current price, 52-week high/low, change %
- Add to portfolio button
- Remove from watchlist

### Tab 5: **Alerts**
- **Price Alerts**: "Stock XYZ hit target 1 of ₹1250"
- **News Alerts**: "Breaking: CEO of XYZ resigns"
- **Portfolio Alerts**: "Portfolio up 5% this month"
- Acknowledge/dismiss alerts
- Manage alert preferences

### Bonus Tab: **News** (New Updates Section)
- Sections:
  - Your Portfolio (if connected)
  - Watchlist Stocks
  - Top Recommendations
  - Market & Indices
  - Sectors
  - Global Markets
- Each article: Title, source, timestamp, excerpt, read more link
- Filter by date, sentiment
- Search news

---

## 🔧 Technical Stack (Free/Low-Cost at Pilot Level)

| Component | Technology | Cost |
|-----------|-----------|------|
| Frontend | Next.js 14 + React 18 + TailwindCSS | Free |
| Backend | Node.js + Express (Vercel Serverless) | Free |
| Database | Neon (PostgreSQL) | Free tier |
| Charts | TradingView Lightweight Charts | Free |
| News API | NewsAPI (free tier) + RSS feeds | Free |
| Stock Data | yfinance (free) + Screener.in (optional) | Free |
| Broker API | Zerodha Kite (free) | Free |
| Hosting | Vercel (frontend + backend) | Free tier |
| Email | Resend (free tier) | Free |
| **Total** | | **$0 at pilot** |

---

## 🚀 Data Sources & Real Integration

### 1. **NSE Stock Data**
```
Primary: yfinance (free, Python/Node wrapper)
  ├─ Real-time stock prices
  ├─ Historical OHLCV
  ├─ Dividend, split data
  └─ Works for NSE stocks (ticker.NS)

Alternative: Screener.in API
  ├─ Fundamentals (P/E, ROE, FCF, Piotroski)
  ├─ Free tier available
  └─ Higher quality data

All NSE stocks list: bseindia.com or screener.in (export CSV)
```

### 2. **Real-Time Charts**
```
TradingView Lightweight Charts (free)
  ├─ Candlestick, OHLC, volume
  ├─ Lightweight, no watermark
  ├─ Mobile responsive
  └─ Indicators: MACD, Ichimoku, EMA, Fibo built-in

Data feed: yfinance OHLCV
```

### 3. **News Aggregation**
```
NewsAPI.org (free tier: 100 requests/day)
  ├─ General news (search by keyword/ticker)
  ├─ Can search "NSE stocks", "Indian markets"
  └─ 30-day article history

RSS Feeds (free):
  ├─ Reuters: https://feeds.reuters.com/reuters/businessNews
  ├─ Bloomberg: https://feeds.bloomberg.com/markets/news.rss
  ├─ Economic Times: https://economictimes.indiatimes.com/feed.xml
  ├─ MoneyControl: https://www.moneycontrol.com/rss/
  └─ Zerodha Varsity: https://feeds.finimize.com/all

FinnHub.io (free tier):
  ├─ 60 API requests/minute
  ├─ News, sentiment analysis
  └─ Stock data

Cron jobs (2x daily):
  ├─ 8:00 AM IST: Fetch news, filter, store in DB
  ├─ 8:00 PM IST: Fetch evening news, filter
  └─ Dedup and rank by relevance
```

### 4. **Optional Broker Integration**
```
Zerodha Kite API (free)
  ├─ Authentication
  ├─ Fetch holdings
  ├─ Fetch orders/trades
  ├─ Place orders (optional)
  ├─ Real-time WebSocket (prices)
  └─ Need Zerodha account

Integration flow:
  ├─ User clicks "Connect Zerodha"
  ├─ Redirects to Zerodha login
  ├─ Returns access token
  ├─ Store securely (encrypted)
  ├─ Fetch portfolio data
  └─ Track real positions
```

---

## 🤖 AI Recommendation Logic

### Scoring Model (0-100)
```
Score = (Fundamental_Score × 0.3) + (Technical_Score × 0.4) + (Sentiment_Score × 0.2) + (Momentum_Score × 0.1)

Fundamental (0-100):
  ├─ P/E normalized (lower is better, cap at 30)
  ├─ ROE (higher is better, cap at 30%)
  ├─ FCF (positive = 10 points)
  └─ Piotroski score (×10)

Technical (0-100):
  ├─ MACD signal (crossover = +30, trend = +70)
  ├─ Ichimoku position (price > cloud = +40)
  ├─ EMA alignment (fast > slow > slow = +30)
  └─ Volume trend (increasing = +10)

Sentiment (0-100):
  ├─ Recent news sentiment (positive = +50, negative = -50)
  ├─ Analyst ratings (if available)
  └─ Price momentum (% change vs sector)

Momentum (0-100):
  ├─ 3-month price change
  ├─ Sector relative strength
  └─ Volume trend
```

### Recommendation Output
```
Stock: TCS
Confidence: 78%
Match: 70% of your criteria

Criteria Breakdown:
✅ P/E: 24 (your max: 25) ← Excellent
✅ ROE: 18% (your min: 15%) ← Good
✅ Market Cap: 12T (your range: 1T-20T) ← Good
⚠️ Sector: IT (you prefer Pharma) ← Deviation
❌ Dividend Yield: 0.8% (you prefer 2%+) ← Not met

Why Recommend?
- Strong fundamentals despite being outside your exact criteria
- Recent news positive (IT sector recovery)
- Technical setup bullish (MACD crossover, EMA aligned)
- Momentum building (3-month +12%)

Risk Factors:
- High valuation (P/E above historical average)
- Sector cyclicality
- US slowdown risk (IT exports)

Suggested Action:
BUY (Conservative position size, 1-2% of portfolio)
Target: ₹4200 | Stop-Loss: ₹3800
```

---

## 🔔 Alert System

### Types
1. **Price Alerts**
   - Stock hits target (T1, T2)
   - Stock hits stop-loss
   - Support/Resistance broken
   - 52-week high/low

2. **News Alerts**
   - Breaking news on holdings
   - Sector news
   - Regulatory announcements

3. **Portfolio Alerts**
   - Portfolio P&L milestones (up 5%, down 5%)
   - Sector overexposure (>40% in one sector)
   - Too many positions (>10)

### Delivery
- **In-App**: Notification center in UI
- **Email**: Daily digest (optional)
- **Future**: SMS, Telegram, Slack

---

## 🎛️ Trading Modes

### Mode 1: **Manual Approval** (Default, Safest)
```
Flow:
1. AI recommends "BUY TCS" at ₹4100
2. Notification sent to user
3. User clicks "Buy" → Confirmation screen
4. User approves quantity, price
5. Order placed (if broker connected) or added to watchlist
6. Exit: Manual sell or when stop-loss hits (notification sent)
```

### Mode 2: **Auto-Trading** (Advanced, Opt-in)
```
Flow:
1. User sets: "Auto-trade with max 2% portfolio size per stock"
2. AI recommends "BUY TCS"
3. Order auto-placed at market price
4. Exit: Auto-sell at target (take profit on 50%, trail stop on rest) or at stop-loss
5. Notification sent after execution
6. User can cancel at any time
```

### User Control
- Set per stock or global
- Max position size limit (e.g., 3% of portfolio)
- Max active positions (e.g., 10)
- Max loss per day (e.g., 5% of capital)
- Trading hours (exclude pre-market, post-market if desired)

---

## 📊 Criteria Input Examples

### Conservative Investor
```
P/E: Max 15
ROE: Min 15%
Sector: Banking, FMCG
Market Cap: 1T - 10T
Dividend: Min 2%
Risk Profile: Low
```

### Aggressive Investor
```
P/E: 10-30
ROE: Min 10%
Sector: Any
Market Cap: 100Cr - 20T
Dividend: Any
Risk Profile: High
Technical Focus: Yes (MACD + Ichimoku)
```

---

## 🛡️ Compliance & Disclaimers

### Prominent Disclaimers (On every page)
- "This platform provides AI-assisted portfolio management. It is NOT financial advice."
- "Target portfolio return potential of ~10% annually with select opportunities. Not guaranteed."
- "All trading carries market risk. Past performance ≠ future results."
- "Please consult a certified financial advisor before making investment decisions."

### Data Privacy
- User data encrypted
- No sharing with third parties
- Zerodha credentials stored securely (token-based, not saved)
- Audit logs for compliance

### User Agreement
- Accept terms before first trade
- Acknowledge risk warnings
- Confirm they're 18+ and authorized to trade

---

## 📅 Implementation Timeline

| Phase | Timeline | Deliverables |
|-------|----------|--------------|
| Phase 1 | Week 1 | Backend API + NSE data integration + Screening engine |
| Phase 2 | Week 2 | Frontend UI (5 tabs) + TradingView charts |
| Phase 3 | Week 2-3 | News aggregation + Cron jobs |
| Phase 4 | Week 3 | Zerodha integration (optional, read-write) |
| Phase 5 | Week 3-4 | Alert system + Notifications |
| Phase 6 | Week 4 | Testing + Deployment to Vercel |
| **MVP Live** | **End of Week 4** | **Free pilot level** |

---

## 💰 Cost Breakdown (Pilot Phase)

| Service | Cost | Notes |
|---------|------|-------|
| Hosting | $0 | Vercel free tier |
| Database | $0 | Neon free tier (5GB) |
| Charts | $0 | TradingView Lightweight |
| News | $0 | NewsAPI (free) + RSS |
| Stock Data | $0 | yfinance |
| Broker API | $0 | Zerodha free |
| Email | $0 | Resend free tier |
| **Total** | **$0** | Completely free at pilot |

**Post-MVP (if monetizing)**:
- Vercel Pro: $20/month
- Neon paid: $20/month
- NewsAPI paid: $50/month
- Total: ~$100/month (shared across users)

---

## ✅ Success Criteria for Pilot

- [ ] Live in 4 weeks
- [ ] Real NSE stock data displaying correctly
- [ ] 5 tabs fully functional
- [ ] Charts with indicators working
- [ ] News aggregated and updated 2x daily
- [ ] Portfolio tracking (read-only + optional real)
- [ ] Alert system functional
- [ ] 0 critical bugs
- [ ] 50+ beta testers
- [ ] Average user session > 10 minutes
- [ ] User feedback integrated within 1 week of pilot launch

---

## 🎯 Post-MVP (Future Phases)

- Phase 2: Backtesting engine
- Phase 3: Mobile app
- Phase 4: Advanced ML recommendations
- Phase 5: Subscription tiers (Pro, Enterprise)
- Phase 6: Advisor/portfolio management services

---

**Status**: Ready for development  
**Next Step**: Start building Phase 1 (Backend API + NSE integration)
