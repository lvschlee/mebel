<script lang="ts">
	import { Trash2, Plus, Minus, ShoppingBag, ChevronLeft, ChevronRight, ShieldCheck, RotateCcw, BadgeCheck } from 'lucide-svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { cart } from '$lib/stores/cart.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';

	// Вычисление итоговой суммы
	const total = $derived(
		cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
	);

	function incrementQuantity(id: string) {
		const item = cart.items.find((i) => i.id === id);
		if (item) {
			item.quantity += 1;
		}
	}

	function decrementQuantity(id: string) {
		const item = cart.items.find((i) => i.id === id);
		if (item && item.quantity > 1) {
			item.quantity -= 1;
		}
	}

	// Карусель "Вам может понравиться"
	let scrollEl: HTMLElement | undefined = $state();
	let canPrev = $state(false);
	let canNext = $state(true);

	function carouselPrev() {
		scrollEl?.scrollBy({ left: -scrollEl.clientWidth, behavior: 'smooth' });
	}
	function carouselNext() {
		scrollEl?.scrollBy({ left: scrollEl.clientWidth, behavior: 'smooth' });
	}
	function updateArrows() {
		if (!scrollEl) return;
		canPrev = scrollEl.scrollLeft > 4;
		canNext = scrollEl.scrollLeft < scrollEl.scrollWidth - scrollEl.clientWidth - 4;
	}

	$effect(() => {
		if (scrollEl) updateArrows();
	});


</script>

