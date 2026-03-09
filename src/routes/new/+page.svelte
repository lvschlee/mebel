<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import { ArrowRight, Mail, CheckCircle } from 'lucide-svelte';

	const categoryChips = [
		{ label: 'Все', value: 'all' },
		{ label: 'Диваны', value: 'sofas' },
		{ label: 'Кровати', value: 'beds' },
		{ label: 'Шкафы', value: 'wardrobes' },
		{ label: 'Столы', value: 'tables' },
		{ label: 'Детская', value: 'kids' },
		{ label: 'Кухня', value: 'kitchen' },
		{ label: 'Освещение', value: 'lighting' }
	];

	type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'rating';

	const sortOptions: { label: string; value: SortOption }[] = [
		{ label: 'Сначала новые', value: 'newest' },
		{ label: 'По цене: дешевле', value: 'price_asc' },
		{ label: 'По цене: дороже', value: 'price_desc' },
		{ label: 'По рейтингу', value: 'rating' }
	];

	let activeCategory = $state('all');
	let sortBy = $state<SortOption>('newest');
	let emailInput = $state('');
	let emailSubmitted = $state(false);
	let emailError = $state('');

	type Product = {
		image: string;
		title: string;
		price: string;
		oldPrice: string | null;
		sold: string;
		rating: number;
		reviewsCount: number;
		badge: string;
		category: string;
		dateGroup: 'week' | 'month';
		numericPrice: number;
	};

	const allProducts: Product[] = [
		// --- На этой неделе ---
		{ image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop', title: 'Диван угловой «Верона»', price: '31 990 ₽', oldPrice: null, sold: '48 продано', rating: 5, reviewsCount: 12, badge: 'Новинка', category: 'sofas', dateGroup: 'week', numericPrice: 31990 },
		{ image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=400&fit=crop', title: 'Кровать «Арко» 160×200', price: '42 500 ₽', oldPrice: '49 000 ₽', sold: '31 продано', rating: 4, reviewsCount: 8, badge: 'Новинка', category: 'beds', dateGroup: 'week', numericPrice: 42500 },
		{ image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=400&fit=crop', title: 'Тумба «Нора» прикроватная', price: '5 900 ₽', oldPrice: null, sold: '22 продано', rating: 5, reviewsCount: 6, badge: 'Новинка', category: 'beds', dateGroup: 'week', numericPrice: 5900 },
		{ image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=400&fit=crop', title: 'Стол обеденный «Браво» раздвижной', price: '22 400 ₽', oldPrice: null, sold: '17 продано', rating: 4, reviewsCount: 5, badge: 'Новинка', category: 'tables', dateGroup: 'week', numericPrice: 22400 },
		{ image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop', title: 'Торшер «Дуо» напольный', price: '7 200 ₽', oldPrice: '9 500 ₽', sold: '39 продано', rating: 5, reviewsCount: 9, badge: 'Новинка', category: 'lighting', dateGroup: 'week', numericPrice: 7200 },
		{ image: 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=400&h=400&fit=crop', title: 'Кресло детское «Гном»', price: '4 800 ₽', oldPrice: null, sold: '55 продано', rating: 5, reviewsCount: 14, badge: 'Новинка', category: 'kids', dateGroup: 'week', numericPrice: 4800 },
		{ image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&h=400&fit=crop', title: 'Кухонный гарнитур «Рио» 2.4 м', price: '58 900 ₽', oldPrice: '68 000 ₽', sold: '11 продано', rating: 4, reviewsCount: 4, badge: 'Новинка', category: 'kitchen', dateGroup: 'week', numericPrice: 58900 },
		{ image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', title: 'Шкаф-купе «Прайм» 2-дверный', price: '27 300 ₽', oldPrice: null, sold: '26 продано', rating: 4, reviewsCount: 7, badge: 'Новинка', category: 'wardrobes', dateGroup: 'week', numericPrice: 27300 },

		// --- В прошлом месяце ---
		{ image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=400&h=400&fit=crop', title: 'Кресло «Бланко» велюровое', price: '14 990 ₽', oldPrice: '18 500 ₽', sold: '134 продано', rating: 5, reviewsCount: 38, badge: 'Новинка', category: 'sofas', dateGroup: 'month', numericPrice: 14990 },
		{ image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop', title: 'Диван прямой «Сканди»', price: '19 800 ₽', oldPrice: null, sold: '89 продано', rating: 4, reviewsCount: 21, badge: 'Новинка', category: 'sofas', dateGroup: 'month', numericPrice: 19800 },
		{ image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=400&fit=crop', title: 'Кровать «Флора» 140×200', price: '36 200 ₽', oldPrice: null, sold: '67 продано', rating: 5, reviewsCount: 19, badge: 'Новинка', category: 'beds', dateGroup: 'month', numericPrice: 36200 },
		{ image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop', title: 'Шкаф распашной «Малибу»', price: '33 700 ₽', oldPrice: '39 000 ₽', sold: '102 продано', rating: 4, reviewsCount: 29, badge: 'Новинка', category: 'wardrobes', dateGroup: 'month', numericPrice: 33700 },
		{ image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=400&h=400&fit=crop', title: 'Стеллаж «Куб» открытый', price: '8 400 ₽', oldPrice: null, sold: '211 продано', rating: 5, reviewsCount: 53, badge: 'Новинка', category: 'wardrobes', dateGroup: 'month', numericPrice: 8400 },
		{ image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=400&fit=crop', title: 'Барный стол «Урбан» высокий', price: '11 600 ₽', oldPrice: '13 500 ₽', sold: '78 продано', rating: 4, reviewsCount: 17, badge: 'Новинка', category: 'tables', dateGroup: 'month', numericPrice: 11600 },
		{ image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', title: 'Кухонный остров «Лофт»', price: '44 900 ₽', oldPrice: null, sold: '43 продано', rating: 5, reviewsCount: 11, badge: 'Новинка', category: 'kitchen', dateGroup: 'month', numericPrice: 44900 },
		{ image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop', title: 'Люстра «Рэй» потолочная', price: '9 800 ₽', oldPrice: '12 000 ₽', sold: '156 продано', rating: 5, reviewsCount: 42, badge: 'Новинка', category: 'lighting', dateGroup: 'month', numericPrice: 9800 },
		{ image: 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=400&h=400&fit=crop', title: 'Парта «Рост» детская регулируемая', price: '12 300 ₽', oldPrice: '15 000 ₽', sold: '92 продано', rating: 5, reviewsCount: 26, badge: 'Новинка', category: 'kids', dateGroup: 'month', numericPrice: 12300 },
		{ image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop', title: 'Пуф «Паффи» круглый', price: '3 600 ₽', oldPrice: null, sold: '184 продано', rating: 4, reviewsCount: 48, badge: 'Новинка', category: 'sofas', dateGroup: 'month', numericPrice: 3600 },
		{ image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=400&fit=crop', title: 'Комод «Слим» 4 ящика', price: '7 900 ₽', oldPrice: '9 900 ₽', sold: '207 продано', rating: 4, reviewsCount: 61, badge: 'Новинка', category: 'wardrobes', dateGroup: 'month', numericPrice: 7900 },
		{ image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop', title: 'Детская кровать «Клауд»', price: '18 700 ₽', oldPrice: null, sold: '73 продано', rating: 5, reviewsCount: 20, badge: 'Новинка', category: 'kids', dateGroup: 'month', numericPrice: 18700 },
		{ image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=400&h=400&fit=crop', title: 'Консоль «Линия» узкая', price: '6 500 ₽', oldPrice: '8 200 ₽', sold: '119 продано', rating: 4, reviewsCount: 33, badge: 'Новинка', category: 'tables', dateGroup: 'month', numericPrice: 6500 },
		{ image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop', title: 'Настольная лампа «Арко»', price: '4 100 ₽', oldPrice: null, sold: '243 продано', rating: 5, reviewsCount: 67, badge: 'Новинка', category: 'lighting', dateGroup: 'month', numericPrice: 4100 }
	];

	const filtered = $derived(
		activeCategory === 'all'
			? allProducts
			: allProducts.filter((p) => p.category === activeCategory)
	);

	const sorted = $derived(
		[...filtered].sort((a, b) => {
			if (sortBy === 'price_asc') return a.numericPrice - b.numericPrice;
			if (sortBy === 'price_desc') return b.numericPrice - a.numericPrice;
			if (sortBy === 'rating') return b.rating - a.rating || b.reviewsCount - a.reviewsCount;
			// newest: week first, then month
			if (a.dateGroup === b.dateGroup) return 0;
			return a.dateGroup === 'week' ? -1 : 1;
		})
	);

	// Show time-group dividers only when sorted by newest
	const showGroups = $derived(sortBy === 'newest');

	const weekProducts = $derived(sorted.filter((p) => p.dateGroup === 'week'));
	const monthProducts = $derived(sorted.filter((p) => p.dateGroup === 'month'));

	function submitEmail() {
		emailError = '';
		if (!emailInput.trim()) {
			emailError = 'Введите адрес электронной почты';
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
			emailError = 'Введите корректный адрес электронной почты';
			return;
		}
		emailSubmitted = true;
	}
</script>

<svelte:head>
	<title>Новинки — Мебель Урала</title>
</svelte:head>

<!-- Breadcrumbs -->
<div class="max-w-7xl mx-auto px-4 md:px-8 pt-4">
	<nav class="flex items-center gap-1.5 text-sm text-slate-400">
		<a href="/" class="hover:text-emerald-600 transition-colors">Главная</a>
		<span>/</span>
		<span class="text-slate-700 font-medium">Новинки</span>
	</nav>
</div>

<!-- Hero -->
<section class="max-w-7xl mx-auto px-4 md:px-8 pt-4 pb-4">
	<div class="relative rounded-2xl overflow-hidden h-64 sm:h-80 md:h-96">
		<img
			src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&h=600&fit=crop"
			alt="Новинки весны 2026"
			class="absolute inset-0 w-full h-full object-cover"
		/>
		<div class="absolute inset-0 bg-linear-to-r from-slate-900/75 via-slate-900/40 to-transparent"></div>
		<div class="relative z-10 h-full flex flex-col justify-center px-8 md:px-14 py-8 md:py-10 gap-4 max-w-lg">
			<div class="inline-flex items-center gap-2 bg-white/15 border border-white/30 text-white text-xs font-semibold px-3 py-1 rounded-full self-start backdrop-blur-sm">
				Весна 2026
			</div>
			<h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
				Новинки весенней коллекции
			</h1>
			<p class="text-sm md:text-base text-slate-200 leading-relaxed">
				Свежие поступления каждую неделю — будь первым среди тех, кто обновляет интерьер
			</p>
			<div class="flex items-center gap-4">
				<a
					href="#products"
					class="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-slate-900 font-semibold rounded-full hover:bg-slate-100 transition-colors text-sm"
				>
					Смотреть {allProducts.length} товаров
					<ArrowRight size={15} />
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Sticky chips -->
<div class="sticky top-0 z-20 bg-white">
	<div class="max-w-7xl mx-auto px-4 md:px-8">
		<div class="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none">
			{#each categoryChips as chip}
				<button
					onclick={() => (activeCategory = chip.value)}
					class="flex-1 min-w-max px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap
						{activeCategory === chip.value
						? 'bg-emerald-600 text-white'
						: 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border hover:border-emerald-200'}"
				>
					{chip.label}
				</button>
			{/each}
		</div>
	</div>
</div>

<!-- Products section -->
<section id="products" class="max-w-7xl mx-auto px-4 md:px-8 py-8">
	<!-- Sort bar -->
	<div class="relative z-10 flex items-center justify-between mb-6">
		<p class="text-sm text-slate-500">
			<span class="font-semibold text-slate-800">{sorted.length}</span> новинок
		</p>
		<select
			bind:value={sortBy}
			class="border border-slate-200 rounded-full px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
		>
			{#each sortOptions as opt}
				<option value={opt.value}>{opt.label}</option>
			{/each}
		</select>
	</div>

	<!-- Product grid with time markers -->
	{#if sorted.length === 0}
		<div class="py-24 text-center text-slate-400 text-sm">Нет товаров в этой категории</div>
	{:else if showGroups}
		{#if weekProducts.length > 0}
			<!-- Week group -->
			<div class="flex items-center gap-4 mb-6">
				<div class="h-px flex-1 bg-slate-100"></div>
				<span class="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full whitespace-nowrap">
					На этой неделе · {weekProducts.length} товаров
				</span>
				<div class="h-px flex-1 bg-slate-100"></div>
			</div>
			<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-6 md:gap-y-10 mb-10">
				{#each weekProducts as product}
					<ProductCard {...product} />
				{/each}
			</div>
		{/if}
		{#if monthProducts.length > 0}
			<!-- Month group -->
			<div class="flex items-center gap-4 mb-6">
				<div class="h-px flex-1 bg-slate-100"></div>
				<span class="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full whitespace-nowrap">
					В прошлом месяце · {monthProducts.length} товаров
				</span>
				<div class="h-px flex-1 bg-slate-100"></div>
			</div>
			<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-6 md:gap-y-10">
				{#each monthProducts as product}
					<ProductCard {...product} />
				{/each}
			</div>
		{/if}
	{:else}
		<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-6 md:gap-y-10">
			{#each sorted as product}
				<ProductCard {...product} />
			{/each}
		</div>
	{/if}
</section>

<!-- Email subscription -->
<section class="bg-emerald-600 mt-4">
	<div class="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 flex flex-col md:flex-row items-center gap-6 md:gap-12">
		<div class="flex-1 text-center md:text-left">
			<h2 class="text-xl md:text-2xl font-bold text-white mb-2">
				Первым узнавай о новинках
			</h2>
			<p class="text-emerald-100 text-sm md:text-base">
				Раз в неделю — только свежие поступления. Без спама, только мебель.
			</p>
		</div>
		<div class="w-full md:w-auto md:flex-1 max-w-md">
			{#if emailSubmitted}
				<div class="flex items-center justify-center md:justify-start gap-2 text-white font-medium">
					<CheckCircle size={20} />
					Вы подписаны! Ждите первое письмо.
				</div>
			{:else}
				<form
					onsubmit={(e) => { e.preventDefault(); submitEmail(); }}
					novalidate
					class="flex flex-col gap-2"
				>
				<div class="flex gap-2">
					<div class="flex items-center flex-1 bg-white rounded-full px-4 gap-2 ring-2 {emailError ? 'ring-red-400' : 'ring-transparent focus-within:ring-emerald-400'} transition-colors">
						<input
							type="email"
							bind:value={emailInput}
							oninput={() => emailError = ''}
							placeholder="Ваш email"
							class="flex-1 py-3 bg-transparent text-slate-800 text-sm placeholder:text-slate-400 outline-none ring-0 border-0 appearance-none"
						/>
						<div class="h-4 w-px bg-slate-200 shrink-0"></div>
						<Mail size={16} class="text-slate-400 shrink-0" />
					</div>
					<button
						type="submit"
						class="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-emerald-50 text-emerald-600 font-semibold rounded-full transition-colors text-sm whitespace-nowrap"
					>
						Подписаться
					</button>
				</div>
				{#if emailError}
					<p class="text-white text-xs pl-4">{emailError}</p>
				{/if}
				</form>
			{/if}
		</div>
	</div>
</section>
