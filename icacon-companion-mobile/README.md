# ICACON 2026 Companion (Mobile)

Expo React Native app for **ICACON 2026** (Aligarh).

- Offline-first: workshops, contacts, and bundled PDFs work without network  
- No login · no analytics · minimal permissions  
- Navigate: outdoor Maps for venues; indoor map when floor plans are ready  

## Run

```bash
npm install
npm run typecheck
npx expo start
```

## Structure

| Path | Purpose |
|------|---------|
| `app/(tabs)/` | Home, Navigate, Programme, Info |
| `app/pdf/` | Bundled PDF viewer / system open |
| `src/data/` | Event content, workshops, links |
| `src/lib/` | Linking + PDF helpers |
| `assets/pdfs/` | brochure.pdf, day1.pdf, day2.pdf |
| `docs/` | Privacy, store listing, store checklist |

## Production / stores

See **[docs/store-checklist.md](./docs/store-checklist.md)** before App Store / Play submit.

```bash
eas build --profile production --platform android
eas build --profile production --platform ios
```

## Privacy

Summary: no personal data collection, no tracking. Full text in `docs/privacy.md` — **host publicly** and paste the URL into store consoles.
