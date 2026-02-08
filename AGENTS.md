You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

## Available MCP Tools:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.

# Иконки

Для иконок в проекте всегда используй lucide-svelte

# Технологический стек

- **SvelteKit + Svelte 5**: runes `$props()`, `{@render children()}`
- **TypeScript**: обязателен для type-safety
- **Tailwind CSS v4**: CSS-based config (`@import 'tailwindcss'`, `@plugin`, `@theme`)
- **Inter шрифт**: Google Fonts (подключен в `src/routes/layout.css`)
- **lucide-svelte**: иконки из Lucide Icons

# Структура проекта

- **Компоненты**: `src/lib/components/` (Header.svelte, Footer.svelte)
- **Глобальные стили**: `src/routes/layout.css`
- **Лейаут приложения**: `src/routes/+layout.svelte`
- **Макеты страниц**: `src/routes/[page].svelte`

# Соглашения по коду

## Контейнеры и лейауты

- Основной контейнер: `max-w-[1280px] mx-auto px-8`
- Флекс-лейаут: `flex items-center justify-between`
- Отступы между элементами: `gap-2.5`, `gap-3`, `gap-4`, `gap-8`

## Иконки

- Используй `lucide-svelte` компоненты (не inline SVG)
- Размеры: 16px для малых (категории, ссылки), 24px для больших (в навигации)
- Цвет наследуется через `currentColor` или явно указывай класс (например, `text-slate-600`)

## Интерактивность

- Hover-эффекты: `hover:text-emerald-600 hover:bg-emerald-50 transition-colors`
- Кнопки: `rounded-full` для пилюль, `rounded-3xl` для основных
- Используй `transition-colors` для плавных переходов

## Семантический HTML

- `<header>`, `<footer>`, `<nav>` для структурных элементов
- `<a>` для ссылок, `<button>` для кнопок
- `aria-label` для кнопок без текста (поиск, фильтры и т.д.)

## Svelte компоненты

- Используй Svelte 5 `$props()` вместо `export let`
- Проверяй код через `svelte-autofixer` перед отправкой
- Предпочитай чистую верстку (без скриптов) для статических компонентов

# Дизайн-токены

## Цветовая палитра

| Использование | Класс Tailwind | Hex | Применение |
|---|---|---|---|
| Основной цвет | `emerald-600` | #059669 | Кнопки, активные элементы, hover-эффекты |
| Заголовки | `gray-800` | #1f2937 | Заголовки секций, названия категорий |
| Текст ссылок | `gray-700` | #374151 | Ссылки в навигации, footer-ссылки |
| Вспомогательный текст | `gray-500` | #6b7280 | Копирайт, placeholder, подсказки |
| Границы | `slate-200` | #e2e8f0 | Разделители, обводки |
| Фон | `white` / `bg-white` | #ffffff | Основной фон компонентов |

## Типография

- **Шрифт**: Inter (Google Fonts, weights: 400, 500, 600, 700)
- **Заголовки**: `text-sm font-semibold` (14px, weight 600)
- **Основной текст**: `text-sm font-medium` (14px, weight 500)
- **Ссылки**: `text-sm font-semibold` (14px, weight 600)

## Spacings

- `gap-1`: 4px
- `gap-2.5`: 10px
- `gap-3`: 12px
- `gap-4`: 16px
- `gap-8`: 32px
- `py-2`: 8px (вертикальный padding)
- `py-3`: 12px
- `py-4`: 16px
- `px-8`: 32px (горизонтальный padding)

# Дизайн-материалы

Основной файл дизайна для сверки:
https://www.figma.com/design/jidkCIFqWszeLS0nk67XNc/Агрегатор-"Мебель-Урала"