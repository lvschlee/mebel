<script lang="ts">
	import { ChevronRight, ChevronLeft, ShoppingCart, Home, Truck, ShieldCheck, User } from 'lucide-svelte';
	import { cart } from '$lib/stores/cart.svelte';

	const total = $derived(
		cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
	);

	let name = $state('');
	let phone = $state('');
	let email = $state('');
	let street = $state('');
	let city = $state('');
	let region = $state('');
	let postalCode = $state('');
	let comment = $state('');
	let deliveryMethod = $state<'courier' | 'post' | 'pickup'>('courier');
</script>

<div class="min-h-screen bg-white flex flex-col">
	<!-- Шапка страницы -->
	<header class="bg-white border-b border-slate-200">
		<div class="max-w-7xl mx-auto px-8 py-3 grid grid-cols-3 items-center">
			<!-- Левый блок: логотип -->
			<div class="flex items-center">
				<a href="/" class="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 transition-colors">
					<Home size={20} />
					<span class="text-base font-bold">Мебель Урала</span>
				</a>
			</div>

			<!-- Центральный блок: шаги заказа -->
			<div class="flex items-center justify-center gap-1.5 text-[13px] whitespace-nowrap">
				<span class="text-gray-800 font-medium">Оформление заказа</span>
				<ChevronRight size={12} class="text-gray-300 shrink-0" />
				<span class="text-gray-400">Оплата и доставка</span>
				<ChevronRight size={12} class="text-gray-300 shrink-0" />
				<span class="text-gray-400">Подтверждение заказа</span>
			</div>

			<!-- Правый блок: кнопка назад в корзину -->
			<div class="flex items-center justify-end">
				<a
					href="/cart"
					class="flex items-center gap-1.5 px-3 py-2 rounded-full text-gray-500 hover:bg-[#F9FAFB] transition-colors"
					aria-label="Назад в корзину"
				>
					<ChevronLeft size={16} />
					<ShoppingCart size={16} />
				</a>
			</div>
		</div>
	</header>

	<!-- Контент -->
	<main class="flex-1 max-w-7xl mx-auto w-full">
		<div class="grid grid-cols-[1fr_400px] items-start">

			<!-- Левая колонка: форма на белом фоне -->
			<div class="bg-white">

				<!-- Контактные данные -->
				<section class="p-6">
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
								bind:value={name}
								placeholder="Иван Иванов"
								class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
							/>
						</div>
						<div class="flex flex-col gap-1.5">
							<label for="phone" class="text-sm font-medium text-gray-700">Телефон</label>
							<input
								id="phone"
								type="tel"
								bind:value={phone}
								placeholder="+7 (999) 000-00-00"
								class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
							/>
						</div>
						<div class="flex flex-col gap-1.5 col-span-2">
							<label for="email" class="text-sm font-medium text-gray-700">Email</label>
							<input
								id="email"
								type="email"
								bind:value={email}
								placeholder="example@mail.ru"
								class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
							/>
						</div>
					</div>
				</section>

				<hr class="mx-6 border-gray-100" />

				<!-- Адрес доставки -->
				<section class="p-6">
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
								bind:value={street}
								placeholder="ул. Ленина, д. 5, кв. 12"
								class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
							/>
						</div>
						<div class="flex flex-col gap-1.5">
							<label for="city" class="text-sm font-medium text-gray-700">Город</label>
							<input
								id="city"
								type="text"
								bind:value={city}
								placeholder="Екатеринбург"
								class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
							/>
						</div>
						<div class="flex flex-col gap-1.5">
							<label for="region" class="text-sm font-medium text-gray-700">Область</label>
							<input
								id="region"
								type="text"
								bind:value={region}
								placeholder="Свердловская область"
								class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
							/>
						</div>
						<div class="flex flex-col gap-1.5">
							<label for="postalCode" class="text-sm font-medium text-gray-700">Почтовый индекс</label>
							<input
								id="postalCode"
								type="text"
								bind:value={postalCode}
								placeholder="620000"
								class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
							/>
						</div>
						<div class="flex flex-col gap-1.5 col-span-2">
							<label for="comment" class="text-sm font-medium text-gray-700">Комментарий к заказу</label>
							<textarea
								id="comment"
								bind:value={comment}
								placeholder="Уточнения по доставке, подъезд, код домофона..."
								rows={3}
								class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition resize-none"
							></textarea>
						</div>
					</div>
				</section>

				<hr class="mx-6 border-gray-100" />

				<!-- Способ доставки -->
				<section class="p-6">
					<h2 class="text-base font-semibold text-gray-800 mb-5 flex items-center gap-2">
						<Truck size={18} class="text-emerald-600" />
						Способ доставки
					</h2>
					<div class="flex gap-3">
						<button
							type="button"
							onclick={() => deliveryMethod = 'courier'}
							class="flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all {deliveryMethod === 'courier' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-gray-600 hover:border-slate-300'}"
						>
							Курьером
						</button>
						<button
							type="button"
							onclick={() => deliveryMethod = 'post'}
							class="flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all {deliveryMethod === 'post' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-gray-600 hover:border-slate-300'}"
						>
							Почтой
						</button>
						<button
							type="button"
							onclick={() => deliveryMethod = 'pickup'}
							class="flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all {deliveryMethod === 'pickup' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-gray-600 hover:border-slate-300'}"
						>
							Самовывоз
						</button>
					</div>
				</section>
			</div>

			<!-- Правая колонка: итог на сером фоне -->
			<div class="py-10 px-8">
			<div class="sticky top-10 flex flex-col gap-5 bg-gray-50 rounded-2xl p-6">
				<h2 class="text-base font-semibold text-gray-800">Ваш заказ</h2>

				<!-- Список товаров -->
				<div class="flex flex-col gap-3">
					{#each cart.items as item (item.id)}
						<div class="flex items-center gap-3">
							<img src={item.image} alt={item.name} class="w-12 h-12 object-cover rounded-lg shrink-0" />
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

				<hr class="border-gray-200" />

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

				<button
					type="button"
					class="w-full bg-emerald-600 text-white py-3 px-6 rounded-full font-medium hover:bg-emerald-700 transition-colors"
				>
					Подтвердить заказ
				</button>

				<div class="flex items-center gap-2 text-xs text-gray-500 justify-center">
					<ShieldCheck size={14} class="text-emerald-500" />
					Безопасная оплата. Возврат в течение 30 дней.
				</div>
			</div>
			</div>
		</div>
	</main>
</div>
