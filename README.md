# ICACON Companion

Conference companion for **ICACON 2026** (Aligarh, 11–13 September 2026).

This repository is a **simple two-folder layout** (not a monorepo):

```
icacon-nav-demo/                   # git repo root (logical product name: ICACON Companion)
├── icacon-companion-web-demo/     # Vite web prototype (demo)
└── icacon-companion-mobile/       # Expo iOS + Android app (production target)
```

*(Optional later: rename the git repo/folder to `icacon-companion` — the two child folders already use that naming.)*

Each folder has its own `package.json`. Install and run them separately.

## Mobile app (primary)

```bash
cd icacon-companion-mobile
npm install
npx expo start
```

See [icacon-companion-mobile/README.md](./icacon-companion-mobile/README.md).

**Phase 1:** offline static content (Home, Programme, Info) + Navigate “coming soon”.  
**Phase 2:** indoor navigation after floor plans are confirmed.

## Web demo

```bash
cd icacon-companion-web-demo
npm install
npm run dev
```

UI mirrors the mobile app (mobile is source of truth). Production shipping target is the **mobile** app.

## PDFs for offline mobile

Download and place into `icacon-companion-mobile/assets/pdfs/`:

- https://www.icaconaligarh.com/pdf/brochure.pdf → `brochure.pdf`
- https://www.icaconaligarh.com/pdf/day1.pdf → `day1.pdf`
- https://www.icaconaligarh.com/pdf/day2.pdf → `day2.pdf`

## Links

- Official site: https://www.icaconaligarh.com  
- Registration: https://in.eregnow.com/ticketing/register/icacon2026  
