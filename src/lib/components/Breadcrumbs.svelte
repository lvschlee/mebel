<script lang="ts">
	import { ChevronRight } from 'lucide-svelte';

	type BreadcrumbItem = {
		label: string;
		href: string;
	};

	let {
		items
	}: {
		items: BreadcrumbItem[];
	} = $props();
</script>

<nav aria-label="Breadcrumb" class="mb-6">
	<ol class="flex items-center gap-2 flex-wrap text-sm">
		{#each items as item, index (item.href)}
			{#if index > 0}
				<li class="text-gray-400">
					<ChevronRight size={16} />
				</li>
			{/if}
			<li>
				{#if index === items.length - 1}
					<span class="text-gray-800 font-medium">
						{item.label}
					</span>
				{:else}
					<a href={item.href} class="text-gray-600 hover:text-emerald-600 transition-colors">
						{item.label}
					</a>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
