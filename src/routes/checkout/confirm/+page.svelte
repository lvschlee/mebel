<script lang="ts">
	import { onMount } from 'svelte';
	import { ShieldCheck, Printer, ChevronRight, Check, UserPlus, Truck, Clock, ChevronDown, ChevronUp, MapPin, CreditCard, Calendar, Mail } from 'lucide-svelte';
	import { cart } from '$lib/stores/cart.svelte';
	import { checkout } from '$lib/stores/checkout.svelte';

	type CartItem = { id: string; name: string; price: number; image: string; quantity: number };

	let snapshotItems = $state<CartItem[]>([]);
	let snapshotTotal = $state(0);
	let orderNumber = $state('');
	let orderOpen = $state(false);

	const deliveryLabels: Record<string, string> = {
		courier: 'Курьерская доставка',
		post: 'Почта России',
		pickup: 'Самовывоз'
	};

	const paymentLabels: Record<string, string> = {
		card: 'Банковская карта',
		cash: 'Наличными при получении',
		transfer: 'Банковский перевод'
	};

	function addBusinessDays(date: Date, days: number): Date {
		const result = new Date(date);
		let added = 0;
		while (added < days) {
			result.setDate(result.getDate() + 1);
			const day = result.getDay();
			if (day !== 0 && day !== 6) added++;
		}
		return result;
	}

	function getDeliveryRange(): string {
		const now = new Date();
		const fmt = (d: Date) => d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
		if (checkout.deliveryMethod === 'pickup') {
			return `Готов к выдаче: ${fmt(addBusinessDays(now, 1))}`;
		}
		const minDays = checkout.deliveryMethod === 'post' ? 5 : 2;
		const maxDays = checkout.deliveryMethod === 'post' ? 7 : 4;
		return `${fmt(addBusinessDays(now, minDays))} — ${fmt(addBusinessDays(now, maxDays))}`;
	}

	function buildAddress(): string {
		const parts = [checkout.street, checkout.city, checkout.region, checkout.postalCode].filter(Boolean);
		return parts.join(', ');
	}

	onMount(() => {
		snapshotItems = cart.items.map(i => ({ ...i }));
		snapshotTotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

		const existing = sessionStorage.getItem('lastOrderNumber');
		if (existing) {
			orderNumber = existing;
		} else {
			const num = String(Math.floor(10000 + Math.random() * 90000));
			sessionStorage.setItem('lastOrderNumber', num);
			orderNumber = num;
		}

		cart.clear();
	});
</script>

