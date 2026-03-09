<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { Search } from 'lucide-svelte';

  let searchQuery = $state('');

  function handleSearch(e: SubmitEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      goto(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      goto('/catalog');
    }
  }
</script>

<svelte:head>
  <title>{page.status} — Мебель</title>
</svelte:head>

<main class="min-h-[70vh] flex items-center justify-center px-4 py-12">
  <div class="max-w-lg w-full text-center space-y-9">

    <!-- 404 with sofa SVG between digits -->
    <div class="flex items-center justify-center gap-6 sm:gap-12 select-none" aria-hidden="true">
      <span class="text-[120px] sm:text-[160px] md:text-[180px] font-bold text-slate-100 leading-none">4</span>

      <!-- Sofa SVG -->
      <svg
        width="130"
        height="100"
        viewBox="0 0 160 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="shrink-0 text-emerald-600 sm:w-37.5 sm:h-28.75"
      >
        <!-- sofa body -->
        <rect x="20" y="50" width="120" height="50" rx="8" fill="currentColor" opacity="0.15"/>
        <rect x="20" y="50" width="120" height="50" rx="8" stroke="currentColor" stroke-width="2.5"/>
        <!-- back cushion -->
        <rect x="20" y="28" width="120" height="28" rx="8" fill="currentColor" opacity="0.10"/>
        <rect x="20" y="28" width="120" height="28" rx="8" stroke="currentColor" stroke-width="2.5"/>
        <!-- left armrest -->
        <rect x="10" y="38" width="18" height="46" rx="6" fill="currentColor" opacity="0.12"/>
        <rect x="10" y="38" width="18" height="46" rx="6" stroke="currentColor" stroke-width="2.5"/>
        <!-- right armrest -->
        <rect x="132" y="38" width="18" height="46" rx="6" fill="currentColor" opacity="0.12"/>
        <rect x="132" y="38" width="18" height="46" rx="6" stroke="currentColor" stroke-width="2.5"/>
        <!-- legs -->
        <line x1="32" y1="100" x2="32" y2="114" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="128" y1="100" x2="128" y2="114" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <!-- cushion divider -->
        <line x1="80" y1="52" x2="80" y2="98" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3" opacity="0.5"/>
      </svg>

      <span class="text-[120px] sm:text-[160px] md:text-[180px] font-bold text-slate-100 leading-none">4</span>
    </div>

    <!-- Heading -->
    <div class="space-y-3">
      <h1 class="text-2xl md:text-3xl font-semibold text-slate-800">
        Страница не найдена
      </h1>
      <p class="text-base text-slate-500 leading-relaxed">
        Кажется, эта мебель переехала на новое место.<br class="hidden sm:block"/>
        Поищем вместе?
      </p>
    </div>

    <!-- CTA buttons -->
    <div class="flex flex-col sm:flex-row items-center justify-center gap-12">
      <a
        href="/"
        class="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-medium
               px-6 py-3 rounded-full transition-colors text-center"
      >
        На главную
      </a>
      <a
        href="/catalog"
        class="w-full sm:w-auto border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium
               px-6 py-3 rounded-full transition-colors text-center"
      >
        В каталог
      </a>
    </div>

    <!-- Divider -->
    <div class="flex items-center gap-3">
      <div class="flex-1 h-px bg-slate-100"></div>
      <span class="text-sm text-slate-400 whitespace-nowrap">или попробуйте поиск</span>
      <div class="flex-1 h-px bg-slate-100"></div>
    </div>

    <!-- Search -->
    <form onsubmit={handleSearch} class="flex items-center border border-gray-200 rounded-full focus-within:ring-2 focus-within:ring-emerald-500 transition-shadow pl-4 pr-1 py-1">
      <input
        type="search"
        placeholder="Диван, шкаф, кресло..."
        bind:value={searchQuery}
        class="flex-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 border-0 bg-transparent min-w-0 py-0 px-0"
      />
      <button
        type="submit"
        class="shrink-0 w-10 h-8 bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center rounded-full transition-colors"
        aria-label="Найти"
      >
        <Search size={16} />
      </button>
    </form>

  </div>
</main>
