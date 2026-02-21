<script lang="ts">
	import { Heart, Eye, ShoppingCart } from 'lucide-svelte';
	import RatingWidget from './RatingWidget.svelte';
	import { cart } from '$lib/stores/cart.svelte';
	import { favorites } from '$lib/stores/favorites.svelte';

	let {
		image,
		title,
		price,
		oldPrice = null,
		sold,
		rating = null,
		reviewsCount = null
	}: {
		image: string;
		title: string;
		price: string;
		oldPrice?: string | null;
		sold: string;
		rating?: number | null;
		reviewsCount?: number | null;
	} = $props();

	// Генерация slug из названия товара
	const slug = $derived(
		title
			.toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/[^\w\-а-яё]/gi, '')
	);

	// Извлечение числового значения цены из строки
	const numericPrice = $derived(parseInt(price.replace(/\D/g, ''), 10));
	const isFavorited = $derived(favorites.has(slug));
</script>

<a href="/product/{slug}" class="block overflow-hidden group cursor-pointer">
	<!-- Изображение с оверлеями -->
	<div class="relative rounded-2xl overflow-hidden">
		<img src={image} alt={title} class="w-full aspect-square object-cover" />
		<!-- Кнопка избранного -->
		<button
			class="absolute top-3 right-3 w-7 h-7 flex items-center justify-center bg-white rounded-full hover:bg-emerald-50 transition-colors shadow-sm"
			aria-label={isFavorited ? 'Убрать из избранного' : 'В избранное'}
			onclick={(e) => {
				e.preventDefault();
				favorites.toggle({ id: slug, name: title, price: numericPrice, image });
			}}
		>
			<Heart size={15} class={isFavorited ? 'text-emerald-600 fill-emerald-600' : 'text-slate-500'} />
		</button>
		<!-- Бейдж "Почти распродано" -->
		<div
			class="absolute top-3 left-3 bg-[#A7F3D0] text-[#065F46] rounded-full px-3 py-1 text-xs font-semibold"
		>
			Почти распродано
		</div>
		<!-- Кнопка быстрого просмотра -->
		<button
			class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-gray-100 transition-all opacity-0 group-hover:opacity-100"
			aria-label="Быстрый просмотр"
			onclick={(e) => e.preventDefault()}
		>
			<Eye size={20} class="text-gray-700" />
		</button>
	</div>
	<!-- Контент карточки -->
	<div class="pt-3 flex flex-col gap-2">
		<h3 class="text-sm font-medium text-gray-800">{title}</h3>
		<div class="flex items-center justify-between">
			<div class="flex items-baseline gap-2">
				<span class="text-base font-semibold text-emerald-600">{price}</span>
				{#if oldPrice}
					<span class="text-sm line-through text-gray-500">{oldPrice}</span>
				{/if}
			</div>
			<span class="text-sm text-gray-500">{sold}</span>
		</div>
		{#if rating}
			<RatingWidget {rating} {reviewsCount} size="sm" showRatingNumber={false} starColor="gray" />
		{/if}
	<button
		class="inline-flex items-center gap-2 px-3 py-1.5 border border-slate-200 text-gray-800 text-[13px] rounded-full hover:bg-gray-50 transition-colors self-start"
		onclick={(e) => {
			e.preventDefault();
			cart.addItem({
				id: slug,
				name: title,
				price: numericPrice,
				image
			}, 1);
		}}
	>
		<ShoppingCart size={14} />
		В корзину
	</button>
	</div>
</a>
