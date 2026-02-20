<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
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

{@render children()}

<footer class="bg-white border-t border-slate-200">
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
				Продолжить
				<ChevronRight size={16} />
			</a>
		</div>

	</div>
</footer>
