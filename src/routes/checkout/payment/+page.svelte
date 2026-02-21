<script lang="ts">
	import { ShieldCheck, CreditCard } from 'lucide-svelte';
	import { cart } from '$lib/stores/cart.svelte';

	const total = $derived(
		cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
	);

	let paymentMethod = $state<'card' | 'cash' | 'transfer'>('card');
</script>

<div class="flex flex-col flex-1 bg-[linear-gradient(to_right,white_50%,#f9fafb_50%)]">
	<!-- Контент -->
	<main class="flex-1 max-w-7xl mx-auto w-full flex flex-col">
		<div class="grid grid-cols-2 items-stretch flex-1">

			<!-- Левая колонка -->
			<div class="bg-white px-8 pb-8 pt-8">
				<h1 class="text-[20px] font-semibold text-gray-800 pt-8">Оплата и доставка</h1>

				<!-- Способ оплаты -->
				<section class="py-6">
					<h2 class="text-base font-semibold text-gray-800 mb-5 flex items-center gap-2">
						<CreditCard size={18} class="text-emerald-600" />
						Способ оплаты
					</h2>
					<div class="flex gap-3">
						<button
							type="button"
							onclick={() => paymentMethod = 'card'}
							class="flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all {paymentMethod === 'card' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-gray-600 hover:border-slate-300'}"
						>
							Картой
						</button>
						<button
							type="button"
							onclick={() => paymentMethod = 'cash'}
							class="flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all {paymentMethod === 'cash' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-gray-600 hover:border-slate-300'}"
						>
							Наличными
						</button>
						<button
							type="button"
							onclick={() => paymentMethod = 'transfer'}
							class="flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all {paymentMethod === 'transfer' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-gray-600 hover:border-slate-300'}"
						>
							Переводом
						</button>
					</div>
				</section>
			</div>

			<!-- Правая колонка: итог на сером фоне -->
			<div class="pt-16 pb-20 px-16 bg-gray-50">
			<div class="sticky top-10 flex flex-col gap-5 max-w-100">
				<h2 class="text-base font-semibold text-gray-800">Ваш заказ</h2>

				<div class="flex flex-col gap-2">
					<div class="flex items-center justify-between text-sm">
						<span class="text-gray-600">Товаров:</span>
						<span class="font-medium text-gray-800">{cart.totalItems} шт.</span>
					</div>
					<div class="flex items-center justify-between text-sm">
						<span class="text-gray-600">Доставка:</span>
						<span class="font-medium text-emerald-600">Бесплатно</span>
					</div>
					<div class="flex items-center justify-between mt-1">
						<span class="text-base font-semibold text-gray-800">Итого:</span>
						<span class="text-xl font-bold text-emerald-600">{total.toLocaleString('ru-RU')} ₽</span>
					</div>
				</div>

				<hr class="border-gray-200" />

				<!-- Список товаров -->
				<div class="flex flex-col gap-6">
					{#each cart.items as item (item.id)}
						<div class="flex items-center gap-3">
							<img src={item.image} alt={item.name} class="w-18 h-18 object-cover rounded-lg shrink-0" />
							<div class="flex-1 min-w-0">
								<p class="text-sm text-gray-800 truncate">{item.name}</p>
								<p class="text-xs text-gray-500">{item.quantity} шт.</p>
							</div>
							<p class="text-sm font-medium text-gray-800 shrink-0">
								{(item.price * item.quantity).toLocaleString('ru-RU')} ₽
							</p>
						</div>
					{/each}
				</div>

				<div class="flex items-center gap-2 text-xs text-gray-500 justify-center">
					<ShieldCheck size={14} class="text-emerald-500" />
					Безопасная оплата. Возврат в течение 30 дней.
				</div>
			</div>
			</div>
		</div>
	</main>
</div>
