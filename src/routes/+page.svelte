<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import SidebarFilter from '$lib/components/SidebarFilter.svelte';
	import { Filter, X } from 'lucide-svelte';

	let filterOpen = $state(false);

	const products = [
		{ image: 'https://mebel74.com/images/small/stol-mory-ms-16-2-yny-75359-1.jpg', title: 'Диван угловой', price: '24 990 ₽', oldPrice: '32 000 ₽', sold: '2k+ продано', rating: 4, reviewsCount: 590 },
		{ image: 'https://mebel74.com/images/small/stol-mory-ms-16-2-yny-75359-1.jpg', title: 'Диван угловой', price: '24 990 ₽', oldPrice: '32 000 ₽', sold: '2k+ продано', rating: 4, reviewsCount: 590 },
		{ image: 'https://mebel74.com/images/small/stol-mory-ms-16-2-yny-75359-1.jpg', title: 'Диван угловой', price: '24 990 ₽', oldPrice: '32 000 ₽', sold: '2k+ продано', rating: 4, reviewsCount: 590 },
		{ image: 'https://mebel74.com/images/small/stol-mory-ms-16-2-yny-75359-1.jpg', title: 'Диван угловой', price: '24 990 ₽', oldPrice: '32 000 ₽', sold: '2k+ продано', rating: 4, reviewsCount: 590 },
		{ image: 'https://mebel74.com/images/small/stol-mory-ms-16-2-yny-75359-1.jpg', title: 'Диван угловой', price: '24 990 ₽', oldPrice: '32 000 ₽', sold: '2k+ продано', rating: 4, reviewsCount: 590 },
		{ image: 'https://mebel74.com/images/small/stol-mory-ms-16-2-yny-75359-1.jpg', title: 'Диван угловой', price: '24 990 ₽', oldPrice: '32 000 ₽', sold: '2k+ продано', rating: 4, reviewsCount: 590 },
		{ image: 'https://mebel74.com/images/small/stol-mory-ms-16-2-yny-75359-1.jpg', title: 'Диван угловой', price: '24 990 ₽', oldPrice: '32 000 ₽', sold: '2k+ продано', rating: 4, reviewsCount: 590 },
		{ image: 'https://mebel74.com/images/small/stol-mory-ms-16-2-yny-75359-1.jpg', title: 'Диван угловой', price: '24 990 ₽', oldPrice: '32 000 ₽', sold: '2k+ продано', rating: 4, reviewsCount: 590 },
		{ image: 'https://mebel74.com/images/small/stol-mory-ms-16-2-yny-75359-1.jpg', title: 'Диван угловой', price: '24 990 ₽', oldPrice: '32 000 ₽', sold: '2k+ продано', rating: 4, reviewsCount: 590 },
		{ image: 'https://mebel74.com/images/small/stol-mory-ms-16-2-yny-75359-1.jpg', title: 'Диван угловой', price: '24 990 ₽', oldPrice: '32 000 ₽', sold: '2k+ продано', rating: 4, reviewsCount: 590 },
		{ image: 'https://mebel74.com/images/small/stol-mory-ms-16-2-yny-75359-1.jpg', title: 'Диван угловой', price: '24 990 ₽', oldPrice: '32 000 ₽', sold: '2k+ продано', rating: 4, reviewsCount: 590 },
		{ image: 'https://mebel74.com/images/small/stol-mory-ms-16-2-yny-75359-1.jpg', title: 'Диван угловой', price: '24 990 ₽', oldPrice: '32 000 ₽', sold: '2k+ продано', rating: 4, reviewsCount: 590 },
	];

	const PAGE_SIZE = 6;
	let visibleCount = $state(PAGE_SIZE);
	const visibleProducts = $derived(products.slice(0, visibleCount));
	const hasMore = $derived(visibleCount < products.length);
</script>

<div class="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
	<!-- Заголовок -->
	<h2 class="text-xl md:text-2xl font-bold text-gray-800 mb-4">Популярные товары</h2>

	<!-- Controls -->
	<div class="flex items-center justify-between mb-6 md:mb-8">
		<!-- Кнопка фильтров (мобайл/планшет) -->
		<button
			onclick={() => (filterOpen = true)}
			class="lg:hidden flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
		>
			<Filter size={15} />
			Фильтры
		</button>
		<select class="border border-slate-200 rounded-full px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
			<option value="">Сортировать по</option>
			<option value="popular">Популярности</option>
			<option value="price_asc">Цене: по возрастанию</option>
			<option value="price_desc">Цене: по убыванию</option>
			<option value="rating">Рейтингу</option>
			<option value="new">Новинкам</option>
		</select>
	</div>

	<!-- Мобильный drawer с фильтрами -->
	{#if filterOpen}
		<div class="fixed inset-0 z-50 lg:hidden" role="presentation">
			<button
				class="absolute inset-0 bg-black/40"
				onclick={() => (filterOpen = false)}
				aria-label="Закрыть фильтры"
				type="button"
			></button>
			<div
				role="dialog"
				aria-modal="true"
				aria-label="Фильтры"
				class="absolute inset-y-0 left-0 w-80 bg-white overflow-y-auto"
			>
				<div class="flex items-center justify-between px-4 py-3 border-b border-slate-200">
					<span class="text-base font-semibold text-gray-800">Фильтры</span>
					<button
						onclick={() => (filterOpen = false)}
						class="p-1 text-slate-400 hover:text-slate-600 transition-colors"
						aria-label="Закрыть"
						type="button"
					>
						<X size={20} />
					</button>
				</div>
				<div class="px-4">
					<SidebarFilter />
				</div>
			</div>
		</div>
	{/if}

	<!-- Основной layout -->
	<div class="flex gap-8">
		<!-- Сайдбар: только desktop -->
		<div class="hidden lg:flex flex-col w-65 shrink-0">
			<div class="border-r border-gray-200 pr-8 flex-1">
				<SidebarFilter />
			</div>
		</div>

		<!-- Сетка товаров -->
		<div class="flex-1 min-w-0">
			<div class="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-6 md:gap-x-6 md:gap-y-12">
				{#each visibleProducts as product}
					<ProductCard {...product} />
				{/each}
			</div>

			{#if hasMore}
				<div class="mt-10 flex justify-center">
					<button
						onclick={() => (visibleCount += PAGE_SIZE)}
						class="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-sm font-medium transition-colors"
					>
						Показать ещё ({products.length - visibleCount})
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>
