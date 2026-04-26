# Eszköznyilvántartó beadandó projekt

Ez a projekt egy egyszerű eszköznyilvántartó rendszer:
- admin bejelentkezés JWT-vel
- kategória CRUD
- eszköz CRUD
- eszköz kiadás és visszavétel
- keresés és státusz szerinti szűrés

## Backend indítás

```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

A backend alapértelmezett címe: `http://localhost:5000`

## Frontend indítás

```bash
cd frontend
npm install
npm start
```

A frontend alapértelmezett címe: `http://localhost:4200`

## Alap belépési adat

- email: `admin@admin.hu`
- jelszó: `admin123`

## Fontos megjegyzés

Igény szerint tovább bővíthető:
- felhasználókezeléssel
- dashboard statisztikákkal
- export funkcióval
- részletes naplózással
