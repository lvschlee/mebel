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
		X,
		BedDouble,
		LayoutGrid,
		UtensilsCrossed,
		Baby,
		ChefHat,
		Briefcase,
		ChevronRight
	} from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { cart } from '$lib/stores/cart.svelte';
	import { favorites } from '$lib/stores/favorites.svelte';
	import { cityStore } from '$lib/stores/city.svelte';
	import { page } from '$app/state';

	let mobileMenuOpen = $state(false);
	let cityModalOpen = $state(false);
	let catalogOpen = $state(false);

	const categories = [
		{ label: 'Распродажа', icon: Tag, href: '/sale' },
		{ label: 'Новинки', icon: Sparkles, href: '/new' },
		{ label: 'Услуги', icon: Wrench, href: '/services' },
		{ label: 'Освещение', icon: Lightbulb, href: '/lighting' },
		{ label: 'Диваны', icon: Sofa, href: '/sofas' }
	];

	const catalogCategories = [
		{
			label: 'Диваны и кресла',
			icon: Sofa,
			href: '/catalog/sofas',
			subcategories: [
				{ label: 'Угловые диваны', href: '/catalog/sofas/corner' },
				{ label: 'Прямые диваны', href: '/catalog/sofas/straight' },
				{ label: 'Диваны-кровати', href: '/catalog/sofas/sofa-beds' },
				{ label: 'Кресла', href: '/catalog/sofas/armchairs' },
				{ label: 'Кресла-кровати', href: '/catalog/sofas/chair-beds' },
				{ label: 'Пуфы и банкетки', href: '/catalog/sofas/poufs' }
			]
		},
		{
			label: 'Кровати и матрасы',
			icon: BedDouble,
			href: '/catalog/beds',
			subcategories: [
				{ label: 'Двуспальные кровати', href: '/catalog/beds/double' },
				{ label: 'Односпальные кровати', href: '/catalog/beds/single' },
				{ label: 'Кровати с подъёмником', href: '/catalog/beds/lift' },
				{ label: 'Матрасы', href: '/catalog/beds/mattresses' },
				{ label: 'Основания', href: '/catalog/beds/bases' },
				{ label: 'Подушки и одеяла', href: '/catalog/beds/bedding' }
			]
		},
		{
			label: 'Шкафы и хранение',
			icon: LayoutGrid,
			href: '/catalog/wardrobes',
			subcategories: [
				{ label: 'Шкафы-купе', href: '/catalog/wardrobes/sliding' },
				{ label: 'Распашные шкафы', href: '/catalog/wardrobes/swing' },
				{ label: 'Комоды', href: '/catalog/wardrobes/dressers' },
				{ label: 'Тумбы', href: '/catalog/wardrobes/cabinets' },
				{ label: 'Полки', href: '/catalog/wardrobes/shelves' },
				{ label: 'Стеллажи', href: '/catalog/wardrobes/racks' }
			]
		},
		{
			label: 'Столы и стулья',
			icon: UtensilsCrossed,
			href: '/catalog/tables',
			subcategories: [
				{ label: 'Обеденные столы', href: '/catalog/tables/dining' },
				{ label: 'Журнальные столики', href: '/catalog/tables/coffee' },
				{ label: 'Стулья', href: '/catalog/tables/chairs' },
				{ label: 'Табуреты', href: '/catalog/tables/stools' },
				{ label: 'Барные стулья', href: '/catalog/tables/bar-stools' },
				{ label: 'Консоли', href: '/catalog/tables/consoles' }
			]
		},
		{
			label: 'Детская мебель',
			icon: Baby,
			href: '/catalog/kids',
			subcategories: [
				{ label: 'Кровати детские', href: '/catalog/kids/beds' },
				{ label: 'Шкафы детские', href: '/catalog/kids/wardrobes' },
				{ label: 'Столы детские', href: '/catalog/kids/desks' },
				{ label: 'Стеллажи детские', href: '/catalog/kids/shelves' },
				{ label: 'Мягкая мебель детская', href: '/catalog/kids/soft' }
			]
		},
		{
			label: 'Кухонная мебель',
			icon: ChefHat,
			href: '/catalog/kitchen',
			subcategories: [
				{ label: 'Кухонные гарнитуры', href: '/catalog/kitchen/sets' },
				{ label: 'Кухонные столы', href: '/catalog/kitchen/tables' },
				{ label: 'Барные стойки', href: '/catalog/kitchen/bars' },
				{ label: 'Пеналы кухонные', href: '/catalog/kitchen/pantry' }
			]
		},
		{
			label: 'Офисная мебель',
			icon: Briefcase,
			href: '/catalog/office',
			subcategories: [
				{ label: 'Компьютерные столы', href: '/catalog/office/desks' },
				{ label: 'Офисные кресла', href: '/catalog/office/chairs' },
				{ label: 'Стеллажи офисные', href: '/catalog/office/racks' },
				{ label: 'Тумбы офисные', href: '/catalog/office/cabinets' }
			]
		},
		{
			label: 'Освещение',
			icon: Lightbulb,
			href: '/catalog/lighting',
			subcategories: [
				{ label: 'Люстры', href: '/catalog/lighting/chandeliers' },
				{ label: 'Бра', href: '/catalog/lighting/sconces' },
				{ label: 'Настольные лампы', href: '/catalog/lighting/desk' },
				{ label: 'Торшеры', href: '/catalog/lighting/floor' },
				{ label: 'Споты', href: '/catalog/lighting/spots' },
				{ label: 'Ночники', href: '/catalog/lighting/night' }
			]
		}
	];

	let hoveredCategory = $state(catalogCategories[0]);
