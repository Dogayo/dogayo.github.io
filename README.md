# dogayo.github.io

Сайт-портфолио на Astro + TypeScript (strict) + Tailwind CSS.

Нужен Node.js 22.23.4 или новее.

```bash
npm install
npm run dev     # локальный сервер на http://localhost:4321
npm run check   # проверка типов
npm run build   # сборка в dist/
```

Сайт собирается и публикуется на GitHub Pages через GitHub Actions (`.github/workflows/deploy.yml`) при каждом пуше в `main`. На pull request запускаются `astro check` и сборка.

Прошлая версия сайта на Flutter Web лежит в теге `flutter-version`.
