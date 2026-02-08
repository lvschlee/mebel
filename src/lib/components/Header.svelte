<script lang="ts">
	import {
		MapPin,
		Home,
		Menu,
		Search,
		Heart,
		ShoppingCart,
		Tag,
		Sparkles,
		Clock,
		Lightbulb,
		Sofa
	} from 'lucide-svelte';
</script>

<header class="w-full bg-white border-b border-slate-200">
	<!-- Верхняя панель -->
	<div class="max-w-[1280px] mx-auto px-8 flex items-center justify-between py-2">
		<div class="flex items-center gap-1 text-sm text-gray-600">
			<MapPin size={16} />
			<span>Челябинск</span>
		</div>
		<div class="flex items-center gap-3">
			<button
				class="px-4 py-2 text-sm font-semibold text-emerald-600 border border-emerald-600 rounded-full hover:bg-emerald-50 transition-colors"
			>
				Разместить объявление
			</button>
			<button
				class="px-4 py-2 text-sm font-semibold text-emerald-600 border border-emerald-600 rounded-full hover:bg-emerald-50 transition-colors"
			>
				Вход и регистрация
			</button>
		</div>
	</div>

	<!-- Основная навигация -->
	<div class="max-w-[1280px] mx-auto px-8 flex items-center gap-4 py-4">
		<!-- Лого -->
		<div class="flex items-center gap-1">
			<Home size={24} class="text-slate-600" />
			<span class="text-base font-bold text-slate-600">Мебель Урала</span>
		</div>

		<!-- Поиск -->
		<div class="flex-1 flex items-center gap-4">
			<button
				class="px-4 py-3 bg-emerald-600 text-white font-semibold text-sm rounded-3xl flex items-center gap-2 hover:bg-emerald-700 transition-colors"
			>
				<Menu size={24} />
				Каталог
			</button>
			<div class="flex-1 relative flex items-center gap-2">
				<input
					type="text"
					placeholder="Поиск по сайту"
					class="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
				/>
				<button
					class="p-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors"
					aria-label="Поиск"
				>
					<Search size={24} />
				</button>
			</div>
		</div>

		<!-- Действия -->
		<div class="flex items-center gap-6">
			<button class="flex flex-col items-center gap-1 text-gray-700 hover:text-emerald-600 transition-colors">
				<Heart size={24} />
				<span class="text-xs font-medium">Избранное</span>
			</button>
			<button class="flex flex-col items-center gap-1 text-gray-700 hover:text-emerald-600 transition-colors">
				<ShoppingCart size={24} />
				<span class="text-xs font-medium">Корзина</span>
			</button>
		</div>
	</div>

	<!-- Разделитель -->
	<div class="max-w-[1280px] mx-auto px-8">
		<div class="border-t border-slate-200"></div>
	</div>

	<!-- Категории -->
	<div class="max-w-[1280px] mx-auto px-8 flex items-center gap-8 py-3">
		<button
			class="px-4 py-2 bg-gray-100 text-gray-800 font-semibold text-sm rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2"
		>
			<Tag size={16} />
			Распродажа
		</button>
		<button
			class="px-4 py-2 bg-gray-100 text-gray-800 font-semibold text-sm rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2"
		>
			<Sparkles size={16} />
			Новинки
		</button>
		<button
			class="px-4 py-2 bg-gray-100 text-gray-800 font-semibold text-sm rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2"
		>
			<Clock size={16} />
			Услуги
		</button>
		<button
			class="px-4 py-2 bg-gray-100 text-gray-800 font-semibold text-sm rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2"
		>
			<Lightbulb size={16} />
			Освещение
		</button>
		<button
			class="px-4 py-2 bg-gray-100 text-gray-800 font-semibold text-sm rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2"
		>
			<Sofa size={16} />
			Диваны
		</button>
	</div>
</header>
