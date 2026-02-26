<script lang="ts">
	import { Heart, Trash2 } from 'lucide-svelte';
	import { favorites } from '$lib/stores/favorites.svelte';
	import { cart } from '$lib/stores/cart.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
</script>

<div class="max-w-7xl mx-auto px-8 py-12">
	<Breadcrumbs items={[
		{ label: 'Главная', href: '/' },
		{ label: 'Избранное', href: '' }
	]} />

	<h1 class="text-2xl font-medium text-slate-900 mb-6">
		Избранное
		{#if favorites.totalItems > 0}
			<span class="text-slate-400 font-normal text-lg">({favorites.totalItems})</span>
		{/if}
	</h1>

	{#if favorites.totalItems === 0}
		<div class="flex flex-col items-center justify-center py-24 gap-4 text-center">
			<Heart size={48} class="text-slate-200" />
			<p class="text-slate-500 text-lg">Здесь пока ничего нет</p>
			<p class="text-slate-400 text-sm">Добавляйте товары в избранное, нажав на иконку сердечка</p>
			<a
				href="/"
				class="mt-2 px-6 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-full hover:bg-emerald-700 transition-colors"
			>
				Перейти в каталог
			</a>
		</div>
	{:else}
		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
			{#each favorites.items as item (item.id)}
				<div class="relative flex flex-col h-full">
					<a href="/product/{item.id}" class="block group flex-1">
						<div class="relative rounded-2xl overflow-hidden aspect-square bg-slate-100">
							<img src={item.image} alt={item.name} class="w-full h-full object-cover" />
						</div>
						<div class="pt-3 flex flex-col gap-1">
							<p class="text-sm font-medium text-slate-800 line-clamp-2">{item.name}</p>
							<p class="text-base font-semibold text-emerald-600">
								{item.price.toLocaleString('ru-RU')} ₽
							</p>
						</div>
					</a>
					<div class="flex gap-2 mt-3">
						<button
							class="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-full hover:bg-emerald-700 transition-colors"
							onclick={() => cart.addItem(item)}
						>
							В корзину
						</button>
						<button
							class="w-9 h-9 shrink-0 flex items-center justify-center border border-slate-200 rounded-full hover:border-red-300 hover:text-red-500 text-slate-400 transition-colors"
							aria-label="Убрать из избранного"
							onclick={() => favorites.remove(item.id)}
						>
							<Trash2 size={15} />
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