<div class="flex flex-col flex-1 bg-white">
	<!-- Мобильная плашка "Ваш заказ" -->
	<div class="md:hidden border-b border-gray-200">
		<button
			onclick={() => orderOpen = !orderOpen}
			class="w-full flex items-center justify-between px-4 py-3.5 bg-[#f9fafb]"
		>
			<div class="flex items-center gap-2">
				<span class="text-sm font-semibold text-gray-800">Ваш заказ</span>
				<span class="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Оплачено</span>
			</div>
			<div class="flex items-center gap-2">
				<span class="text-sm font-bold text-emerald-600">{snapshotTotal.toLocaleString('ru-RU')} ₽</span>
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
						<span class="font-medium text-gray-800">{snapshotItems.reduce((s, i) => s + i.quantity, 0)} шт.</span>
					</div>
					<div class="flex items-center justify-between text-sm">
						<span class="text-gray-600">Доставка:</span>
						<span class="font-medium text-emerald-600">Бесплатно</span>
					</div>
				</div>
				<hr class="border-gray-200" />
				<div class="flex flex-col gap-4">
					{#each snapshotItems as item (item.id)}
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

	<main class="flex-1 max-w-7xl mx-auto w-full flex flex-col">
		<div class="grid grid-cols-1 md:grid-cols-2 items-stretch flex-1">

			<!-- Левая колонка -->
			<div class="bg-white pb-8 pt-4 md:pt-8">
				<div class="w-full max-w-lg mx-auto md:max-w-none px-4 md:px-8">
				<div class="pt-8">
					<!-- Заголовок -->
					<div class="flex items-center gap-3 mb-7">
						<span class="text-[30px] leading-none">🎉</span>
						<h1 class="text-[30px] font-semibold text-gray-800 leading-tight">Заказ подтверждён</h1>
					</div>

					<!-- Подзаголовок -->
					<p class="text-base font-medium text-gray-700 mb-4">Спасибо за ваш заказ!</p>

					<!-- Сводка заказа -->
					<div class="flex flex-col gap-2.5 mb-8">
						<!-- Номер заказа -->
						<div class="flex items-start gap-2 text-sm text-gray-500">
							<span class="shrink-0 mt-0.5">#</span>
							<span>Заказ <span class="text-gray-900 font-semibold">{orderNumber}</span></span>
						</div>

						<!-- Email -->
						<div class="flex items-start gap-2 text-sm text-gray-500">
							<Mail size={15} class="shrink-0 mt-0.5 text-gray-400" />
							<span>Подтверждение отправлено на <span class="text-gray-900 font-semibold">{checkout.email || 'example@yandex.ru'}</span></span>
						</div>

						<!-- Ожидаемая дата доставки -->
						<div class="flex items-start gap-2 text-sm text-gray-500">
							<Calendar size={15} class="shrink-0 mt-0.5 text-gray-400" />
							<span>Ожидаемая доставка: <span class="text-gray-900 font-semibold">{getDeliveryRange()}</span></span>
						</div>

						<!-- Адрес доставки -->
						{#if checkout.deliveryMethod !== 'pickup' && buildAddress()}
							<div class="flex items-start gap-2 text-sm text-gray-500">
								<MapPin size={15} class="shrink-0 mt-0.5 text-gray-400" />
								<span>{deliveryLabels[checkout.deliveryMethod]}: <span class="text-gray-900 font-semibold">{buildAddress()}</span></span>
							</div>
						{:else if checkout.deliveryMethod === 'pickup'}
							<div class="flex items-start gap-2 text-sm text-gray-500">
								<MapPin size={15} class="shrink-0 mt-0.5 text-gray-400" />
								<span class="text-gray-900 font-semibold">Самовывоз</span>
							</div>
						{/if}

						<!-- Способ оплаты -->
						<div class="flex items-start gap-2 text-sm text-gray-500">
							<CreditCard size={15} class="shrink-0 mt-0.5 text-gray-400" />
							<span>Оплата: <span class="text-gray-900 font-semibold">{paymentLabels[checkout.paymentMethod]}</span></span>
						</div>
					</div>

					<!-- Кнопки -->
					<div class="flex flex-col min-[1120px]:flex-row items-start gap-3 mt-2">
						<a
							href="/"
							class="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 text-white text-sm font-medium transition hover:bg-emerald-700"
						>
							Вернуться к покупкам
							<ChevronRight size={16} />
						</a>
						<button
							type="button"
							onclick={() => window.print()}
							class="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition px-1 py-2.5"
						>
							<Printer size={14} />
							Распечатать
						</button>
					</div>

					<!-- Поддержка -->
					<p class="mt-6 text-xs text-gray-400">
						Вопросы по заказу? Напишите нам на
						<a href="mailto:support@mebel.ru" class="text-gray-600 hover:underline">support@mebel.ru</a>
						или позвоните
						<a href="tel:+78001234567" class="text-gray-600 hover:underline">8 800 123-45-67</a>
					</p>

					<!-- Трекер заказа -->
					<div class="mt-10">
						<h2 class="text-[20px] font-semibold text-gray-800 mb-5">Статус заказа</h2>
						<div class="flex flex-col">

							<!-- Заказ создан — активный -->
							<div class="flex items-start gap-4">
								<div class="flex flex-col items-center">
									<div class="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
										<UserPlus size={14} class="text-white" />
									</div>
									<div class="w-px h-4 bg-gray-200 mt-1"></div>
								</div>
								<div class="pt-1 pb-3">
									<p class="text-sm font-medium text-gray-800">Заказ создан</p>
									<p class="text-xs text-gray-400 mt-0.5">Только что</p>
								</div>
							</div>

							<!-- Отправлен -->
							<div class="flex items-start gap-4">
								<div class="flex flex-col items-center">
									<div class="w-8 h-8 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center shrink-0">
										<Truck size={14} class="text-gray-400" />
									</div>
									<div class="w-px h-4 bg-gray-200 mt-1"></div>
								</div>
								<div class="pt-1 pb-3">
									<p class="text-sm text-gray-400">Отправлен</p>
								</div>
							</div>

							<!-- В доставке -->
							<div class="flex items-start gap-4">
								<div class="flex flex-col items-center">
									<div class="w-8 h-8 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center shrink-0">
										<Clock size={14} class="text-gray-400" />
									</div>
									<div class="w-px h-4 bg-gray-200 mt-1"></div>
								</div>
								<div class="pt-1 pb-3">
									<p class="text-sm text-gray-400">В доставке</p>
								</div>
							</div>

							<!-- Доставлен -->
							<div class="flex items-start gap-4">
								<div class="flex flex-col items-center">
									<div class="w-8 h-8 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center shrink-0">
										<Check size={14} class="text-gray-400" />
									</div>
								</div>
								<div class="pt-1">
									<p class="text-sm text-gray-400">Доставлен</p>
								</div>
							</div>

						</div>
					</div>
				</div>
				</div><!-- /centering wrapper -->
			</div>

			<!-- Правая колонка: итог (скрыта на mobile) -->
			<div class="hidden md:block pt-16 pb-20 px-16">
			<div class="sticky top-10 flex flex-col gap-5 max-w-100">
				<div class="flex items-center justify-between">
					<h2 class="text-base font-semibold text-gray-800">Ваш заказ</h2>
					<span class="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">Оплачено</span>
				</div>

				<div class="flex flex-col gap-2">
					<div class="flex items-center justify-between text-sm">
						<span class="text-gray-600">Товаров:</span>
						<span class="font-medium text-gray-800">{snapshotItems.reduce((s, i) => s + i.quantity, 0)} шт.</span>
					</div>
					<div class="flex items-center justify-between text-sm">
						<span class="text-gray-600">Доставка:</span>
						<span class="font-medium text-emerald-600">Бесплатно</span>
					</div>
					<div class="flex items-center justify-between mt-1">
						<span class="text-base font-semibold text-gray-800">Итого:</span>
						<span class="text-xl font-bold text-emerald-600">{snapshotTotal.toLocaleString('ru-RU')} ₽</span>
					</div>
				</div>

				<hr class="border-gray-200" />

				<!-- Список товаров -->
				<div class="flex flex-col gap-6">
					{#each snapshotItems as item (item.id)}
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
