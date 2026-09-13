# Ca sa fie live pe internet, cu bani reali

Codul e gata. Ce a mai rămas sunt conturi reale — lucruri pe care doar tu le
poți face, pentru că țin de identitatea ta și de banii tăi. Estimare: 30-45
minute în total, majoritatea timpul de așteptare la verificări automate.

## 1. Domeniul (5 min)
Cumpără `ajut.ro` (sau ce nume alegi) de la un registrar (ex: RoTLD prin orice
registrator acreditat, sau Namecheap/GoDaddy dacă mergi pe .com).

## 2. Baza de date de producție (5 min)
- Creează cont gratuit pe [supabase.com](https://supabase.com) sau
  [railway.app](https://railway.app)
- Creează un proiect Postgres nou
- Copiază `DATABASE_URL`-ul (connection string)
- În `prisma/schema.prisma`, schimbă `provider = "sqlite"` în `"postgresql"`

## 3. Contul Stripe (10-15 min, necesită date reale de firmă/PFA)
- Creează cont pe [dashboard.stripe.com](https://dashboard.stripe.com)
- Activează contul cu datele firmei/PFA (Stripe cere verificare de identitate
  și cont bancar — asta nu poate fi automatizat, e cerință legală)
- Din Dashboard → Developers → API keys, copiază `STRIPE_SECRET_KEY`
- Din Dashboard → Developers → Webhooks, adaugă un endpoint:
  `https://ajut.ro/api/webhooks/stripe`, eveniment `checkout.session.completed`
  → copiază `STRIPE_WEBHOOK_SECRET`
- **Pas ulterior, nu blocant pentru lansare**: activează Stripe Connect ca
  să poți transfera automat banii către prestatori (momentan payout-ul e
  calculat corect dar trimis manual — codul are un TODO exact unde intervine
  transferul automat, în `app/api/bookings/[id]/complete/route.ts`)

## 4. Hosting (5 min)
- Creează cont pe [vercel.com](https://vercel.com) (gratuit pentru început)
- Import proiectul (dacă îl urci pe GitHub) sau rulează `vercel` din terminal
  în folderul `ajut-nextjs`
- În Vercel → Settings → Environment Variables, adaugă:
  - `DATABASE_URL` (de la Supabase/Railway)
  - `ADMIN_PASSWORD` (alege o parolă puternică)
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
- Conectează domeniul `ajut.ro` din Vercel → Settings → Domains

## 5. Prima migrare pe baza de date reală (2 min)
Din terminal, cu `DATABASE_URL` de producție în `.env`:
```bash
npx prisma migrate deploy
npm run seed
```

## 6. Testează tot fluxul o dată, cu bani reali mici
- Creează o cerere de test ca și client
- Acceptă-o cu contul de prestator (folosește cardul de test Stripe
  `4242 4242 4242 4242` întâi, apoi un card real pentru un test final)
- Confirmă finalizarea și verifică în Stripe Dashboard că banii au fost
  încasați și comisionul calculat corect

## Ce mai poți adăuga după lansare (nu blochează go-live)
- Notificări reale prin email/SMS (SendGrid + un provider SMS românesc) —
  punctul de integrare e marcat cu `TODO` în `lib/matching.ts`
- Transfer automat către prestatori via Stripe Connect
- Autentificare mai robustă (parolă/OTP pentru prestatori, nu doar email)
- Pagini SEO per oraș/serviciu (`/servicii/curatenie-arad`, etc.)
