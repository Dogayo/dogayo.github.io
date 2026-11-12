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

## Дизайн-токены

Цвета и шрифты заданы в `src/styles/global.css` и доступны в Tailwind как `bg-bg`, `bg-surface`, `bg-surface-2`, `border-border`, `text-text`, `text-muted`, `text-accent`, `bg-accent-soft`, `text-on-accent`, `font-sans` (Inter), `font-mono` (JetBrains Mono). Шрифты подключены локально через Fontsource, внешних запросов нет.

Тема по умолчанию берётся из системы (если у системы нет предпочтения — светлая). Явный выбор — атрибут `data-theme="light" | "dark"` на `<html>`.