<div class="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
	<!-- Хлебные крошки -->
	<Breadcrumbs
		items={[
			{ label: 'Главная', href: '/' },
			{ label: 'Корзина', href: '' }
		]}
	/>

	<div class="flex items-center justify-between mb-6">
		<h1 class="text-2xl font-medium text-gray-800">Корзина</h1>
		<a href="/" class="flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600 transition-colors">
			<ChevronLeft size={16} />
			Продолжить покупки
		</a>
	</div>

	{#if cart.items.length === 0}
		<!-- Пустая корзина -->
		<div class="flex flex-col items-center justify-center py-24 gap-4 text-center">
			<ShoppingBag size={48} class="text-slate-200" />
			<p class="text-slate-500 text-lg">Корзина пуста</p>
			<p class="text-slate-400 text-sm">Добавьте товары в корзину, чтобы оформить заказ</p>
			<a
				href="/"
				class="mt-2 px-6 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-full hover:bg-emerald-700 transition-colors"
			>
				Перейти к покупкам
			</a>
		</div>
	{:else}
		<!-- Список товаров -->
		<div class="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 lg:gap-16">
			<!-- Левая колонка: товары -->
			<div class="flex flex-col">
				{#each cart.items as item, i (item.id)}
					{#if i > 0}
						<div class="pt-6 mb-6">
							<hr class="border-slate-200" />
						</div>
					{/if}
					<div
						class="flex gap-4 p-4"
					>
						<!-- Изображение товара -->
						<div class="shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden">
							<img
								src={item.image}
								alt={item.name}
								class="w-full h-full object-cover"
							/>
						</div>

						<!-- Информация о товаре -->
						<div class="flex-1 flex flex-col gap-2">
							<h3 class="text-lg font-medium text-gray-800">{item.name}</h3>
							<p class="text-xl font-bold text-emerald-600">
								{item.price.toLocaleString('ru-RU')} ₽
							</p>

							<!-- Управление количеством -->
							<div class="flex items-center gap-2 mt-auto">
								<button
									type="button"
									onclick={() => decrementQuantity(item.id)}
									class="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-gray-50 transition-colors"
									aria-label="Уменьшить количество"
								>
									<Minus size={16} />
								</button>
								<span class="text-base font-medium text-gray-800 min-w-8 text-center">
									{item.quantity}
								</span>
								<button
									type="button"
									onclick={() => incrementQuantity(item.id)}
									class="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-gray-50 transition-colors"
									aria-label="Увеличить количество"
								>
									<Plus size={16} />
								</button>
							</div>
						</div>

						<!-- Промежуточный итог и кнопка удаления -->
						<div class="flex flex-col items-end justify-between">
							<p class="text-lg font-bold text-gray-800">
								{(item.price * item.quantity).toLocaleString('ru-RU')} ₽
							</p>
							<button
								type="button"
								onclick={() => cart.removeItem(item.id)}
								class="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
							>
								<Trash2 size={16} />
								Удалить
							</button>
						</div>
					</div>
				{/each}
			</div>

		<!-- Правая колонка: итоги -->
		<div class="mt-6 lg:mt-0 lg:sticky lg:top-8 h-fit">
			<div class="bg-slate-50 rounded-2xl p-6 flex flex-col gap-6">
					<h2 class="text-xl font-semibold text-gray-800">Итого</h2>

					<div class="flex flex-col gap-3">
						<div class="flex items-center justify-between text-sm">
							<span class="text-gray-600">Товаров:</span>
							<span class="font-medium text-gray-800">{cart.totalItems} шт.</span>
						</div>
						<div class="flex items-center justify-between text-sm">
							<span class="text-gray-600">Сумма товаров:</span>
							<span class="font-medium text-gray-800">
								{total.toLocaleString('ru-RU')} ₽
							</span>
						</div>
						<div class="flex items-center justify-between text-sm">
							<span class="text-gray-600">Доставка:</span>
							<span class="font-medium text-emerald-600">Бесплатно</span>
						</div>
					</div>

					<div class="border-t border-slate-200 pt-4">
						<div class="flex items-center justify-between mb-6">
							<span class="text-lg font-semibold text-gray-800">Итого:</span>
							<span class="text-2xl font-bold text-emerald-600">
								{total.toLocaleString('ru-RU')} ₽
							</span>
						</div>

						<a
							href="/checkout"
							class="block w-full bg-emerald-600 text-white py-3 px-6 rounded-full font-medium hover:bg-emerald-700 transition-colors text-center"
						>
							Оформить заказ
						</a>
					</div>

					<div class="flex flex-col gap-2 text-xs text-gray-500">
						<p class="flex items-center gap-1.5"><ShieldCheck size={14} class="text-emerald-500 shrink-0" /> Безопасная оплата</p>
						<p class="flex items-center gap-1.5"><RotateCcw size={14} class="text-emerald-500 shrink-0" /> Возврат в течение 30 дней</p>
						<p class="flex items-center gap-1.5"><BadgeCheck size={14} class="text-emerald-500 shrink-0" /> Гарантия качества</p>
					</div>
				</div>
			</div>
		</div>

	<!-- Вам может понравиться -->
	<div class="mt-12">
		<h2 class="text-xl font-medium text-gray-800 mb-6">Вам может понравиться</h2>
		<div class="relative">
			{#if canPrev}
				<button
					type="button"
					onclick={carouselPrev}
					class="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
				>
					<ChevronLeft size={20} />
				</button>
			{/if}

			<div
				bind:this={scrollEl}
				onscroll={updateArrows}
				class="scroll-hidden flex gap-4 md:gap-6 overflow-x-auto"
			>
				<div class="shrink-0 w-[calc(50%-8px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]">
					<ProductCard
						image="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80"
						title="Диван угловой"
						price="24 990 ₽"
						oldPrice="32 000 ₽"
						sold="2k+ продано"
						rating={4}
						reviewsCount={590}
					/>
				</div>
				<div class="shrink-0 w-[calc(50%-8px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]">
					<ProductCard
						image="https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&q=80"
						title="Кресло Comfort"
						price="11 490 ₽"
						oldPrice="14 000 ₽"
						sold="840+ продано"
						rating={5}
						reviewsCount={213}
					/>
				</div>
				<div class="shrink-0 w-[calc(50%-8px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]">
					<ProductCard
						image="https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=400&q=80"
						title="Обеденный стол"
						price="18 200 ₽"
						oldPrice="22 500 ₽"
						sold="1.3k+ продано"
						rating={4}
						reviewsCount={374}
					/>
				</div>
				<div class="shrink-0 w-[calc(50%-8px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]">
					<ProductCard
						image="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&q=80"
						title="Шкаф-купе"
						price="34 900 ₽"
						oldPrice="41 000 ₽"
						sold="560+ продано"
						rating={4}
						reviewsCount={128}
					/>
				</div>
				<div class="shrink-0 w-[calc(50%-8px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]">
					<ProductCard
						image="https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&q=80"
						title="Кровать двуспальная"
						price="42 500 ₽"
						oldPrice="55 000 ₽"
						sold="1.1k+ продано"
						rating={5}
						reviewsCount={302}
					/>
				</div>
				<div class="shrink-0 w-[calc(50%-8px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]">
					<ProductCard
						image="https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&q=80"
						title="Журнальный столик"
						price="8 990 ₽"
						oldPrice="11 500 ₽"
						sold="670+ продано"
						rating={4}
						reviewsCount={187}
					/>
				</div>
			</div>

			{#if canNext}
				<button
					type="button"
					onclick={carouselNext}
					class="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
				>
					<ChevronRight size={20} />
				</button>
			{/if}
		</div>
	</div>
	{/if}
</div>

<style>
	.scroll-hidden::-webkit-scrollbar {
		display: none;
	}
	.scroll-hidden {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
</style>
