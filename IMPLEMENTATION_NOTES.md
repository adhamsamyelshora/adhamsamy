# Implementation Notes

## Architecture
- Clean layered architecture per module: validators (Zod), repository, service, and UI.
- Route handlers only orchestrate auth + request/response logic.
- Shared utilities in `src/lib`, server-only helpers in `src/server`.

## Data isolation
- Every primary model includes `userId` and repository queries filter by it.
- Composite indexes on `userId + date` for timeline queries.

## Tradeoffs
- Used route handlers (instead of server actions) for explicit API boundaries and integration testability.
- Recharts integration is planned for richer chart UI; currently textual summaries render reliably server-side.
