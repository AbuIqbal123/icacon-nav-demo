# App Store & Play Store — production checklist

Use this before submitting. The app is an offline-first conference companion with **no login**, **no analytics**, and **no sensitive permissions**.

## Fixed in code (this review)

- [x] `tel:` / `mailto:` work offline (not blocked by network check)
- [x] External https / Maps require network with clear alert
- [x] Bundled PDFs (brochure, day1, day2) offline
- [x] Android PDF opens via system viewer (WebView PDF is unreliable on Android)
- [x] iOS PDF preview in-app + Share
- [x] `ITSAppUsesNonExemptEncryption: false` (export compliance)
- [x] `NSPrivacyTracking: false` + empty collected data types
- [x] Blocked unused Android permissions (location, camera, mic, contacts, media)
- [x] `allowBackup: false` on Android
- [x] Portrait-only, iPhone-only (no iPad layout required yet)
- [x] Dead Expo template code removed
- [x] Version `1.0.0` / iOS build `1` / Android `versionCode` `1`

## You must complete before submit

### Accounts & identity

- [ ] Apple Developer Program enrollment
- [ ] Google Play Console enrollment
- [ ] Confirm bundle ID / package: `com.icacon.companion` (or change before first release)
- [ ] App signing keys / EAS credentials configured (`eas build`)

### Privacy policy (required by both stores)

Host `docs/privacy.md` on a public HTTPS URL, e.g.:

- `https://www.icaconaligarh.com/app-privacy`  
  or GitHub Pages / a simple static page

Then set that URL in:

- App Store Connect → App Privacy / Privacy Policy URL  
- Play Console → Store listing → Privacy policy  

### Store listings

Use `docs/store-listing.md` for copy. Capture screenshots on:

- iPhone 6.7" (or current required sizes)
- Android phone (and 7"/10" tablet only if you declare tablet support)

### Content review risk

| Item | Status | Note |
|------|--------|------|
| Incomplete Navigate (no indoor map yet) | OK if honest | Screen explains maps + outdoor Maps links |
| Demo / placeholder content | Avoid | Do not ship fake Wi‑Fi passwords or invented rooms |
| Official PDFs | Included | brochure + day1 + day2 |
| Support contact | `icacon2026@gmail.com` | Must respond during review |

### Build commands

```bash
cd icacon-companion-mobile
npx tsc --noEmit
eas build --profile production --platform android   # AAB
eas build --profile production --platform ios       # IPA
```

Preview installs for QA:

```bash
eas build --profile preview --platform android
eas build --profile preview --platform ios
```

### QA before upload (airplane mode + online)

1. Cold start offline — Home, Programme list, Info contacts  
2. Open brochure / Day 1 / Day 2 offline  
3. Tap phone / email offline — dialer / mail open  
4. Website / Register / Maps online — open correctly  
5. Website / Maps offline — friendly “no internet” alert  
6. Tab bar clears home indicator (iPhone)  
7. No crashes on rapid tab switching  

### Play Data safety form

- Data collected: **No**  
- Data shared: **No**  
- Security practices: data encrypted in transit (HTTPS for external links only)

### App Store privacy labels

- Data Not Collected  
- Tracking: No  

## Known non-blockers

- Adaptive icon uses full-bleed mark (acceptable; can refine with transparent logo later)
- Splash image is smaller than icon (contain on brand colour is fine)
- Indoor navigation is deferred — outdoor Maps covers venues for v1
