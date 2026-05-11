# 🧭 WanderBuddy

**AI-powered travel planner** — plan smarter, travel better.

## Architecture

| Service | Stack | Port | Description |
|---------|-------|------|-------------|
| `apps/api` | Node.js · Express · Prisma | 4000 | REST API backend |
| `apps/web` | React · Vite | 5173 | Web frontend |
| `apps/mobile` | React Native · Expo | 8081 | Mobile app |
| `agent` | Node.js · LangGraph.js | 4100 | AI agent service |

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp agent/.env.example agent/.env

# 3. Set up database
npm run db:generate
npm run db:push

# 4. Run services
npm run dev:api     # API on :4000
npm run dev:web     # Web on :5173
npm run dev:agent   # Agent on :4100
```

## Docker (Local)

```bash
npm run docker:up     # Spin up all services
npm run docker:down   # Tear down
```

## Kubernetes

```bash
# Dev
kubectl apply -k infra/k8s/overlays/dev

# Prod
kubectl apply -k infra/k8s/overlays/prod
```

## Project Structure

```
wanderbuddy/
├── apps/
│   ├── api/          # Express REST API + Prisma ORM
│   ├── web/          # React (Vite) SPA
│   └── mobile/       # Expo React Native app
├── agent/            # LangGraph.js AI agent microservice
├── infra/            # Docker Compose + K8s manifests
├── packages/
│   └── shared/       # Shared constants & utilities
└── package.json      # npm workspaces root
```

## License

Private — All rights reserved.
