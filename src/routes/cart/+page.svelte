<script lang="ts">
	import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { cart } from '$lib/stores/cart.svelte';

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
</script>

<div class="max-w-[1280px] mx-auto px-8 py-12">
	<!-- Хлебные крошки -->
	<Breadcrumbs
		items={[
			{ label: 'Главная', href: '/' },
			{ label: 'Корзина', href: '' }
		]}
	/>

	<h1 class="text-3xl md:text-4xl font-medium text-gray-800 mb-8">Корзина</h1>

	{#if cart.items.length === 0}
		<!-- Пустая корзина -->
		<div class="flex flex-col items-center justify-center py-16 gap-6">
			<div class="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
				<ShoppingBag size={48} class="text-gray-400" />
			</div>
			<div class="text-center">
				<h2 class="text-2xl font-semibold text-gray-800 mb-2">Корзина пуста</h2>
				<p class="text-gray-600 mb-6">
					Добавьте товары в корзину, чтобы оформить заказ
				</p>
				<a
					href="/"
					class="inline-block px-6 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors"
				>
					Перейти к покупкам
				</a>
			</div>
		</div>
	{:else}
		<!-- Список товаров -->
		<div class="grid grid-cols-[1fr_400px] gap-8">
			<!-- Левая колонка: товары -->
			<div class="flex flex-col gap-4">
				{#each cart.items as item (item.id)}
					<div
						class="flex gap-4 p-4 border border-slate-200 rounded-2xl hover:shadow-md transition-shadow"
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
								<span class="text-base font-medium text-gray-800 min-w-[2rem] text-center">
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
		<div class="sticky top-8 h-fit">
			<div class="border border-slate-200 rounded-2xl p-6 flex flex-col gap-6">
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

						<button
							type="button"
							class="w-full bg-emerald-600 text-white py-3 px-6 rounded-full font-medium hover:bg-emerald-700 transition-colors"
						>
							Оформить заказ
						</button>
					</div>

					<div class="flex flex-col gap-2 text-xs text-gray-500">
						<p>• Безопасная оплата</p>
						<p>• Возврат в течение 30 дней</p>
						<p>• Гарантия качества</p>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
