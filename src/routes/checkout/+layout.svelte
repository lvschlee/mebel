<script lang="ts">
	import { ChevronLeft, ChevronRight, Home, ShoppingCart } from 'lucide-svelte';
	import { page } from '$app/state';

	let { children } = $props();

	const step = $derived(
		page.url.pathname.startsWith('/checkout/confirm')
			? 3
			: page.url.pathname.startsWith('/checkout/payment')
				? 2
				: 1
	);

	const backHref = $derived(
		step === 3 ? '/checkout/payment' : step === 2 ? '/checkout' : '/cart'
	);

	const continueHref = $derived(
		step === 1 ? '/checkout/payment' : step === 2 ? '/checkout/confirm' : '#'
	);

	const backLabel = 'Назад';
</script>

<header class="bg-white border-b border-slate-200">
	<div class="max-w-7xl mx-auto px-4 md:px-8">

		<!-- Мобильный хедер (< md): 2 строки -->
		<div class="md:hidden">
			<!-- Строка 1: логотип + кнопка корзины -->
			<div class="flex items-center justify-between py-3">
				<a href="/" class="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 transition-colors">
					<Home size={20} />
					<span class="text-base font-bold">Мебель Урала</span>
				</a>
				<a
					href="/cart"
					class="flex items-center gap-1.5 px-3 py-2 rounded-full text-gray-500 hover:bg-[#F9FAFB] transition-colors"
					aria-label="Назад в корзину"
				>
					<ChevronLeft size={16} />
					<ShoppingCart size={16} />
				</a>
			</div>
			<!-- Строка 2: текущий шаг -->
			<div class="flex items-center justify-center border-t border-slate-100 py-2">
				<span class="text-[11px] font-medium text-gray-700">
					{step === 1 ? 'Оформление заказа' : step === 2 ? 'Оплата и доставка' : 'Подтверждение заказа'}
				</span>
			</div>
		</div>

		<!-- Десктопный хедер (md+): 3 колонки -->
		<div class="hidden md:grid grid-cols-3 items-center py-3">
			<!-- Левый блок: логотип -->
			<div class="flex items-center">
				<a href="/" class="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 transition-colors">
					<Home size={20} />
					<span class="text-base font-bold">Мебель Урала</span>
				</a>
			</div>

			<!-- Центральный блок: шаги заказа -->
			<div class="flex items-center justify-center gap-1.5 text-[13px] whitespace-nowrap">
				<span class={step === 1 ? 'text-gray-800 font-medium' : 'text-gray-400'}>Оформление заказа</span>
				<ChevronRight size={12} class="text-gray-300 shrink-0" />
				<span class={step === 2 ? 'text-gray-800 font-medium' : 'text-gray-400'}>Оплата и доставка</span>
				<ChevronRight size={12} class="text-gray-300 shrink-0" />
				<span class={step === 3 ? 'text-gray-800 font-medium' : 'text-gray-400'}>Подтверждение заказа</span>
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

	</div>
</header>

{@render children()}

{#if step !== 3}
<footer class="bg-white border-t border-slate-200 fixed bottom-0 left-0 right-0 z-50">
	<div class="max-w-7xl mx-auto px-4 py-2 md:px-8 md:py-3 grid grid-cols-3 items-center">

		<!-- Левый блок: кнопка назад -->
		<div class="flex items-center">
			<a
				href={backHref}
				class="flex items-center gap-1 text-sm text-gray-600 underline underline-offset-2 hover:text-emerald-700 transition-colors"
			>
				<ChevronLeft size={16} />
				{backLabel}
			</a>
		</div>

		<!-- Центральный блок: прогресс-индикаторы -->
		<div class="flex items-center justify-center gap-2">
			<!-- Mobile (< sm): кружки -->
			<div class="flex sm:hidden items-center gap-3">
				<div class="w-2.5 h-2.5 rounded-full" style="background:{step >= 1 ? '#10b981' : '#e2e8f0'}"></div>
				<div class="w-2.5 h-2.5 rounded-full" style="background:{step >= 2 ? '#10b981' : '#e2e8f0'}"></div>
				<div class="w-2.5 h-2.5 rounded-full" style="background:{step >= 3 ? '#10b981' : '#e2e8f0'}"></div>
			</div>
			<!-- sm+: полоски -->
			<div class="hidden sm:flex flex-1 gap-2">
				<div class="flex-1 h-1.5 rounded-full" style="background:{step >= 1 ? '#10b981' : '#e2e8f0'}"></div>
				<div class="flex-1 h-1.5 rounded-full" style="background:{step >= 2 ? '#10b981' : '#e2e8f0'}"></div>
				<div class="flex-1 h-1.5 rounded-full" style="background:{step >= 3 ? '#10b981' : '#e2e8f0'}"></div>
			</div>
		</div>

		<!-- Правый блок: кнопка продолжить -->
		<div class="flex justify-end">
			<a
				href={continueHref}
				class="flex items-center gap-1.5 px-3 py-2 sm:px-5 sm:py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-full hover:bg-emerald-700 transition-colors"
			>
				<span class="hidden sm:inline">{step === 3 ? 'Оформить заказ' : 'Продолжить'}</span>
				<ChevronRight size={16} />
			</a>
		</div>

	</div>
</footer>
{/if}
