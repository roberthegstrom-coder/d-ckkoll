# Däckkoll LV

Däckmätning för lastbilar, bussar, släp och maskiner. Appen fungerar utan internet: mätningar sparas i telefonen och skickas till databasen när det finns täckning.

## Installera på Android
1. Öppna appens adress i Chrome.
2. Tryck på menyn (tre prickar) och välj **Installera app** eller **Lägg till på startskärmen**.
3. Öppna appen en gång med internet så att allt sparas i telefonen. Efter det startar den även utan täckning.

## Innehåll
- `index.html` – hela appen
- `sw.js` – gör att appen startar och fungerar offline
- `manifest.webmanifest` – namn och ikon för installationen
- `icons/` – ikonerna (avkodas när sidan publiceras)
- `.github/workflows/pages.yml` – publicerar appen på GitHub Pages vid varje ändring

Data lagras i Supabase och skyddas av inloggning. Nyckeln i `index.html` är en publik nyckel och ger ingen åtkomst till data utan behörigt konto.
