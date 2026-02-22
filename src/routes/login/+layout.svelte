<script lang="ts">
	import { Sofa } from 'lucide-svelte';

	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col">

	<header class="w-full bg-white border-b border-slate-200">
		<div class="max-w-7xl mx-auto px-8 py-4 flex justify-center">
			<a href="/" class="flex items-center gap-2">
				<Sofa size={26} class="text-emerald-600" />
				<span class="text-lg font-bold text-slate-900">Мебель Урала</span>
			</a>
		</div>
	</header>

	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="w-full border-t border-slate-200">
		<div class="max-w-7xl mx-auto px-8 py-4 flex items-center justify-center gap-3">
			<span class="text-sm font-medium text-gray-500">© 2026 Мебель Урала</span>
			<div class="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
			<a href="/terms" class="text-sm font-medium text-gray-500 hover:text-gray-700 border-b border-gray-400 hover:border-gray-700 transition-colors">Пользовательское соглашение</a>
			<div class="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
			<a href="/privacy" class="text-sm font-medium text-gray-500 hover:text-gray-700 border-b border-gray-400 hover:border-gray-700 transition-colors">Политика конфиденциальности</a>
		</div>
	</footer>

</div>
