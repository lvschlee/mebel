<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	const showHeaderFooter = $derived(!page.url.pathname.startsWith('/checkout') && !page.url.pathname.startsWith('/login'));
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{#if showHeaderFooter}<Header />{/if}
{@render children()}
{#if showHeaderFooter}<Footer />{/if}
