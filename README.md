# Eszköznyilvántartó – Beadandó Projekt

Egy egyszerű webalapú eszköznyilvántartó rendszer, amely lehetővé teszi az eszközök kezelését, kiadását és visszavételét adminisztrátori felületen keresztül.

---

## Funkciók

- Admin bejelentkezés JWT-alapú hitelesítéssel
- Kategória CRUD (létrehozás, olvasás, módosítás, törlés)
- Eszköz CRUD
- Eszköz kiadás és visszavétel kezelése
- Keresés és státusz szerinti szűrés

---

## Használt technológiák

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- JWT – hitelesítéshez

### Frontend
- [Angular](https://angular.io/)
- TypeScript
- HTML + CSS

---

## Telepítés és indítás

### 1. MongoDB indítása

Győződj meg róla, hogy a MongoDB szerver fut, mielőtt elindítod az alkalmazást.

**Windows (Szolgáltatásként):**
1. Nyomd meg a `Win + R` billentyűkombinációt
2. Írd be: `services.msc`
3. Keresd meg a **MongoDB** szolgáltatást, és indítsd el

**MongoDB Compass használata:**

Nyomd meg a piros kerettel jelzett **„Add new connection"** gombot:

![MongoDB Compass - Add new connection](https://github.com/user-attachments/assets/cf707e95-82bc-410c-aeea-29ae7e73727d)

URL-nek add meg az alábbi címet, majd kattints a **„Save & Connect"** gombra:

![MongoDB Compass - Connection URL](https://github.com/user-attachments/assets/81b17d69-fa88-4d10-b9f3-73ed2588f468)

```
mongodb://localhost:27017
```

---

### 2. Backend indítása

Nyisd meg a projektet VS Code-ban, majd a bal felső sarokban kattints a **Terminal** menüre, és válaszd a **„New Terminal"** opciót:

![VS Code - New Terminal](https://github.com/user-attachments/assets/c97b82f8-162d-4a6d-b761-f56ba420e95d)

A megnyílt terminálba másold be az alábbi parancsokat:

![Backend terminal](https://github.com/user-attachments/assets/942cb294-0a4f-4c33-bc2f-a3318c659a1e)

```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

> Alapértelmezett cím: `http://localhost:5000`

---

### 3. Frontend indítása

Szintén nyiss egy **új terminált** (Terminal → New Terminal):

![VS Code - New Terminal](https://github.com/user-attachments/assets/c97b82f8-162d-4a6d-b761-f56ba420e95d)

Majd másold be az alábbi parancsokat:

![Frontend terminal](https://github.com/user-attachments/assets/942cb294-0a4f-4c33-bc2f-a3318c659a1e)

```bash
cd frontend
npm install
npm start
```

> Alapértelmezett cím: `http://localhost:4200`

---

## Bejelentkezési adatok

| Mező   | Érték          |
|--------|----------------|
| Email  | admin@admin.hu |
| Jelszó | admin123       |

---

## Projekt felépítése

```
projekt/
├── backend/
│   ├── models/        # Adatbázis sémák
│   ├── controllers/   # Üzleti logika
│   ├── routes/        # API végpontok
│   └── middleware/    # Hitelesítés
│
└── frontend/
    ├── components/    # UI elemek
    ├── services/      # Backend hívások
    └── models/        # Adatszerkezetek
```

---

## Működés röviden

```
Frontend  →  HTTP kérés  →  Backend API  →  MongoDB
                                ↓
Frontend  ←  Válasz      ←  Feldolgozás  ←  Adatok
```

A frontend HTTP kéréseket küld a backend REST API-nak. A backend feldolgozza a kérést, kommunikál a MongoDB adatbázissal, majd visszaküldi az eredményt, amelyet a frontend megjelenít.

---

## Fontos megjegyzések

- A `node_modules` mappa automatikusan generálódik az `npm install` futtatásakor – nem szükséges verziókövetni
- A backend és a frontend **külön terminálban** fusson
- A MongoDB szervernek **futnia kell** az alkalmazás indítása előtt
- PowerShell használata esetén szükség lehet az `npm.cmd` parancsra az `npm` helyett

---

## Továbbfejlesztési lehetőségek

- Felhasználókezelés (regisztráció, több szerepkör)
- Dashboard és statisztikák
- Export funkció (PDF / CSV)
- Részletes naplózás (audit log)
- Szerepkör alapú jogosultságkezelés (RBAC)
