# smsm assistant

All-in-one personal assistant for food, weight, tasks, money/accounting, and work management.

## Overview
- Next.js App Router + TypeScript (strict)
- Prisma + PostgreSQL
- NextAuth credentials auth
- Zod validation + RHF forms
- Module-first clean architecture (`validators -> repository -> service -> ui`)

## Screenshots
- Dashboard placeholder: `docs/screenshots/dashboard.png`
- Food module placeholder: `docs/screenshots/food.png`

## Quick start
1. `cp .env.example .env`
2. `docker compose up -d`
3. `pnpm install`
4. `pnpm prisma:generate`
5. `pnpm prisma:migrate`
6. `pnpm prisma:seed`
7. `pnpm dev`

Demo user:
- email: `demo@smsm.app`
- password: `Demo12345!`

## Commands
- `pnpm dev` - run dev server
- `pnpm lint` - lint
- `pnpm test` - unit/integration tests
- `pnpm build` - production build
- `pnpm prisma:migrate` - run migrations
- `pnpm prisma:seed` - seed demo data

## Features
- Auth: register/login/logout + protected dashboard routes + profile view
- Food: meals + meal items + food library + daily totals + export CSV/JSON
- Weight: entries + moving average trend
- Tasks: personal/work tasks, priorities, statuses, due/reminder fields, filtered views
- Money + Accounting: transactions, budgets, category breakdown, reconcile list, monthly net
- Work: projects, timesheets, markdown notes, weekly/monthly hour summaries
- Dashboard widgets: calories, weight, task count, spend vs budget, work hours

## Deployment notes (Vercel)
- Provision managed Postgres (Neon/Supabase/RDS).
- Set `DATABASE_URL`, `NEXTAUTH_URL`, and `NEXTAUTH_SECRET` in Vercel project settings.
- Run migrations: `pnpm prisma:deploy` during build/deploy hook.

## Conventional commits
Recommended format:
- `feat(scope): ...`
- `fix(scope): ...`
- `chore(scope): ...`

## Publish to GitHub (step-by-step)
```bash
git init
git add .
git commit -m "feat: initial production-ready smsm assistant"
# Option A: GitHub CLI
gh repo create smsm-assistant --private --source=. --remote=origin --push
# Option B: manual remote
git branch -M main
git remote add origin git@github.com:<your-user>/smsm-assistant.git
git push -u origin main
```

## Manual QA checklist
- [ ] Register new account and login/logout flow
- [ ] Create food + meal and verify dashboard calories update
- [ ] Add weight entries and confirm trend values
- [ ] Create tasks and check today/upcoming/overdue/completed buckets
- [ ] Add transaction/budget and validate monthly net and spend vs budget widget
- [ ] Add project, timesheet, and note; verify work hours widget
- [ ] Export food/finance in CSV + JSON

## Known limitations
- UI currently prioritizes reliable data workflows over advanced chart rendering.
- Reminder functionality is in-app only (no push/email job runner).
- Some analytics are simplified aggregates for initial production baseline.
