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
</header>

{@render children()}

{#if step !== 3}
<footer class="bg-white border-t border-slate-200 fixed bottom-0 left-0 right-0 z-50">
	<div class="max-w-[1280px] mx-auto px-8 py-3 grid grid-cols-3 items-center">

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

		<!-- Центральный блок: прогресс-бары -->
		<div class="flex items-center gap-2">
			<div class="flex-1 h-1.5 rounded-full" style="background:{step >= 1 ? '#10b981' : '#e2e8f0'}"></div>
			<div class="flex-1 h-1.5 rounded-full" style="background:{step >= 2 ? '#10b981' : '#e2e8f0'}"></div>
			<div class="flex-1 h-1.5 rounded-full" style="background:{step >= 3 ? '#10b981' : '#e2e8f0'}"></div>
		</div>

		<!-- Правый блок: кнопка продолжить -->
		<div class="flex justify-end">
			<a
				href={continueHref}
				class="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-full hover:bg-emerald-700 transition-colors"
			>
				{step === 3 ? 'Оформить заказ' : 'Продолжить'}
				<ChevronRight size={16} />
			</a>
		</div>

	</div>
</footer>
{/if}
