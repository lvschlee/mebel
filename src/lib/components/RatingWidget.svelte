<script lang="ts">
	import { Star } from 'lucide-svelte';

	let {
		rating,
		reviewsCount = null,
		size = 'md',
		showRatingNumber = true,
		starColor = 'yellow'
	}: {
		rating: number;
		reviewsCount?: number | null;
		size?: 'sm' | 'md' | 'lg';
		showRatingNumber?: boolean;
		starColor?: 'yellow' | 'gray';
	} = $props();

	// Определяем размер звезды в зависимости от size
	const starSize = $derived(size === 'sm' ? 16 : size === 'md' ? 20 : 24);

	// Определяем классы для звезд в зависимости от цвета
	const filledStarClass = $derived(starColor === 'yellow'
		? 'fill-yellow-400 text-yellow-400'
		: 'fill-gray-800 text-gray-800');

	const emptyStarClass = $derived(starColor === 'yellow'
		? 'fill-gray-200 text-gray-200'
		: 'text-gray-800');
</script>

<div class="flex items-center gap-3">
	<!-- Звезды -->
	<div class="flex items-center gap-1">
		{#each Array(5) as _, index (index)}
			<Star
				size={starSize}
				class={index < Math.floor(rating) ? filledStarClass : emptyStarClass}
			/>
		{/each}
	</div>

	<!-- Числовая оценка -->
	{#if showRatingNumber}
		<span class="text-lg font-semibold text-gray-800">{rating}</span>
	{/if}

	<!-- Количество отзывов -->
	{#if reviewsCount}
		<span class="text-sm text-gray-600">({reviewsCount} отзывов)</span>
	{/if}
</div>
