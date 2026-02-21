<script lang="ts">
	import { ShieldCheck, CreditCard, Truck, User, MapPin, Banknote, ArrowRightLeft } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { cart } from '$lib/stores/cart.svelte';
	import { checkout } from '$lib/stores/checkout.svelte';

	const total = $derived(
		cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
	);


	const deliveryMethodLabel: Record<string, string> = {
		courier: 'Курьером',
		post: 'Почтой',
		pickup: 'Самовывоз'
	};

	let cardNumber = $state('');
	let cardExpiry = $state('');
	let cardCvv = $state('');
	let cardName = $state('');
</script>

<div class="flex flex-col flex-1 bg-[linear-gradient(to_right,white_50%,#f9fafb_50%)]">
	<!-- Контент -->
	<main class="flex-1 max-w-7xl mx-auto w-full flex flex-col">
		<div class="grid grid-cols-2 items-stretch flex-1">

			<!-- Левая колонка -->
			<div class="bg-white px-8 pb-8 pt-8">
				<h1 class="text-[20px] font-semibold text-gray-800 pt-8">Оплата и доставка</h1>

				<div class="py-6 flex flex-col">

					<!-- Блок 1: Контактная информация -->
					<div class="border border-gray-200 rounded-xl p-4 mb-5">
						<div class="flex items-center justify-between mb-3">
							<h2 class="text-base font-semibold text-gray-800">Контактная информация</h2>
							<button
								type="button"
								onclick={() => goto('/checkout')}
								class="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
							>
								Редактировать
							</button>
						</div>
						<div class="grid grid-cols-[20px_1fr] gap-x-1.5 gap-y-1 items-start">
							<User size={20} class="text-gray-500" />
							<span class="text-sm text-gray-500">{checkout.name || '—'}</span>
							<span></span>
							<span class="text-sm text-gray-500">{checkout.phone || '—'}</span>
						</div>
					</div>

					<!-- Блок 2: Адрес доставки -->
					<div class="border border-gray-200 rounded-xl p-4 mb-5">
						<div class="flex items-center justify-between mb-3">
							<h2 class="text-base font-semibold text-gray-800">Адрес доставки</h2>
							<button
								type="button"
								onclick={() => goto('/checkout')}
								class="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
							>
								Редактировать
							</button>
						</div>
						<div class="grid grid-cols-[20px_1fr] gap-x-1.5 gap-y-1 items-start">
							<MapPin size={20} class="text-gray-500" />
							<span class="text-sm text-gray-500">{checkout.street || '—'}</span>
							{#if checkout.city || checkout.region || checkout.postalCode}
								<span></span>
								<span class="text-sm text-gray-500">{[checkout.city, checkout.region, checkout.postalCode].filter(Boolean).join(', ')}</span>
							{/if}
						</div>
					</div>

					<!-- Блок 3: Способ доставки -->
					<div class="border border-gray-200 rounded-xl p-4 mb-5">
						<div class="flex items-center justify-between mb-3">
							<h2 class="text-base font-semibold text-gray-800">Способ доставки</h2>
							<button
								type="button"
								onclick={() => goto('/checkout')}
								class="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
							>
								Редактировать
							</button>
						</div>
						<div class="grid grid-cols-[20px_1fr] gap-x-1.5 gap-y-1 items-start">
							<Truck size={20} class="text-gray-500" />
							<span class="text-sm text-gray-500">{deliveryMethodLabel[checkout.deliveryMethod]}</span>
							<span></span>
							<span class="text-sm text-gray-500">Бесплатно · 2–4 рабочих дня</span>
						</div>
					</div>

					<!-- Разделитель -->
					<div class="border-t border-gray-200 mt-8 mb-8"></div>

					<!-- Способ оплаты -->
					<section>
						<h2 class="text-base font-semibold text-gray-800 mb-5">Способ оплаты</h2>
						<div class="flex gap-3 mb-5">
							<button
								type="button"
								onclick={() => checkout.paymentMethod = 'card'}
								class="flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all flex items-center justify-center gap-2 {checkout.paymentMethod === 'card' ? 'border-emerald-500 text-emerald-700' : 'border-slate-200 text-gray-600 hover:border-slate-300'}"
							>
								<CreditCard size={16} />
								Картой
							</button>
							<button
								type="button"
								onclick={() => checkout.paymentMethod = 'cash'}
								class="flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all flex items-center justify-center gap-2 {checkout.paymentMethod === 'cash' ? 'border-emerald-500 text-emerald-700' : 'border-slate-200 text-gray-600 hover:border-slate-300'}"
							>
								<Banknote size={16} />
								Наличными
							</button>
							<button
								type="button"
								onclick={() => checkout.paymentMethod = 'transfer'}
								class="flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all flex items-center justify-center gap-2 {checkout.paymentMethod === 'transfer' ? 'border-emerald-500 text-emerald-700' : 'border-slate-200 text-gray-600 hover:border-slate-300'}"
							>
								<ArrowRightLeft size={16} />
								Переводом
							</button>
						</div>

						{#if checkout.paymentMethod === 'card'}
							<div class="flex flex-col gap-4">
								<div class="flex flex-col gap-1.5">
									<label for="cardNumber" class="text-sm font-medium text-gray-700">Номер карты</label>
									<input
										id="cardNumber"
										type="text"
										bind:value={cardNumber}
										placeholder="0000 0000 0000 0000"
										maxlength={19}
										class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
									/>
								</div>
								<div class="grid grid-cols-2 gap-4">
									<div class="flex flex-col gap-1.5">
										<label for="cardExpiry" class="text-sm font-medium text-gray-700">Срок действия</label>
										<input
											id="cardExpiry"
											type="text"
											bind:value={cardExpiry}
											placeholder="ММ/ГГ"
											maxlength={5}
											class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
										/>
									</div>
									<div class="flex flex-col gap-1.5">
										<label for="cardCvv" class="text-sm font-medium text-gray-700">CVV</label>
										<input
											id="cardCvv"
											type="password"
											bind:value={cardCvv}
											placeholder="123"
											maxlength={3}
											class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
										/>
									</div>
								</div>
								<div class="flex flex-col gap-1.5">
									<label for="cardName" class="text-sm font-medium text-gray-700">Имя на карте</label>
									<input
										id="cardName"
										type="text"
										bind:value={cardName}
										placeholder="IVAN IVANOV"
										class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
									/>
								</div>
							</div>
						{/if}
					</section>
				</div>
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
