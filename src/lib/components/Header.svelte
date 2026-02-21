<script lang="ts">
	import {
		MapPin,
		Search,
		Heart,
		ShoppingCart,
		Tag,
		Sparkles,
		Wrench,
		Lightbulb,
		Sofa,
		Menu,
		X
	} from 'lucide-svelte';
	import { cart } from '$lib/stores/cart.svelte';
	import { favorites } from '$lib/stores/favorites.svelte';
	import { page } from '$app/state';

	let mobileMenuOpen = $state(false);

	const categories = [
		{ label: 'Распродажа', icon: Tag, href: '/sale' },
		{ label: 'Новинки', icon: Sparkles, href: '/new' },
		{ label: 'Услуги', icon: Wrench, href: '/services' },
		{ label: 'Освещение', icon: Lightbulb, href: '/lighting' },
		{ label: 'Диваны', icon: Sofa, href: '/sofas' }
	];
</script>

<header class="sticky top-0 z-50 w-full bg-white border-b border-slate-200">

	<!-- Верхняя панель -->
	<nav aria-label="Вспомогательная навигация" class="hidden md:block bg-slate-50">
		<div class="max-w-7xl mx-auto px-8 flex items-center justify-between py-2">
			<div class="flex items-center gap-1 text-sm text-slate-500">
				<MapPin size={14} />
				<span>Челябинск</span>
			</div>
			<div class="flex items-center gap-4">
				<button class="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
					Разместить объявление
				</button>
				<a
					href="/login"
					class="px-4 py-1.5 text-sm font-semibold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-colors"
				>
					Войти
				</a>
			</div>
		</div>
	</nav>

	<!-- Основная навигация -->
	<div class="max-w-7xl mx-auto px-4 md:px-8 flex items-center gap-3 md:gap-4 py-3 md:py-4">

		<!-- Логотип -->
		<a href="/" class="flex items-center gap-2 shrink-0">
			<Sofa size={26} class="text-emerald-600" />
			<span class="text-base md:text-lg font-bold text-slate-900 whitespace-nowrap">Мебель Урала</span>
		</a>

		<!-- Поиск + каталог (скрыт на мобайле без меню) -->
		<div class="flex-1 flex items-center gap-3 min-w-0">
			<!-- Кнопка Каталог (только desktop) -->
			<button
				class="hidden md:flex shrink-0 px-4 py-2.5 bg-emerald-600 text-white font-semibold text-sm rounded-full items-center gap-2 hover:bg-emerald-700 transition-colors"
				aria-label="Открыть каталог"
			>
				<Menu size={18} />
				Каталог
			</button>

			<!-- Поисковый блок -->
			<div class="flex-1 flex items-center border border-gray-200 rounded-full focus-within:ring-2 focus-within:ring-emerald-500 transition-shadow min-w-0 pl-4 pr-1 py-1">
				<input
					type="search"
					placeholder="Диван, шкаф, кресло..."
					class="flex-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 border-0 bg-transparent min-w-0 py-0 px-0"
				/>
				<button
					class="shrink-0 w-10 h-8 bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center rounded-full transition-colors"
					aria-label="Найти"
				>
					<Search size={16} />
				</button>
			</div>
		</div>

		<!-- Действия -->
		<div class="flex items-center gap-1 md:gap-4 shrink-0">
			<!-- Избранное -->
			<a
				href="/favorites"
				class="flex flex-col items-center gap-0.5 text-slate-600 hover:text-emerald-600 transition-colors p-1"
				aria-label="Избранное{favorites.totalItems > 0 ? `: ${favorites.totalItems} товаров` : ''}"
			>
				<div class="relative">
					<Heart size={22} />
					{#if favorites.totalItems > 0}
						<span
							class="absolute -top-2 -right-2 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
							aria-hidden="true"
						>
							{favorites.totalItems}
						</span>
					{/if}
				</div>
				<span class="hidden md:block text-xs font-medium">Избранное</span>
			</a>

			<!-- Корзина -->
			<a
				href="/cart"
				class="flex flex-col items-center gap-0.5 text-slate-600 hover:text-emerald-600 transition-colors p-1"
				aria-label="Корзина{cart.totalItems > 0 ? `: ${cart.totalItems} товаров` : ''}"
			>
				<div class="relative">
					<ShoppingCart size={22} />
					{#if cart.totalItems > 0}
						<span
							class="absolute -top-2 -right-2 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
							aria-hidden="true"
						>
							{cart.totalItems}
						</span>
					{/if}
				</div>
				<span class="hidden md:block text-xs font-medium">Корзина</span>
			</a>

			<!-- Мобильное меню -->
			<button
				class="md:hidden p-2 text-slate-600 hover:text-emerald-600 transition-colors"
				aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
			>
				{#if mobileMenuOpen}
					<X size={22} />
				{:else}
					<Menu size={22} />
				{/if}
			</button>
		</div>
	</div>

	<!-- Категории (desktop) -->
	<nav aria-label="Категории" class="hidden md:block">
		<div class="max-w-7xl mx-auto px-8 flex items-center gap-1 py-2">
			{#each categories as cat}
				{@const isActive = page.url.pathname === cat.href}
				<a
					href={cat.href}
					class="px-4 py-1.5 font-semibold text-sm rounded-full flex items-center gap-1.5 transition-colors
						{isActive
							? 'text-emerald-600 bg-emerald-50'
							: 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'}"
					aria-current={isActive ? 'page' : undefined}
				>
					<cat.icon size={14} />
					{cat.label}
				</a>
			{/each}
		</div>
	</nav>

	<!-- Мобильное меню (выпадает) -->
	{#if mobileMenuOpen}
		<div class="md:hidden border-t border-slate-100 bg-white px-4 py-4 flex flex-col gap-4">
			<button
				class="w-full px-4 py-2.5 bg-emerald-600 text-white font-semibold text-sm rounded-full flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors"
			>
				<Menu size={18} />
				Каталог
			</button>

			<nav aria-label="Категории мобайл" class="flex flex-col gap-1">
				{#each categories as cat}
					{@const isActive = page.url.pathname === cat.href}
					<a
						href={cat.href}
						class="px-4 py-2.5 font-semibold text-sm rounded-xl flex items-center gap-2 transition-colors
							{isActive
								? 'text-emerald-600 bg-emerald-50'
								: 'text-slate-700 hover:bg-slate-100'}"
						onclick={() => (mobileMenuOpen = false)}
					>
						<cat.icon size={16} />
						{cat.label}
					</a>
				{/each}
			</nav>

			<div class="flex flex-col gap-2 pt-2 border-t border-slate-100">
				<div class="flex items-center gap-1 text-sm text-slate-500">
					<MapPin size={14} />
					<span>Челябинск</span>
				</div>
				<a
					href="/login"
					class="w-full px-4 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-full text-center hover:bg-emerald-700 transition-colors"
				>
					Войти
				</a>
				<button class="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors py-1">
					Разместить объявление
				</button>
			</div>
		</div>
	{/if}

</header>
