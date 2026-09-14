# Contributing to ScoopLog

Thank you for helping take care of this little ice cream passport.
ScoopLog is built **for gelato people, by gelato people** — eaters, not shop
owners or formula tinkerers. Keep that in mind when you propose features.

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before opening an issue
or pull request.

## 中文

欢迎来给「冰淇淋护照」盖新章。ScoopLog 是写给**爱吃冰淇淋的人**的本地日记，
不是店铺后台，也不是配方实验室。提功能前请先看
[行为准则](CODE_OF_CONDUCT.md)。

本地开发：需要 Node.js 20+，然后 `npm install` → `npm run dev`。
改 UI 文案时请同时更新 `src/i18n.ts` 里的 English 与 中文。
提交前请跑 `npm run lint` 和 `npm run build`。

---

## What belongs in ScoopLog

In scope:

- Logging scoops you *ate* (shop, flavor, rating, notes, tags, date)
- Search, filters, and personal stats
- Local-first persistence and bilingual UI
- Warm, readable, mobile-friendly design

Usually out of scope:

- Shop management, inventory, or POS
- Recipe / overrun / mix formulation tools
- Accounts, cloud sync, or social feeds (unless designed as optional later)

If you are unsure, open an issue first.

## Development setup

You need **Node.js 20+** and npm.

```bash
git clone https://github.com/WhitterWang/scooplog.git
cd scooplog
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

Useful scripts:

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Typecheck and production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run oxlint |

Journal data lives in **localStorage** under `scooplog.scoops.v1`.
The language preference is `scooplog.locale.v1`. Use **Reset sample journal**
in the app if you need a clean starter set.

## Project map

```
src/
  App.tsx                 Shell, filters, dialogs
  i18n.ts                 English + 中文 copy
  components/             UI pieces
  hooks/useScoops.ts      CRUD + persistence
  lib/seed.ts             Sample scoops
  lib/stats.ts            Totals, averages, rankings
```

## Translations

All user-facing strings live in `src/i18n.ts`.

- Add the same key to both `messages.en` and `messages.zh`
- Keep the voice warm and specific. Avoid generic SaaS copy.
- English tagline stays **For Gelato People by Gelato People**.
- Chinese tagline stays **为爱冰淇淋的人，由爱冰淇淋的人**.

## Pull requests

1. Fork and branch from `main`.
2. Keep the change focused. One concern per PR when you can.
3. Update docs if you change behavior, storage keys, or scripts.
4. Run `npm run lint` and `npm run build`.
5. Fill in the pull request template. Screenshots help for UI work.

Bug reports and ideas are welcome as [GitHub issues](https://github.com/WhitterWang/scooplog/issues).
Use the templates so maintainers can reproduce or scope the work.
