# AGENTS.md

BookNook: Next.js 16 App Router / React 19 frontend for a community library. The Express
backend is `../booknook_backend`; both use MongoDB database `booknookdb`. Better Auth
(JWT plugin) gates private routes, and the Express API verifies the same JWT.

## Commands

- `npm run dev` — dev server at http://localhost:3000 (Turbopack). Keep port 3000; see below.
- `npm run build` — production build plus the only full TypeScript check. With the pinned
  Next 16.4.4, the first run can exit 1 *after* a successful compile because of a
  security-upgrade reminder; re-run it to finish.
- `npm run lint` — whole repo. It currently exits 1 on two vendored-file errors,
  `src/components/ui/carousel.tsx:98` and `src/hooks/use-mobile.ts:14`; ignore those and the
  many pre-existing unused-var warnings. Check touched files with `npx eslint <paths>`;
  don't rewrite vendored components just to silence lint.
- `npx tsc --noEmit` only works after generated `.next` types exist; run `npm run dev` or
  `npm run build` first.
- No test runner, formatter, `typecheck` script, or CI. Use npm only (`package-lock.json`).

## Environment and run order

- `.env` is gitignored and there is no `.env.example`. Required variables:
  `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`,
  `GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_API_URL`.
- `src/lib/auth.ts` opens `MongoClient` at import time, so dev/build fail without
  `MONGODB_URI`. Google login also needs real OAuth credentials.
- Frontend and backend share `booknookdb`: backend collections are `allbooks`,
  `categoriesName`, `borrow`; Better Auth adds its own user/session collections.
  Schema changes can affect both sides.
- Run the backend from `../booknook_backend` (no dev script; `node index.js`); it defaults
  to port 8000. Its `verifyToken` fetches JWKS from the hardcoded
  `http://localhost:3000/api/auth/jwks`, so the frontend must stay on port 3000 or every
  authenticated API call returns 403.
- `NEXT_PUBLIC_API_URL` is the Express base (`http://localhost:8000` locally). All book
  requests go directly to it; there is no API client, rewrite, or Next API proxy for book
  data.
- `src/lib/auth-client.ts` reads `BETTER_AUTH_URL` in client code; Next exposes only
  `NEXT_PUBLIC_*` to the browser, so this normally falls back to same-origin. If auth moves
  cross-origin, add a `NEXT_PUBLIC_*` base URL instead.

## Auth and data flow

- Server auth: `src/lib/auth.ts` (MongoDB adapter, email/password, Google, JWT plugin,
  7-day JWT cookie cache); handler at `src/app/api/auth/[...all]/route.ts`.
- `src/proxy.ts` is the Next 16 middleware replacement (exported as `proxy`, not
  `middleware`). Its matcher is `/my-books`, `/books/:path*`, `/my-borrows`, `/add-book`,
  `/profile`;
  add new private routes there. Unauthenticated requests redirect to
  `/login?callbackUrl=...`.
- Server components use `auth.api.getSession({ headers: await headers() })` and
  `auth.api.getToken(...)`; client components use `useSession()` and `authClient.token()`
  from `@/lib/auth-client`. Express calls must send `Authorization: Bearer <token>`.
- Registration has `autoSignIn: false`; after sign-up the UI routes to `/login`.
- Public backend endpoints: `GET /api/all-books`, `/api/new-arrival`, `/api/categories`.
  JWT-protected: `GET /api/all-books/:id`, `/api/my-books/:email`,
  `/api/my-borrowed/:email`; `POST /api/add-books`, `/api/my-books/borrow/:id`;
  `PATCH /api/my-books/update/:id`; `DELETE /api/my-books/delete/:id`,
  `/api/my-borrows/delete/:id/:email`.
- Home and All Books explicitly use `cache: "no-store"`; other server fetches are dynamic
  because they use `headers()`. After client mutations, call `router.refresh()` to re-fetch.

## Structure and conventions

- Routes: `/`, `/all-books`, `/books/[id]`, `/login`, `/register`, `/add-book`,
  `/my-books`, `/my-borrows`, `/profile`; auth API under `/api/auth/[...all]`.
- `@/*` → `src/*`. Components are grouped by feature under `src/components/`; shared types
  are in `src/types/`.
- Next 16 route props are generated: the root layout uses `LayoutProps<"/">`, and `params`
  is a Promise (the book page already awaits it).
- Auth forms use react-hook-form + zod; add/edit book forms use uncontrolled `FormData`.
  Category options are duplicated in `src/components/add-book/AddBookForm.tsx` and
  `src/components/DialogOpen/EditDialog.tsx`; update both.
- Toasts use Sonner (`toast`), already mounted in `src/app/layout.tsx`.
- `README.md` is stock create-next-app text and stale; trust the source tree.

## UI and styling

- `src/components/ui/*` is vendored shadcn `base-nova` output. Add primitives with
  `npx shadcn@latest add <name>`. They are built on `@base-ui/react`, not Radix; use the
  existing `render={<Link />}` props and `data-slot` patterns, not Radix `asChild`.
- Tailwind v4 is CSS-first: no `tailwind.config.*`. Theme tokens, dark mode, the custom
  palette (`paper`, `ink`, `dark`, `cream`, `amber`, `teal`, `terracotta`), fonts, and
  animations live in `src/app/globals.css`.
- `cn` comes from the `"cn"` npm package; import `{ cn } from "cn"`. `src/lib/utils.ts`
  only re-exports it.
- `next.config.ts` enables React Compiler, allows `next/image` from any HTTPS host, and
  keeps a custom `@tailwindcss/turbopack` CSS loader; keep these and don't add a PostCSS
  config.
- Fonts: `font-sans` is Inter, `font-heading` is Fraunces. Icons are mostly
  `lucide-react`; the Google mark uses `react-icons/fc`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
