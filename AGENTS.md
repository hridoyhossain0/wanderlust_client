<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

- Next.js **16.4.3** App Router, React 19.3, TypeScript, single package (not a monorepo). The bundled Next.js docs in `node_modules/next/dist/docs/` (`01-app/` for App Router) are the source of truth for APIs — they supersede training data.
- **npm** is the package manager (`package-lock.json`; don't use yarn/pnpm/bun).
- Layout: everything lives under `src/` — routes in `src/app/` (entrypoints `layout.tsx`, `page.tsx`), components in `src/components/`, helpers in `src/lib/`. Path alias `@/*` → `./src/*`.
- Homepage: `layout.tsx` mounts `NavBar` + `Footer`; `page.tsx` composes `src/components/home/*`. `HeroSection.tsx`, `WhyChooseUs.tsx`, `TestimonialsSection.tsx`, `SectionCTA.tsx` are **unused duplicates kept intentionally** (user decision) — don't wire them up or delete them. Known lint noise: a warning in `TestimonialsSection.tsx`, a targeted eslint-disable in `ui/carousel.tsx`.

## Commands

- `npm run dev` — Turbopack dev server; also (re)writes the managed block above in this file.
- `npx tsc --noEmit` — typecheck (no script exists for it).
- `npm run lint` — ESLint flat config; run bare, it lints the whole project.
- `npm run build` — the only step that exercises Next-specific compilation (routes, RSC, fonts).
- **No test runner and no tests exist.** Verify with `npx tsc --noEmit` → `npm run lint` → `npm run build`.

## Toolchain quirks (don't "fix" these)

- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `reactCompiler`. The React Compiler handles memoization — don't add manual `useMemo`/`useCallback` noise. With `cacheComponents`, data fetching/caching conventions differ from older Next.js — check `node_modules/next/dist/docs/` before writing data code.
- **Tailwind v4 has no config file.** Theme/utilities are CSS-first in `src/app/globals.css`, loaded via the `@tailwindcss/turbopack` rule in `next.config.ts`. Don't add `tailwind.config.*` or PostCSS config.
- shadcn/ui uses the **`base-nova` style on Base UI (`@base-ui/react`) — not Radix**. Add components with `npx shadcn add <name>`; they land in `src/components/ui/`.
- `cn()` is the `cn` npm package, re-exported from `src/lib/utils.ts` — not the usual clsx + tailwind-merge combo.
