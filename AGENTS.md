# AGENTS.md

Booknook frontend: Next.js 16 App Router + React 19 + Tailwind v4 + shadcn/ui (`base-nova` on Base UI).
`src/app/page.tsx` is still the create-next-app starter; the Booknook UI has not been built yet.

## Commands

- `npm run dev` — dev server at http://localhost:3000 (Turbopack).
- `npm run build` — production build; currently the only full type check.
- `npm run lint` — `eslint` with no path (whole repo).
- No test runner, formatter, or `typecheck` script. Don't invent commands.
- `npm run lint` currently exits 1 on two pre-existing issues in vendored UI files
  (`src/components/ui/carousel.tsx:98`, `src/hooks/use-mobile.ts:14`). Check only your
  changes with `npx eslint <paths>`; don't rewrite those components just to silence it.
- `npx tsc --noEmit` fails on a clean checkout because `next-env.d.ts` imports generated
  `.next/types`; run `npm run dev` or `npm run build` first.
- Package manager is npm (`package-lock.json`); don't switch to pnpm/yarn.

## UI and styling

- `src/components/ui/*` is vendored shadcn output. Add primitives with
  `npx shadcn@latest add <name>` so they match `components.json` (`style: "base-nova"`).
- Components are built on `@base-ui/react`, **not Radix**. There are no `@radix-ui/*`
  dependencies; Radix imports/examples will not resolve. Follow the existing Base UI
  primitives, `data-slot` attributes, and variant patterns.
- Tailwind v4 is CSS-first: there is no `tailwind.config.*`. Theme tokens, dark mode, and
  chart/sidebar colors live in `src/app/globals.css` (`@theme inline`, oklch CSS variables).
  Add design tokens there.
- `cn` comes from the `"cn"` npm package; `src/lib/utils.ts` only re-exports it. UI files
  import `{ cn } from "cn"` directly.
- `next.config.ts` enables React Compiler and a custom Turbopack CSS loader; keep both.
  Don't migrate to a PostCSS config.
- Icons are `lucide-react`.
- Syntax highlighting uses `src/lib/highlighter.tsx` (lazy-loaded Shiki languages) and
  `src/hooks/use-highlighted-code.ts`. Register new languages in the `languages` map
  (and `aliases` if needed).

## Structure

- `src/app/` — App Router routes, layout, metadata. `layout.tsx` uses Next 16 generated
  `LayoutProps<"/">`, so route/layout prop types depend on generated `.next` types.
- `src/components/ui/` — vendored shadcn primitives.
- `src/hooks/`, `src/lib/` — shared hooks and utilities.
- Import alias: `@/*` → `src/*`.
- `README.md` is stock create-next-app text and references a nonexistent `app/page.tsx`;
  trust the source tree over it.

## Related backend

- Sibling repo `../booknook_backend` (Express 5 + MongoDB) serves
  `GET /api/all-books` on port 8000 with CORS enabled. This frontend has no API client,
  env vars, or proxy yet; put future base URLs in `NEXT_PUBLIC_*` (`.env*` is gitignored).