</script>

<header class="sticky top-0 z-50 w-full bg-white border-b border-slate-200">

	<!-- Верхняя панель -->
	<nav aria-label="Вспомогательная навигация" class="hidden md:block bg-slate-50">
		<div class="max-w-7xl mx-auto px-8 flex items-center justify-between py-2">
			<button
				onclick={() => (cityModalOpen = true)}
				class="flex items-center gap-1 text-sm text-slate-500 hover:text-emerald-600 transition-colors cursor-pointer"
				aria-label="Выбрать город"
			>
				<MapPin size={14} />
				<span>{cityStore.selected}</span>
			</button>
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
	<div class="relative w-full">
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
				onclick={() => { catalogOpen = !catalogOpen; hoveredCategory = catalogCategories[0]; }}
				class="hidden md:flex shrink-0 px-4 py-2.5 bg-emerald-600 text-white font-semibold text-sm rounded-full items-center gap-2 hover:bg-emerald-700 transition-colors"
				aria-label="Открыть каталог"
				aria-expanded={catalogOpen}
			>
				{#if catalogOpen}<X size={18} />{:else}<Menu size={18} />{/if}
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

	{#if catalogOpen}
		<!-- backdrop -->
		<div class="fixed inset-0 z-40" onclick={() => (catalogOpen = false)}></div>

		<!-- dropdown каталога -->
		<div class="absolute top-full left-0 right-0 z-50 bg-white [box-shadow:0_8px_24px_-4px_rgb(0,0,0,0.12)] border-b border-slate-200">
			<div class="max-w-7xl mx-auto px-4 md:px-8 flex">
				<!-- Левая колонка: категории -->
				<div class="w-60 bg-white border-r border-slate-100 py-2 shrink-0">
					{#each catalogCategories as cat}
						<button
							onmouseenter={() => (hoveredCategory = cat)}
							onclick={() => { catalogOpen = false; goto(cat.href); }}
							class="w-full text-left px-4 py-2.5 text-sm font-medium flex items-center justify-between gap-2 transition-colors
								{hoveredCategory === cat
									? 'bg-slate-50 text-emerald-600'
									: 'text-slate-700 hover:bg-slate-50'}"
						>
							<span class="flex items-center gap-2.5">
								<cat.icon size={16} />
								{cat.label}
							</span>
							<ChevronRight size={14} class="text-slate-300" />
						</button>
					{/each}
				</div>

				<!-- Правая колонка: подкатегории -->
				<div class="flex-1 p-5">
					<a
						href={hoveredCategory.href}
						onclick={() => (catalogOpen = false)}
						class="block text-base font-bold text-slate-900 hover:text-emerald-600 mb-3 transition-colors"
					>
						{hoveredCategory.label} →
					</a>
					<ul class="grid grid-cols-3 gap-x-6 gap-y-0.5">
						{#each hoveredCategory.subcategories as sub}
							<li>
								<a
									href={sub.href}
									onclick={() => (catalogOpen = false)}
									class="block text-sm text-slate-600 hover:text-emerald-600 py-1.5 transition-colors"
								>
									{sub.label}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	{/if}
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
				<button
					onclick={() => (cityModalOpen = true)}
					class="flex items-center gap-1 text-sm text-slate-500 hover:text-emerald-600 transition-colors"
				>
					<MapPin size={14} />
					<span>{cityStore.selected}</span>
				</button>
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


{#if cityModalOpen}
	<div
		class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
		role="dialog"
		aria-modal="true"
		aria-label="Выбор города"
		onclick={(e) => { if (e.target === e.currentTarget) cityModalOpen = false; }}
	>
		<div class="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
			<div class="flex items-center justify-between mb-4">
				<h2 class="text-lg font-bold text-slate-900">Выберите город</h2>
				<button
					onclick={() => (cityModalOpen = false)}
					class="p-1 text-slate-400 hover:text-slate-600 transition-colors"
					aria-label="Закрыть"
				>
					<X size={20} />
				</button>
			</div>
			<ul class="flex flex-col gap-1">
				{#each cityStore.cities as city}
					<li>
						<button
							onclick={() => { cityStore.selected = city; cityModalOpen = false; }}
							class="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors
								{cityStore.selected === city
									? 'bg-emerald-50 text-emerald-600'
									: 'text-slate-700 hover:bg-slate-100'}"
						>
							{city}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}

</header>
