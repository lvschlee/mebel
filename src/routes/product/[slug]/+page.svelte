<script lang="ts">
	// let { data } = $props(); // Будет использоваться для получения реальных данных товара

	import { Heart, Truck, RotateCcw, ShieldCheck, Copy, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import RatingWidget from '$lib/components/RatingWidget.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { cart } from '$lib/stores/cart.svelte';
	import { favorites } from '$lib/stores/favorites.svelte';

	// Hardcoded данные для демонстрации верстки
	const product = {
		name: "Диван угловой 'Комфорт'",
		price: 89990,
		oldPrice: 119990,
		discount: 25,
		rating: 4.8,
		reviewsCount: 112,
		status: "#1 Бестселлер в категории Диваны",
		inStock: "Мало на складе - 2k+ продано на этой неделе",
		mainImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop",
		thumbnails: [
			"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop",
			"https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&h=800&fit=crop",
			"https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=800&fit=crop",
			"https://images.unsplash.com/photo-1550254478-ead40cc54513?w=800&h=800&fit=crop",
		]
	};

	const productId = product.name.toLowerCase().replace(/\s+/g, '-');
	const isFavorited = $derived(favorites.has(productId));

	let selectedImageIndex = $state(0);
	let activeTab = $state<'description' | 'specs'>('description');
	let quantity = $state(1);
	let deliveryOpen = $state(false);
	let returnsOpen = $state(false);
	let paymentOpen = $state(false);

	function prevImage() {
		selectedImageIndex = (selectedImageIndex - 1 + product.thumbnails.length) % product.thumbnails.length;
	}
	function nextImage() {
		selectedImageIndex = (selectedImageIndex + 1) % product.thumbnails.length;
	}

	// Похожие товары
	const relatedProducts = [
		{
			image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
			title: 'Диван прямой "Классик"',
			price: '65 990 ₽',
			oldPrice: '89 990 ₽',
			sold: '230 продано',
			rating: 4.6,
			reviewsCount: 45
		},
		{
			image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&h=400&fit=crop',
			title: 'Кресло "Релакс"',
			price: '29 990 ₽',
			oldPrice: null,
			sold: '150 продано',
			rating: 4.7,
			reviewsCount: 32
		},
		{
			image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
			title: 'Пуф "Комфорт Плюс"',
			price: '12 990 ₽',
			oldPrice: '16 990 ₽',
			sold: '340 продано',
			rating: 4.5,
			reviewsCount: 78
		},
		{
			image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&h=400&fit=crop',
			title: 'Диван угловой "Модерн"',
			price: '95 990 ₽',
			oldPrice: null,
			sold: '120 продано',
			rating: 4.8,
			reviewsCount: 56
		},
	];
</script>

<div class="max-w-7xl mx-auto px-8 py-12">
	<!-- Хлебные крошки -->
	<Breadcrumbs items={[
		{ label: 'Главная', href: '/' },
		{ label: 'Диваны', href: '/category/divany' },
		{ label: product.name, href: '' }
	]} />

	<div class="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 lg:gap-12">
		<!-- Галерея изображений -->
			<div class="flex gap-4">
				<!-- Миниатюры (вертикально слева, только десктоп) -->
				<div class="hidden lg:flex flex-col gap-2 overflow-y-auto">
					{#each product.thumbnails as thumbnail, index (thumbnail)}
						<button
							type="button"
							onclick={() => selectedImageIndex = index}
							class="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-lg border-2 overflow-hidden transition-colors {selectedImageIndex === index ? 'border-emerald-600' : 'border-slate-200 hover:border-slate-300'}"
						>
							<img
								src={thumbnail}
								alt="{product.name} - вид {index + 1}"
								class="w-full h-full object-cover"
							/>
						</button>
					{/each}
				</div>

				<!-- Главное изображение (справа) -->
				<div class="flex-1 self-start relative">
					<img
						src={product.thumbnails[selectedImageIndex]}
						alt={product.name}
						class="w-full h-auto object-cover rounded-2xl"
					/>
					<!-- Стрелки (только мобильные/планшеты) -->
					<button
						type="button"
						onclick={prevImage}
						class="lg:hidden absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
						aria-label="Предыдущее фото"
					>
						<ChevronLeft size={20} class="text-gray-700" />
					</button>
					<button
						type="button"
						onclick={nextImage}
						class="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
						aria-label="Следующее фото"
					>
						<ChevronRight size={20} class="text-gray-700" />
					</button>
					<!-- Точки-индикаторы (только мобильные/планшеты) -->
					<div class="lg:hidden absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
						{#each product.thumbnails as _, i (i)}
							<button
								type="button"
								onclick={() => selectedImageIndex = i}
								class="w-2 h-2 rounded-full transition-colors {selectedImageIndex === i ? 'bg-white' : 'bg-white/50'}"
								aria-label="Фото {i + 1}"
							></button>
						{/each}
					</div>
				</div>
			</div>

		<!-- Блок описания товара -->
		<div class="order-3">
			<!-- Табы -->
			<div class="flex gap-0 border-b border-slate-200 mb-6" role="tablist">
				<button
					type="button"
					role="tab"
					aria-selected={activeTab === 'description'}
					onclick={() => activeTab = 'description'}
					class="px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px {activeTab === 'description' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}"
				>
					О товаре
				</button>
				<button
					type="button"
					role="tab"
					aria-selected={activeTab === 'specs'}
					onclick={() => activeTab = 'specs'}
					class="px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px {activeTab === 'specs' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}"
				>
					Характеристики
				</button>
			</div>

			<!-- Контент табов -->
			{#if activeTab === 'description'}
				<!-- Таб: О товаре -->
				<ul class="space-y-3 list-disc pl-5 text-sm text-gray-600">
					<li>
						<span class="font-semibold text-gray-800">КОМФОРТ И СТИЛЬ</span> — Угловой диван «Комфорт» сочетает в себе современный дизайн и высочайшее качество материалов. Мягкая велюровая обивка обеспечивает приятные тактильные ощущения.
					</li>
					<li>
						<span class="font-semibold text-gray-800">ПРОЧНАЯ КОНСТРУКЦИЯ</span> — Каркас из массива дерева обеспечивает надёжность и долговечность. Механизм трансформации позволяет легко разложить диван для сна.
					</li>
					<li>
						<span class="font-semibold text-gray-800">УДОБНАЯ ПОСАДКА</span> — Наполнитель из пенополиуретана высокой плотности обеспечивает оптимальную поддержку и сохраняет форму на протяжении долгого времени.
					</li>
					<li>
						<span class="font-semibold text-gray-800">ПРАКТИЧНОСТЬ</span> — Вместительный бельевой ящик позволяет хранить постельные принадлежности. Съёмные чехлы легко чистить.
					</li>
					<li>
						<span class="font-semibold text-gray-800">В КОМПЛЕКТЕ</span> — Угловой диван, 3 декоративные подушки, инструкция по сборке.
					</li>
				</ul>
			{:else}
				<!-- Таб: Характеристики -->
				<div class="space-y-3">
					<div class="flex items-baseline justify-between gap-2">
						<span class="text-sm text-gray-500 shrink-0">Артикул</span>
						<span class="flex-1 border-b border-dotted border-slate-300 mx-2 mb-1"></span>
						<span class="text-sm text-gray-800 shrink-0 flex items-center gap-2">
							89990001
							<button type="button" class="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Копировать артикул">
								<Copy size={14} />
							</button>
						</span>
					</div>
					<div class="flex items-baseline justify-between gap-2">
						<span class="text-sm text-gray-500 shrink-0">Цвет</span>
						<span class="flex-1 border-b border-dotted border-slate-300 mx-2 mb-1"></span>
						<span class="text-sm text-gray-800 shrink-0">Серый</span>
					</div>
					<div class="flex items-baseline justify-between gap-2">
						<span class="text-sm text-gray-500 shrink-0">Бренд</span>
						<span class="flex-1 border-b border-dotted border-slate-300 mx-2 mb-1"></span>
						<span class="text-sm text-gray-800 shrink-0">Мебель Урала</span>
					</div>
					<div class="flex items-baseline justify-between gap-2">
						<span class="text-sm text-gray-500 shrink-0">Материал обивки</span>
						<span class="flex-1 border-b border-dotted border-slate-300 mx-2 mb-1"></span>
						<span class="text-sm text-gray-800 shrink-0">Велюр</span>
					</div>
					<div class="flex items-baseline justify-between gap-2">
						<span class="text-sm text-gray-500 shrink-0">Материал каркаса</span>
						<span class="flex-1 border-b border-dotted border-slate-300 mx-2 mb-1"></span>
						<span class="text-sm text-gray-800 shrink-0">Массив дерева</span>
					</div>
					<div class="flex items-baseline justify-between gap-2">
						<span class="text-sm text-gray-500 shrink-0">Размеры (Ш×Г×В)</span>
						<span class="flex-1 border-b border-dotted border-slate-300 mx-2 mb-1"></span>
						<span class="text-sm text-gray-800 shrink-0">250×160×85 см</span>
					</div>
					<div class="flex items-baseline justify-between gap-2">
						<span class="text-sm text-gray-500 shrink-0">Вес</span>
						<span class="flex-1 border-b border-dotted border-slate-300 mx-2 mb-1"></span>
						<span class="text-sm text-gray-800 shrink-0">95 кг</span>
					</div>
					<div class="flex items-baseline justify-between gap-2">
						<span class="text-sm text-gray-500 shrink-0">Наполнитель</span>
						<span class="flex-1 border-b border-dotted border-slate-300 mx-2 mb-1"></span>
						<span class="text-sm text-gray-800 shrink-0">Пенополиуретан</span>
					</div>
					<div class="flex items-baseline justify-between gap-2">
						<span class="text-sm text-gray-500 shrink-0">Спальное место</span>
						<span class="flex-1 border-b border-dotted border-slate-300 mx-2 mb-1"></span>
						<span class="text-sm text-gray-800 shrink-0">200×140 см</span>
					</div>
					<div class="flex items-baseline justify-between gap-2">
						<span class="text-sm text-gray-500 shrink-0">Механизм</span>
						<span class="flex-1 border-b border-dotted border-slate-300 mx-2 mb-1"></span>
						<span class="text-sm text-gray-800 shrink-0">Дельфин</span>
					</div>
				</div>
			{/if}
		</div>

		<!-- Правая колонка: Информация о товаре -->
		<div class="flex flex-col gap-6 order-2 lg:row-span-2">
		<!-- 1. Название товара -->
		<h1 class="text-3xl md:text-4xl font-medium text-gray-800 leading-tight">
			{product.name}
		</h1>

		<!-- 2. Badge бестселлера (оранжевый) -->
		<div class="flex items-center gap-2 flex-wrap">
			<span class="inline-flex items-center bg-orange-500 text-white text-xs px-2 py-1 rounded font-semibold">
				#1 БЕСТСЕЛЛЕР
			</span>
			<a
				href="/category/divany"
				class="text-sm text-gray-600 hover:text-emerald-600 transition-colors"
			>
				в категории Диваны →
			</a>
		</div>

		<!-- 3. Рейтинг -->
		<RatingWidget rating={product.rating} reviewsCount={product.reviewsCount} size="sm" starColor="gray" />

		<!-- Блок покупки (цена, кнопки, доставка) -->
		<div class="border border-slate-200 rounded-2xl p-5 flex flex-col gap-4">
			<!-- Цена и скидка -->
			<div>
				<div class="flex items-baseline justify-between gap-3">
					<div class="flex items-baseline gap-3 flex-wrap">
						<span class="text-3xl md:text-4xl font-bold text-gray-800">
							{product.price.toLocaleString('ru-RU')} ₽
						</span>
						<span class="text-lg text-gray-500 line-through">
							{product.oldPrice.toLocaleString('ru-RU')} ₽
						</span>
					</div>
					<button
						type="button"
						class="shrink-0 w-10 h-10 border rounded-lg flex items-center justify-center transition-colors
							{isFavorited ? 'border-emerald-600 bg-emerald-50 hover:bg-emerald-100' : 'border-slate-200 hover:bg-slate-50 hover:border-emerald-600'}"
						aria-label={isFavorited ? 'Убрать из избранного' : 'Добавить в избранное'}
						onclick={() => favorites.toggle({ id: productId, name: product.name, price: product.price, image: product.mainImage })}
					>
						<Heart size={20} class={isFavorited ? 'text-emerald-600 fill-emerald-600' : 'text-slate-500'} />
					</button>
				</div>
				<div class="mt-2">
					<span class="inline-flex items-center text-xs border border-orange-500 text-orange-600 px-2 py-1 rounded font-medium">
						-{product.discount}% Ограниченное предложение
					</span>
				</div>
			</div>

		<!-- Наличие и выбор количества -->
		<div class="flex items-center justify-between gap-4">
			<div class="flex flex-col gap-1">
				<span class="text-sm text-orange-600 font-medium">
					Мало на складе
				</span>
				<span class="text-sm text-gray-600">
					2k+ продано на этой неделе
				</span>
			</div>
			<div class="flex items-center gap-2 min-w-30">
				<label for="quantity" class="text-sm font-medium text-gray-800 shrink-0">
					Кол-во:
				</label>
			<select
				id="quantity"
				bind:value={quantity}
				class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
			>
				{#each Array(10) as _, index (index)}
					<option value={index + 1}>{index + 1}</option>
				{/each}
			</select>
			</div>
		</div>

		<!-- Кнопки действий -->
		<div class="flex flex-col gap-3">
			<button
				type="button"
				onclick={() => {
					cart.addItem({
						id: product.name.toLowerCase().replace(/\s+/g, '-'),
						name: product.name,
						price: product.price,
						image: product.mainImage
					}, quantity);
				}}
				class="w-full bg-emerald-600 text-white py-3 px-6 rounded-full font-medium hover:bg-emerald-700 transition-colors"
			>
				В корзину
			</button>
			<button
				type="button"
				class="w-full border border-emerald-600 text-emerald-600 py-3 px-6 rounded-full font-medium hover:bg-emerald-50 transition-colors"
			>
				Купить сейчас
			</button>
		</div>

			<!-- Информация о доставке и гарантиях -->
			<div class="space-y-0">
				<!-- Бесплатная доставка -->
				<div class="border-t border-slate-200">
					<button type="button" onclick={() => deliveryOpen = !deliveryOpen}
						class="w-full flex items-center gap-3 py-4 text-left lg:cursor-default"
					>
						<div class="shrink-0 w-5 h-5">
							<Truck size={20} class="text-emerald-600" />
						</div>
						<span class="flex-1 text-sm font-semibold text-gray-800">Бесплатная доставка на все заказы</span>
						<ChevronDown size={16} class="lg:hidden shrink-0 text-gray-400 transition-transform duration-200 {deliveryOpen ? 'rotate-180' : ''}" />
					</button>
					<div class="{deliveryOpen ? '' : 'hidden'} lg:block pb-4 pl-8">
						<p class="text-sm text-gray-600">
							Доставка: <span class="text-emerald-600 font-medium">БЕСПЛАТНО</span> 4-7 февраля
						</p>
						<p class="text-sm text-gray-600">
							Адрес доставки: <button type="button" onclick={() => {}} class="text-emerald-600 hover:underline">Москва 11223</button>
						</p>
					</div>
				</div>

				<!-- Возврат товара -->
				<div class="border-t border-slate-200">
					<button type="button" onclick={() => returnsOpen = !returnsOpen}
						class="w-full flex items-center gap-3 py-4 text-left lg:cursor-default"
					>
						<div class="shrink-0 w-5 h-5">
							<RotateCcw size={20} class="text-emerald-600" />
						</div>
						<span class="flex-1 text-sm font-semibold text-gray-800">Возврат в течение 30 дней</span>
						<ChevronDown size={16} class="lg:hidden shrink-0 text-gray-400 transition-transform duration-200 {returnsOpen ? 'rotate-180' : ''}" />
					</button>
					<div class="{returnsOpen ? '' : 'hidden'} lg:block pb-4 pl-8">
						<p class="text-sm text-gray-600">
							Не устраивает товар? Верните любой товар в течение 30 дней после покупки для полного возврата средств или обмена. <button type="button" onclick={() => {}} class="text-emerald-600 hover:underline">Подробнее</button>
						</p>
					</div>
				</div>

				<!-- Безопасная оплата -->
				<div class="border-t border-slate-200">
					<button type="button" onclick={() => paymentOpen = !paymentOpen}
						class="w-full flex items-center gap-3 py-4 text-left lg:cursor-default"
					>
						<div class="shrink-0 w-5 h-5">
							<ShieldCheck size={20} class="text-emerald-600" />
						</div>
						<span class="flex-1 text-sm font-semibold text-gray-800">Безопасная оплата</span>
						<ChevronDown size={16} class="lg:hidden shrink-0 text-gray-400 transition-transform duration-200 {paymentOpen ? 'rotate-180' : ''}" />
					</button>
					<div class="{paymentOpen ? '' : 'hidden'} lg:block pb-4 pl-8">
						<p class="text-sm text-gray-600 mb-2">
							Делайте покупки с уверенностью, используя нашу зашифрованную систему платежей, которая защищает вашу конфиденциальную информацию.
						</p>
						<div class="flex items-center gap-2 flex-wrap">
							<div class="h-7 px-2 border border-slate-200 rounded flex items-center justify-center bg-white">
								<span class="text-xs font-semibold text-blue-600">VISA</span>
							</div>
							<div class="h-7 px-2 border border-slate-200 rounded flex items-center justify-center bg-white">
								<span class="text-xs font-semibold">
									<span class="text-red-600">Master</span><span class="text-orange-500">Card</span>
								</span>
							</div>
							<div class="h-7 px-2 border border-slate-200 rounded flex items-center justify-center bg-white">
								<span class="text-xs font-semibold text-blue-800">МИР</span>
							</div>
							<div class="h-7 px-2 border border-slate-200 rounded flex items-center justify-center bg-white">
								<span class="text-xs font-semibold text-gray-700">СБП</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Продавец/Бренд -->
				<div class="border-t border-slate-200">
					<div class="flex items-center gap-3 py-4">
						<div class="shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
							<span class="text-lg font-bold text-gray-800">МУ</span>
						</div>
						<div class="flex-1">
							<p class="text-sm font-semibold text-gray-800 mb-1">Мебель Урала</p>
							<div class="flex items-center gap-2 text-xs text-gray-600">
								<span class="flex items-center gap-1">
									<span class="font-semibold text-gray-800">4.7</span> (12k+ отзывов)
								</span>
								<span>·</span>
								<span>43K+ Продано</span>
							</div>
						</div>
					</div>
					<div class="grid grid-cols-2 gap-3 pb-4">
						<button
							type="button"
							class="text-sm text-gray-700 py-2 px-4 border border-slate-200 rounded-full hover:bg-gray-50 transition-colors"
						>
							Профиль
						</button>
						<button
							type="button"
							class="text-sm text-gray-700 py-2 px-4 border border-slate-200 rounded-full hover:bg-gray-50 transition-colors"
						>
							Все товары
						</button>
					</div>
				</div>
			</div>
		</div>
		</div>
	</div>
</div>

<!-- Секция похожих товаров -->
<div class="max-w-7xl mx-auto px-8 pb-12">
	<div class="flex items-center justify-between mb-6">
		<h2 class="text-2xl font-semibold text-gray-800">Вам понравится</h2>
		<a href="/catalog" class="text-sm text-emerald-600 hover:underline">
			Смотреть все →
		</a>
	</div>
	
	<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
		{#each relatedProducts as product}
			<ProductCard
				image={product.image}
				title={product.title}
				price={product.price}
				oldPrice={product.oldPrice}
				sold={product.sold}
				rating={product.rating}
				reviewsCount={product.reviewsCount}
			/>
		{/each}
	</div>
</div>
