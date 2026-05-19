# CrafticWeb.ai 🚀

An AI-powered website builder that turns plain English into fully coded, production-ready websites — instantly.

> Describe your vision. The AI builds it. Deploy with one click.

[![CrafticWeb.ai](https://api.screenshotone.com/take?url=https://crafticwebai-beta.onrender.com&viewport_width=1280&viewport_height=800&format=jpg&quality=80)](https://crafticwebai-beta.onrender.com)

---

## ✨ Features

- 🤖 **AI Generation** — Describe any website, get real HTML/CSS/JS in seconds
- 💬 **Chat to Edit** — Refine your site with follow-up prompts
- 🖥️ **Live Preview** — See changes in real-time inside an iframe
- 📝 **Code Editor** — Built-in Monaco editor to manually edit generated code
- 🚀 **One-Click Deploy** — Get a shareable public link instantly
- 🔐 **Google Auth** — Firebase-powered authentication
- 💳 **Credits System** — Stripe-integrated billing with plan management

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|------|---------|
| React + Vite | UI framework |
| Redux Toolkit | Global state management |
| Axios | HTTP client |
| Firebase | Google OAuth |
| Framer Motion | Animations |
| Monaco Editor | In-browser code editor |
| Prettier | Code formatting |
| Tailwind CSS | Styling |

### Backend
| Tech | Purpose |
|------|---------|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database |
| JWT + Cookies | Authentication |
| OpenRouter API | AI model access (DeepSeek) |
| Stripe | Payment processing |
| dotenv | Environment config |

---

## 🏗️ Architecture

```
User Prompt
    ↓
Frontend (React) → POST /api/v1/website/generate
    ↓
Backend (Express) → OpenRouter API (DeepSeek model)
    ↓
AI returns JSON { message, code }
    ↓
Code saved to MongoDB
    ↓
Rendered in iframe via Blob URL (avoids CORS)
    ↓
Deploy → public slug URL
```

---

## ⚙️ How It Works

### AI Generation
The backend sends a master prompt to **DeepSeek via OpenRouter**. The AI returns a raw JSON object:
```json
{
  "message": "Your website is ready",
  "code": "<full HTML document>"
}
```
The backend retries up to 3 times if the JSON is invalid.

### iframe Preview (Blob URL)
To avoid CORS issues with `srcdoc`, the frontend renders generated HTML using a **Blob URL**:
```js
const blob = new Blob([html], { type: "text/html" });
const url = URL.createObjectURL(blob);
iframeRef.current.src = url;
```
This approach is sandboxed, secure, and works cross-origin without issues.

### Authentication Flow
1. User clicks "Continue with Google"
2. Firebase `signInWithPopup` returns user info
3. Frontend POSTs `{ name, email, avatar }` to `/api/v1/auth/register`
4. Backend creates/finds user, generates JWT, sets `httpOnly` cookie
5. All subsequent requests send cookie automatically via `withCredentials: true`

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Firebase project (Google Auth enabled)
- OpenRouter API key
- Stripe account (optional for billing)

### Clone the repo
```bash
git clone https://github.com/yourusername/crafticweb.git
cd crafticweb
```

### Backend Setup
```bash
cd Backend
npm install
```

Create `.env` in `/Backend`:
```dotenv
PORT=4000
MONGODB_URI=your_mongodb_atlas_uri
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret
OPENROUTER_API_KEY=your_openrouter_key
STRIPE_SECRET_KEY=your_stripe_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
NODE_ENV=development
```

```bash
npm start
```

### Frontend Setup
```bash
cd Frontend
npm install
```

Create `.env` in `/Frontend`:
```dotenv
VITE_FIREBASE_API_KEY=your_firebase_key
```

```bash
npm run dev
```

---

## 🌐 Deployment (Render)

### Backend
- Add all env vars from `.env` to Render Environment tab
- Set `NODE_ENV=production`
- Set `FRONTEND_URL=https://your-frontend.onrender.com`

### Frontend
- Add `VITE_FIREBASE_API_KEY` to Render Environment tab

### MongoDB Atlas
- Go to **Network Access → Add IP Address → Allow from Anywhere** (`0.0.0.0/0`)
- Required because Render uses dynamic IPs

---

## 🐛 Known Issues & How They Were Solved

| Issue | Cause | Fix |
|-------|-------|-----|
| CORS error on API calls | Backend `FRONTEND_URL` mismatch | Set correct URL in Render env vars |
| `502 Bad Gateway` | MongoDB connection failing | Whitelist `0.0.0.0/0` in Atlas Network Access |
| `auth/popup-closed-by-user` | `Cross-Origin-Opener-Policy` header blocking OAuth popup | Removed COOP header from backend |
| AI returns invalid JSON | Model response wrapped in markdown | `extractJson()` utility strips markdown fences and retries up to 3x |
| iframe CORS errors | Using `srcdoc` triggers Vite script injection | Switched to Blob URL approach |
| Cookie not sent cross-origin | Missing `sameSite: 'none'` + `secure: true` | Set `NODE_ENV=production` in Render env |

---

## 📁 Project Structure

```
CrafticWeb/
├── Backend/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── openRouter.js      # AI API client
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── website.controller.js
│   │   ├── user.controller.js
│   │   └── stripeWebhook.controller.js
│   ├── middlewares/
│   │   └── isAuth.js
│   ├── models/
│   │   ├── user.model.js
│   │   └── website.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── website.routes.js
│   │   └── billing.route.js
│   ├── utils/
│   │   └── extractJson.js
│   └── server.js
│
└── Frontend/
    ├── src/
    │   ├── Components/
    │   ├── hooks/
    │   ├── pages/
    │   ├── redux/
    │   ├── App.jsx
    │   └── FireBase.js
    └── index.html
```

---

## 📄 License

MIT License — feel free to use, modify, and build on top of this.

---

## 🙌 Author

Built with way too much `console.log` and not enough sleep by **Kunal Chakraborty**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://linkedin.com/in/yourprofile)
[![Live Demo](https://img.shields.io/badge/Live-Demo-green)](https://crafticwebai-beta.onrender.com)
