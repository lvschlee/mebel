<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import SidebarFilter from '$lib/components/SidebarFilter.svelte';
</script>

<div class="max-w-[1280px] mx-auto px-8 py-8">
	<div class="flex gap-8">
		<div class="flex flex-col">
			<h2 class="text-2xl font-bold text-gray-800 mb-8">Популярные товары</h2>
			<div class="border-r border-gray-200 pr-8 flex-1">
				<SidebarFilter />
			</div>
		</div>
		<div class="flex-1">
			<div class="flex justify-end mb-8">
				<select class="border border-slate-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
					<option value="">Сортировать по</option>
					<option value="popular">Популярности</option>
					<option value="price_asc">Цене: по возрастанию</option>
					<option value="price_desc">Цене: по убыванию</option>
					<option value="rating">Рейтингу</option>
					<option value="new">Новинкам</option>
				</select>
			</div>
			<div class="grid grid-cols-3 gap-6">
	<ProductCard
		image="https://mebel74.com/images/small/stol-mory-ms-16-2-yny-75359-1.jpg"
		title="Диван угловой"
		price="24 990 ₽"
		oldPrice="32 000 ₽"
		sold="2k+ продано"
		rating={4}
		reviewsCount={590}
	/>
	<ProductCard
		image="https://mebel74.com/images/small/stol-mory-ms-16-2-yny-75359-1.jpg"
		title="Диван угловой"
		price="24 990 ₽"
		oldPrice="32 000 ₽"
		sold="2k+ продано"
		rating={4}
		reviewsCount={590}
	/>
	<ProductCard
		image="https://mebel74.com/images/small/stol-mory-ms-16-2-yny-75359-1.jpg"
		title="Диван угловой"
		price="24 990 ₽"
		oldPrice="32 000 ₽"
		sold="2k+ продано"
		rating={4}
		reviewsCount={590}
	/>
	<ProductCard
		image="https://mebel74.com/images/small/stol-mory-ms-16-2-yny-75359-1.jpg"
		title="Диван угловой"
		price="24 990 ₽"
		oldPrice="32 000 ₽"
		sold="2k+ продано"
		rating={4}
		reviewsCount={590}
	/>
	<ProductCard
		image="https://mebel74.com/images/small/stol-mory-ms-16-2-yny-75359-1.jpg"
		title="Диван угловой"
		price="24 990 ₽"
		oldPrice="32 000 ₽"
		sold="2k+ продано"
		rating={4}
		reviewsCount={590}
	/>
	<ProductCard
		image="https://mebel74.com/images/small/stol-mory-ms-16-2-yny-75359-1.jpg"
		title="Диван угловой"
		price="24 990 ₽"
		oldPrice="32 000 ₽"
		sold="2k+ продано"
		rating={4}
		reviewsCount={590}
	/>
	<ProductCard
		image="https://mebel74.com/images/small/stol-mory-ms-16-2-yny-75359-1.jpg"
		title="Диван угловой"
		price="24 990 ₽"
		oldPrice="32 000 ₽"
		sold="2k+ продано"
		rating={4}
		reviewsCount={590}
	/>
	<ProductCard
		image="https://mebel74.com/images/small/stol-mory-ms-16-2-yny-75359-1.jpg"
		title="Диван угловой"
		price="24 990 ₽"
		oldPrice="32 000 ₽"
		sold="2k+ продано"
		rating={4}
		reviewsCount={590}
	/>
	<ProductCard
		image="https://mebel74.com/images/small/stol-mory-ms-16-2-yny-75359-1.jpg"
		title="Диван угловой"
		price="24 990 ₽"
		oldPrice="32 000 ₽"
		sold="2k+ продано"
		rating={4}
		reviewsCount={590}
	/>
	<ProductCard
		image="https://mebel74.com/images/small/stol-mory-ms-16-2-yny-75359-1.jpg"
		title="Диван угловой"
		price="24 990 ₽"
		oldPrice="32 000 ₽"
		sold="2k+ продано"
		rating={4}
		reviewsCount={590}
	/>
	<ProductCard
		image="https://mebel74.com/images/small/stol-mory-ms-16-2-yny-75359-1.jpg"
		title="Диван угловой"
		price="24 990 ₽"
		oldPrice="32 000 ₽"
		sold="2k+ продано"
		rating={4}
		reviewsCount={590}
	/>
	<ProductCard
		image="https://mebel74.com/images/small/stol-mory-ms-16-2-yny-75359-1.jpg"
		title="Диван угловой"
		price="24 990 ₽"
		oldPrice="32 000 ₽"
		sold="2k+ продано"
		rating={4}
		reviewsCount={590}
	/>
	</div>
		</div>
	</div>
</div>
