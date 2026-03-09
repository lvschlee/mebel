<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let visible = $state(false);

	onMount(() => {
		const consent = localStorage.getItem('cookie_consent');
		if (!consent) {
			visible = true;
		}
	});

	function accept() {
		localStorage.setItem('cookie_consent', 'accepted');
		visible = false;
	}

	function reject() {
		localStorage.setItem('cookie_consent', 'rejected');
		visible = false;
	}
</script>

{#if visible}
	<div
		class="fixed bottom-0 left-0 right-0 z-50"
		transition:fly={{ y: 80, duration: 300 }}
	>
		<div class="bg-white border-t border-slate-100 shadow-[0_-4px_24px_-4px_rgb(0,0,0,0.10)]">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
				<div class="flex-1 min-w-0">
					<p class="text-sm text-gray-700 leading-relaxed">
						Мы используем файлы cookie для улучшения работы сайта и анализа посещаемости.
						Продолжая использовать сайт, вы соглашаетесь с их использованием.
						<a href="/privacy" class="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 whitespace-nowrap">
							Политика конфиденциальности
						</a>
					</p>
				</div>
				<div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto shrink-0">
					<button
						onclick={reject}
						class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-slate-200 rounded-full hover:bg-gray-50 transition-colors w-full sm:w-auto"
					>
						Отклонить
					</button>
					<button
						onclick={accept}
						class="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition-colors w-full sm:w-auto"
					>
						Принять все
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
