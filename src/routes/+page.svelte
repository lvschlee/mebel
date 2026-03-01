<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import {
		ArrowRight,
		ChevronLeft,
		ChevronRight,
		Truck,
		ShieldCheck,
		RotateCcw
	} from 'lucide-svelte';

	const slides = [
		{
			title: 'Мебель для вашего дома',
			subtitle: 'Широкий выбор качественной мебели с доставкой по Уралу',
			buttonText: 'Перейти в каталог',
			buttonHref: '/catalog',
			image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&h=600&fit=crop',
			overlayClass: 'bg-emerald-900/60',
			textClass: 'text-white',
			subTextClass: 'text-emerald-100',
			buttonClass: 'bg-white text-emerald-700 hover:bg-emerald-50'
		},
		{
			title: 'Новинки весенней коллекции',
			subtitle: 'Свежие решения для интерьера — уже в продаже',
			buttonText: 'Смотреть новинки',
			buttonHref: '/new',
			image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&h=600&fit=crop',
			overlayClass: 'bg-slate-900/50',
			textClass: 'text-white',
			subTextClass: 'text-slate-200',
			buttonClass: 'bg-white text-slate-800 shadow hover:bg-slate-50'
		},
		{
			title: 'Распродажа — до −40%',
			subtitle: 'Успейте купить любимые модели по сниженным ценам',
			buttonText: 'Смотреть акции',
			buttonHref: '/sale',
			image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1400&h=600&fit=crop',
			overlayClass: 'bg-amber-900/55',
			textClass: 'text-white',
			subTextClass: 'text-amber-100',
			buttonClass: 'bg-white text-amber-600 hover:bg-amber-50'
		}
	];

	const categories = [
		{ label: 'Диваны и кресла',   href: '/catalog/sofas',     image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop' },
		{ label: 'Кровати и матрасы', href: '/catalog/beds',       image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=400&fit=crop' },
		{ label: 'Шкафы и хранение',  href: '/catalog/wardrobes',  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop' },
		{ label: 'Столы и стулья',    href: '/catalog/tables',     image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=400&fit=crop' },
		{ label: 'Детская мебель',    href: '/catalog/kids',       image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop' },
		{ label: 'Кухонная мебель',   href: '/catalog/kitchen',    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop' },
		{ label: 'Офисная мебель',    href: '/catalog/office',     image: 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=400&h=400&fit=crop' },
		{ label: 'Освещение',         href: '/catalog/lighting',   image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&h=400&fit=crop' }
	];

	const hits = [
		{ image: 'https://mebel74.com/images/small/stol-mory-ms-16-2-yny-75359-1.jpg', title: 'Диван угловой «Марсель»', price: '24 990 ₽', oldPrice: '32 000 ₽', sold: '2k+ продано', rating: 4, reviewsCount: 590, badge: 'Хит продаж' },
		{ image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop', title: 'Кресло «Луна»', price: '12 500 ₽', oldPrice: null, sold: '850 продано', rating: 5, reviewsCount: 214, badge: 'Новинка' },
		{ image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=400&fit=crop', title: 'Кровать «Скандия» 160×200', price: '38 900 ₽', oldPrice: '47 000 ₽', sold: '1.2k+ продано', rating: 4, reviewsCount: 381, badge: null },
		{ image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop', title: 'Шкаф-купе «Стиль» 3-х дверный', price: '29 700 ₽', oldPrice: null, sold: '430 продано', rating: 4, reviewsCount: 97, badge: null },
		{ image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=400&fit=crop', title: 'Стол обеденный «Лофт»', price: '18 200 ₽', oldPrice: '22 000 ₽', sold: '670 продано', rating: 5, reviewsCount: 143, badge: 'Акция' },
		{ image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop', title: 'Диван прямой «Токио»', price: '16 490 ₽', oldPrice: '19 900 ₽', sold: '3k+ продано', rating: 4, reviewsCount: 812, badge: 'Почти распродано' },
		{ image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=400&fit=crop', title: 'Комод «Нордик» 6 ящиков', price: '9 990 ₽', oldPrice: null, sold: '290 продано', rating: 4, reviewsCount: 68, badge: null },
		{ image: 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=400&h=400&fit=crop', title: 'Кресло офисное «Эрго»', price: '14 800 ₽', oldPrice: '18 500 ₽', sold: '1.5k+ продано', rating: 5, reviewsCount: 467, badge: 'Выбор редакции' }
	];

	const offerCards = [
		{ image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=400&h=400&fit=crop', title: 'Пуф «Velvet» бархатный', price: '4 990 ₽', oldPrice: '7 200 ₽', sold: '1.1k+ продано', rating: 5, reviewsCount: 312, badge: 'Эксклюзив' },
		{ image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=400&h=400&fit=crop', title: 'Стеллаж «Модерн» открытый', price: '11 400 ₽', oldPrice: null, sold: '560 продано', rating: 4, reviewsCount: 89, badge: null },
		{ image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&h=400&fit=crop', title: 'Кухонный гарнитур «Лион»', price: '64 900 ₽', oldPrice: '79 000 ₽', sold: '230 продано', rating: 5, reviewsCount: 54, badge: 'Скидка −18%' },
		{ image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop', title: 'Диван-кровать «Норд»', price: '21 300 ₽', oldPrice: '26 500 ₽', sold: '740 продано', rating: 4, reviewsCount: 178, badge: null },
		{ image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=400&fit=crop', title: 'Стол барный «Loft» высокий', price: '8 750 ₽', oldPrice: null, sold: '390 продано', rating: 4, reviewsCount: 61, badge: null },
		{ image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=400&fit=crop', title: 'Тумба TV «Slim» белая', price: '6 200 ₽', oldPrice: '8 900 ₽', sold: '920 продано', rating: 5, reviewsCount: 203, badge: 'Акция' },
	];

	const OFFER_VISIBLE = 4;
	let offerIdx = $state(0);
	const offerMax = $derived(offerCards.length - OFFER_VISIBLE);

	function offerPrev() { offerIdx = Math.max(0, offerIdx - 1); }
	function offerNext() { offerIdx = Math.min(offerMax, offerIdx + 1); }

	let currentSlide = $state(0);
	let heroPaused = $state(false);

	function goTo(index: number) {
		currentSlide = ((index % slides.length) + slides.length) % slides.length;
	}

	$effect(() => {
		if (heroPaused) return;
		const timer = setInterval(() => {
			currentSlide = (currentSlide + 1) % slides.length;
		}, 7000);
		return () => clearInterval(timer);
	});
</script>

<!-- Hero слайдер -->
<div class="max-w-7xl mx-auto px-4 md:px-8 pt-6 md:pt-8">
	<div
		class="relative rounded-2xl overflow-hidden h-68.5 sm:h-76.5 md:h-92.5"
		onmouseenter={() => heroPaused = true}
		onmouseleave={() => heroPaused = false}
	>
		{#each slides as slide, i}
			<div
				class="absolute inset-0 transition-opacity duration-500 {i === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}"
			>
				<!-- Фоновое изображение -->
				<img
					src={slide.image}
					alt={slide.title}
					class="absolute inset-0 w-full h-full object-cover"
					loading={i === 0 ? 'eager' : 'lazy'}
				/>
				<!-- Затемняющий оверлей -->
				<div class="absolute inset-0 {slide.overlayClass}"></div>
				<!-- Контент -->
				<div class="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 md:px-16 gap-4">
					<h1 class="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight {slide.textClass}">
						{slide.title}
					</h1>
					<p class="text-sm md:text-base max-w-md {slide.subTextClass}">
						{slide.subtitle}
					</p>
					<a
						href={slide.buttonHref}
						class="inline-flex items-center gap-2 px-6 py-2.5 md:py-3 font-semibold rounded-full transition-colors text-sm md:text-base {slide.buttonClass}"
					>
						{slide.buttonText}
						<ArrowRight size={16} />
					</a>
				</div>
			</div>
		{/each}

		<!-- Стрелка назад -->
		<button
			onclick={() => goTo(currentSlide - 1)}
			class="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 items-center justify-center rounded-full bg-black/20 hover:bg-black/35 text-white transition-colors"
			aria-label="Предыдущий слайд"
		>
			<ChevronLeft size={20} />
		</button>

		<!-- Стрелка вперёд -->
		<button
			onclick={() => goTo(currentSlide + 1)}
			class="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 items-center justify-center rounded-full bg-black/20 hover:bg-black/35 text-white transition-colors"
			aria-label="Следующий слайд"
		>
			<ChevronRight size={20} />
		</button>

		<!-- Точки навигации -->
		<div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
			{#each slides as _, i}
				<button
					onclick={() => goTo(i)}
					class="rounded-full transition-all duration-300 {i === currentSlide ? 'w-3 h-3 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}"
					aria-label="Слайд {i + 1}"
				></button>
			{/each}
		</div>
	</div>
</div>

<!-- Категории -->
<section class="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
	<div class="flex items-center justify-between mb-6 md:mb-8">
		<h2 class="text-xl md:text-2xl font-bold text-gray-800">Популярные категории</h2>
		<a href="/catalog" class="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors">
			Перейти в каталог
			<ArrowRight size={16} />
		</a>
	</div>
	<div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[80px] md:auto-rows-[95px]">
		{#each categories as cat, i}
			<a
				href={cat.href}
				class="relative rounded-2xl overflow-hidden group
				       {i === 0 ? 'md:col-span-2 md:row-span-2' : ''}
				       {i === 7 ? 'md:col-span-2' : ''}"
			>
				<img
					src={cat.image}
					alt={cat.label}
					class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
					loading="lazy"
				/>
				<div class="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-transparent"></div>
				<span class="absolute bottom-0 left-0 right-0 p-3 md:p-4 font-semibold text-white leading-tight
				             {i === 0 ? 'text-base md:text-xl' : 'text-sm md:text-base'}">
					{cat.label}
				</span>
			</a>
		{/each}
	</div>
</section>

<!-- Хиты продаж -->
<section class="max-w-7xl mx-auto px-4 md:px-8 pb-12 md:pb-16">
	<div class="flex items-center justify-between mb-6 md:mb-8">
		<h2 class="text-xl md:text-2xl font-bold text-gray-800">Хиты продаж</h2>
		<a
			href="/catalog"
			class="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
		>
			Смотреть все
			<ArrowRight size={16} />
		</a>
	</div>
	<div class="grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-6 md:gap-y-10">
		{#each hits as product}
			<ProductCard {...product} />
		{/each}
	</div>
	<div class="mt-10 flex justify-center">
		<a href="/catalog" class="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-sm font-medium transition-colors">
			Показать ещё
		</a>
	</div>
</section>

<!-- Баннер перехода в каталог -->
<section class="max-w-7xl mx-auto px-4 md:px-8 pb-12 md:pb-16">
	<div class="rounded-2xl overflow-hidden py-8 sm:py-0 sm:h-38 md:h-46 bg-linear-to-br from-slate-700 to-slate-900 flex items-center px-8 md:px-16">
		<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
			<div class="flex flex-col gap-1.5">
				<h2 class="text-xl md:text-2xl font-bold text-white">Весь ассортимент мебели — в одном месте</h2>
				<p class="text-sm text-slate-400">Более 5 000 товаров с фильтрами, сортировкой и быстрой доставкой</p>
			</div>
			<a
				href="/catalog"
				class="shrink-0 self-center sm:self-auto inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 font-semibold rounded-full transition-colors text-sm whitespace-nowrap"
			>
				Перейти в каталог
				<ArrowRight size={16} />
			</a>
		</div>
	</div>
</section>

<!-- Уникальные предложения -->
<section class="max-w-7xl mx-auto px-4 md:px-8 pb-12 md:pb-16">
	<h2 class="text-xl md:text-2xl font-bold text-gray-800 mb-6 md:mb-8">Уникальные предложения</h2>

	<!-- Мобиль: горизонтальный scroll-snap -->
	<div class="sm:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 scrollbar-none">
		{#each offerCards as card}
			<div class="shrink-0 snap-start w-[calc(50%-8px)]">
				<ProductCard {...card} />
			</div>
		{/each}
	</div>

	<!-- Десктоп: карусель со стрелками -->
	<div class="hidden sm:block relative">
		<!-- Стрелка влево -->
		<button
			onclick={offerPrev}
			disabled={offerIdx === 0}
			class="absolute left-0 top-0 bottom-0 z-10 w-14 flex items-center justify-start disabled:opacity-0 transition-opacity"
			aria-label="Назад"
		>
			<span class="w-9 h-9 flex items-center justify-center bg-white rounded-full shadow border border-slate-100 text-slate-600 -translate-y-5">
				<ChevronLeft size={18} />
			</span>
		</button>

		<!-- Трек карточек -->
		<div class="overflow-hidden">
			<div
				class="flex gap-6 transition-transform duration-300"
				style="transform: translateX(calc(-{offerIdx} * (25% + 6px)))"
			>
				{#each offerCards as card}
					<div class="shrink-0" style="width: calc(25% - 18px)">
						<ProductCard {...card} />
					</div>
				{/each}
			</div>
		</div>

		<!-- Стрелка вправо -->
		<button
			onclick={offerNext}
			disabled={offerIdx >= offerMax}
			class="absolute right-0 top-0 bottom-0 z-10 w-14 flex items-center justify-end disabled:opacity-0 transition-opacity"
			aria-label="Вперёд"
		>
			<span class="w-9 h-9 flex items-center justify-center bg-white rounded-full shadow border border-slate-100 text-slate-600 -translate-y-5">
				<ChevronRight size={18} />
			</span>
		</button>
	</div>
</section>

<!-- Преимущества -->
<section class="bg-slate-50 border-t border-slate-100">
	<div class="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
		<div class="flex flex-col items-center text-center gap-2">
			<Truck size={28} class="text-emerald-600 mb-1" />
			<h3 class="text-sm font-semibold text-slate-800">Быстрая доставка</h3>
			<p class="text-sm text-slate-500">Доставим по Екатеринбургу за 1–2 дня, по Уралу — за 3–5 дней</p>
		</div>
		<div class="flex flex-col items-center text-center gap-2">
			<ShieldCheck size={28} class="text-emerald-600 mb-1" />
			<h3 class="text-sm font-semibold text-slate-800">Гарантия качества</h3>
			<p class="text-sm text-slate-500">Все товары сертифицированы. Гарантия от производителя до 5 лет</p>
		</div>
		<div class="flex flex-col items-center text-center gap-2">
			<RotateCcw size={28} class="text-emerald-600 mb-1" />
			<h3 class="text-sm font-semibold text-slate-800">Лёгкий возврат</h3>
			<p class="text-sm text-slate-500">Не подошло — вернём деньги в течение 14 дней без лишних вопросов</p>
		</div>
	</div>
</section>
