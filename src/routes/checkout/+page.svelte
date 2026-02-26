<script lang="ts">
	import { Truck, ShieldCheck, User, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { cart } from '$lib/stores/cart.svelte';
	import { checkout } from '$lib/stores/checkout.svelte';

	const total = $derived(
		cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
	);

	let orderOpen = $state(false);
</script>

<div class="flex flex-col flex-1 bg-white md:bg-[linear-gradient(to_right,white_50%,#f9fafb_50%)]">
	<!-- Мобильная плашка "Ваш заказ" -->
	<div class="md:hidden border-b border-gray-200">
		<button
			onclick={() => orderOpen = !orderOpen}
			class="w-full flex items-center justify-between px-4 py-3.5 bg-[#f9fafb]"
		>
			<span class="text-sm font-semibold text-gray-800">Ваш заказ</span>
			<div class="flex items-center gap-2">
				<span class="text-sm font-bold text-emerald-600">{total.toLocaleString('ru-RU')} ₽</span>
				{#if orderOpen}
					<ChevronUp size={16} class="text-gray-500" />
				{:else}
					<ChevronDown size={16} class="text-gray-500" />
				{/if}
			</div>
		</button>
		{#if orderOpen}
			<div class="px-4 pb-4 bg-[#f9fafb] flex flex-col gap-4">
				<div class="flex flex-col gap-2 pt-1">
					<div class="flex items-center justify-between text-sm">
						<span class="text-gray-600">Товаров:</span>
						<span class="font-medium text-gray-800">{cart.totalItems} шт.</span>
					</div>
					<div class="flex items-center justify-between text-sm">
						<span class="text-gray-600">Доставка:</span>
						<span class="font-medium text-emerald-600">Бесплатно</span>
					</div>
				</div>
				<hr class="border-gray-200" />
				<div class="flex flex-col gap-4">
					{#each cart.items as item (item.id)}
						<div class="flex items-center gap-3">
							<img src={item.image} alt={item.name} class="w-14 h-14 object-cover rounded-lg shrink-0" />
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
		{/if}
	</div>

	<!-- Контент -->
	<main class="flex-1 max-w-7xl mx-auto w-full flex flex-col">
		<div class="grid grid-cols-1 md:grid-cols-2 items-stretch flex-1">

			<!-- Левая колонка: форма на белом фоне -->
			<div class="bg-white pb-24 pt-4 md:pt-8">
				<div class="w-full max-w-lg mx-auto md:max-w-none px-4 md:px-8">
				<h1 class="text-[20px] font-semibold text-gray-800 pt-8">Оформление заказа</h1>

				<!-- Контактные данные -->
				<section class="py-6">
					<h2 class="text-base font-semibold text-gray-800 mb-5 flex items-center gap-2">
						<User size={18} class="text-emerald-600" />
						Контактные данные
					</h2>
					<div class="grid grid-cols-2 gap-4">
						<div class="flex flex-col gap-1.5">
							<label for="name" class="text-sm font-medium text-gray-700">Имя и фамилия</label>
							<input
								id="name"
								type="text"
								bind:value={checkout.name}
								placeholder="Иван Иванов"
								class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
							/>
						</div>
						<div class="flex flex-col gap-1.5">
							<label for="phone" class="text-sm font-medium text-gray-700">Телефон</label>
							<input
								id="phone"
								type="tel"
								bind:value={checkout.phone}
								placeholder="+7 (999) 000-00-00"
								class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
							/>
						</div>
						<div class="flex flex-col gap-1.5 col-span-2">
							<label for="email" class="text-sm font-medium text-gray-700">Email</label>
							<input
								id="email"
								type="email"
								bind:value={checkout.email}
								placeholder="example@mail.ru"
								class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
							/>
						</div>
					</div>
				</section>

				<hr class="border-gray-100" />

				<!-- Адрес доставки -->
				<section class="py-6">
					<h2 class="text-base font-semibold text-gray-800 mb-5 flex items-center gap-2">
						<Truck size={18} class="text-emerald-600" />
						Адрес доставки
					</h2>
					<div class="grid grid-cols-2 gap-4">
						<div class="flex flex-col gap-1.5 col-span-2">
							<label for="street" class="text-sm font-medium text-gray-700">Улица, дом, квартира</label>
							<input
								id="street"
								type="text"
								bind:value={checkout.street}
								placeholder="ул. Ленина, д. 5, кв. 12"
								class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
							/>
						</div>
						<div class="flex flex-col gap-1.5">
							<label for="city" class="text-sm font-medium text-gray-700">Город</label>
							<input
								id="city"
								type="text"
								bind:value={checkout.city}
								placeholder="Екатеринбург"
								class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
							/>
						</div>
						<div class="flex flex-col gap-1.5">
							<label for="region" class="text-sm font-medium text-gray-700">Область</label>
							<input
								id="region"
								type="text"
								bind:value={checkout.region}
								placeholder="Свердловская область"
								class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
							/>
						</div>
						<div class="flex flex-col gap-1.5">
							<label for="postalCode" class="text-sm font-medium text-gray-700">Почтовый индекс</label>
							<input
								id="postalCode"
								type="text"
								bind:value={checkout.postalCode}
								placeholder="620000"
								class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
							/>
						</div>
						<div class="flex flex-col gap-1.5 col-span-2">
							<label for="comment" class="text-sm font-medium text-gray-700">Комментарий к заказу</label>
							<textarea
								id="comment"
								bind:value={checkout.comment}
								placeholder="Уточнения по доставке, подъезд, код домофона..."
								rows={3}
								class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition resize-none"
							></textarea>
						</div>
					</div>
				</section>

				<hr class="border-gray-100" />

				<!-- Способ доставки -->
				<section class="py-6">
					<h2 class="text-base font-semibold text-gray-800 mb-5 flex items-center gap-2">
						<Truck size={18} class="text-emerald-600" />
						Способ доставки
					</h2>
					<div class="flex gap-3">
						<button
							type="button"
							onclick={() => checkout.deliveryMethod = 'courier'}
							class="flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all {checkout.deliveryMethod === 'courier' ? 'border-emerald-500 text-emerald-700' : 'border-slate-200 text-gray-600 hover:border-slate-300'}"
						>
							Курьером
						</button>
						<button
							type="button"
							onclick={() => checkout.deliveryMethod = 'post'}
							class="flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all {checkout.deliveryMethod === 'post' ? 'border-emerald-500 text-emerald-700' : 'border-slate-200 text-gray-600 hover:border-slate-300'}"
						>
							Почтой
						</button>
						<button
							type="button"
							onclick={() => checkout.deliveryMethod = 'pickup'}
							class="flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all {checkout.deliveryMethod === 'pickup' ? 'border-emerald-500 text-emerald-700' : 'border-slate-200 text-gray-600 hover:border-slate-300'}"
						>
							Самовывоз
						</button>
					</div>
				</section>
				</div><!-- /centering wrapper -->
			</div>

			<!-- Правая колонка: итог на сером фоне (скрыта на mobile) -->
			<div class="hidden md:block pt-16 pb-40 px-16 bg-gray-50">
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
