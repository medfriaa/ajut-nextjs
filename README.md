# Ajut.ro — aplicație reală (Next.js + Prisma)

Acesta e codul real din spatele prototipului: pagini Next.js conectate la o
bază de date reală, API routes, motor de matching și calcul de comision care
citește din setările din admin — nu din cod.

## Rulare locală (durează ~3 minute)

Ai nevoie de [Node.js](https://nodejs.org) 18+ instalat.

```bash
cd ajut-nextjs
npm install
cp .env.example .env
npx prisma migrate dev --name init
npm run seed
npm run dev
```

Apoi deschide `http://localhost:3000`.

Baza de date e SQLite local (`prisma/dev.db`) — nu ai nevoie de niciun cont
sau server extern ca să testezi totul: homepage, cererea de serviciu în 6
pași, dashboard client, dashboard prestator, panou admin cu comision
configurabil.

## Ce e real aici (spre deosebire de prototipul HTML)

- Datele chiar se salvează într-o bază de date (Prisma + SQLite/Postgres)
- Matching-ul (`lib/matching.ts`) rulează efectiv o interogare pe categorie +
  oraș + zonă + rating, nu date simulate
- Comisionul (`lib/commission.ts`) se citește din tabela `PlatformSettings`
  la fiecare finalizare de job — schimbă-l din `/admin` și vezi efectul real
  la următoarea lucrare finalizată
- API routes reale sub `app/api/*` — poți chiar să le testezi cu `curl` sau Postman

## Ce lipsește intenționat din acest MVP (pași următori)

1. **Autentificare** — momentan dashboard-urile nu sunt protejate de login.
   Adaugă NextAuth (email/telefon OTP) și leagă `customerId`/`providerId` de
   sesiune în loc de "primul din DB".
2. **Plăți reale** — `Payment` e creat cu status `HELD` dar nu există încă
   integrare Stripe Connect care să rețină/elibereze bani reali.
3. **Notificări reale** — `lib/matching.ts` are un `TODO` unde ar trebui
   trimis email/SMS/push către prestatorii potriviți.
4. **Postgres pentru producție** — schimbă `provider = "sqlite"` în
   `prisma/schema.prisma` în `"postgresql"`, actualizează `DATABASE_URL`,
   rulează din nou `prisma migrate dev`.
5. **Mesagerie internă și recenzii** — schema din `prisma/schema.prisma`
   (`Message`, `Review`) există, dar paginile pentru ele nu sunt încă
   construite (erau doar simulate în prototipul HTML).

## Deploy

Cel mai simplu: [Vercel](https://vercel.com) pentru cod + [Supabase](https://supabase.com)
sau [Railway](https://railway.app) pentru Postgres. Conectezi `DATABASE_URL`-ul
de producție ca variabilă de mediu în Vercel și rulezi `prisma migrate deploy`
în pipeline-ul de build.
