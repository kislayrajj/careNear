# CareNear — AI-Powered Healthcare Provider Finder

> 🚧 **Status: Prototype / Active Development** — Core UI and provider search are functional. The full recommendation engine and NLP query parsing are planned features currently being built.

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

**[Live Demo →](https://care-near.vercel.app/)** *(Prototype — full feature set in progress)*

---

## The Problem

Finding a suitable doctor or clinic in India is harder than it should be. Generic search engines return ad-ranked results. Existing platforms don't interpret symptoms — they require users to already know their medical specialty. CareNear is being built to bridge that gap.

---

## Planned Architecture

This is how CareNear will work once the recommendation engine is complete:

```
User query (free text symptoms)
        ↓
NLP-inspired query parser           ← in development
        ↓
Symptom → Specialisation mapping    ← in development
        ↓
Location + filter criteria applied
        ↓
Real-time scoring & ranking         ← in development
        ↓
Ranked provider recommendations
```

---

## Features

- Provider search with location and specialisation filters
- Provider listing UI with cards showing name, specialisation, and location
- Responsive design across mobile and desktop
- Basic filter controls (specialisation, area)
- React frontend connected to Node.js + MongoDB backend
- NLP-inspired free-text query parsing (type symptoms, get matched specialisations)
- Symptom → specialisation mapping engine
- Real-time multi-factor scoring and ranking algorithm
- Full provider profile pages
- Rating and availability filters

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Deployment | Vercel |

---

## Local Setup

```bash
git clone https://github.com/kislayrajj/CareNear.git
cd CareNear
npm install
npm run dev
```

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000
MONGO_URI=your_mongodb_connection_string
```

---

## Author

**Kislay Raj** — [LinkedIn](https://www.linkedin.com/in/kislay-raj-b462502a6/) · [Portfolio](https://portfolio-w-react.vercel.app/) · [GitHub](https://github.com/kislayrajj)
