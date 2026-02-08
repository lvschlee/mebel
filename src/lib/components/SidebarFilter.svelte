<script lang="ts">
	import { ChevronDown, Star } from 'lucide-svelte';
</script>

<aside class="w-[260px] shrink-0 flex flex-col">
	<!-- 1. Категория -->
	<div class="py-4">
		<h3 class="text-sm font-semibold text-gray-800 mb-2.5">Категория</h3>
		<ul class="flex flex-col gap-2">
			<li>
				<label class="flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-emerald-600 transition-colors">
					<input type="checkbox" class="w-[18px] h-[18px] border border-gray-300 rounded checked:bg-emerald-600 checked:border-emerald-600 disabled:opacity-50 disabled:pointer-events-none" />
					<span>Диваны и кресла</span>
				</label>
			</li>
			<li>
				<label class="flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-emerald-600 transition-colors">
					<input type="checkbox" class="w-[18px] h-[18px] border border-gray-300 rounded checked:bg-emerald-600 checked:border-emerald-600 disabled:opacity-50 disabled:pointer-events-none" />
					<span>Столы и стулья</span>
				</label>
			</li>
			<li>
				<label class="flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-emerald-600 transition-colors">
					<input type="checkbox" class="w-[18px] h-[18px] border border-gray-300 rounded checked:bg-emerald-600 checked:border-emerald-600 disabled:opacity-50 disabled:pointer-events-none" />
					<span>Кровати и матрасы</span>
				</label>
			</li>
			<li>
				<label class="flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-emerald-600 transition-colors">
					<input type="checkbox" class="w-[18px] h-[18px] border border-gray-300 rounded checked:bg-emerald-600 checked:border-emerald-600 disabled:opacity-50 disabled:pointer-events-none" />
					<span>Шкафы и комоды</span>
				</label>
			</li>
			<li>
				<label class="flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-emerald-600 transition-colors">
					<input type="checkbox" class="w-[18px] h-[18px] border border-gray-300 rounded checked:bg-emerald-600 checked:border-emerald-600 disabled:opacity-50 disabled:pointer-events-none" />
					<span>Кухонные гарнитуры</span>
				</label>
			</li>
			<li>
				<label class="flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-emerald-600 transition-colors">
					<input type="checkbox" class="w-[18px] h-[18px] border border-gray-300 rounded checked:bg-emerald-600 checked:border-emerald-600 disabled:opacity-50 disabled:pointer-events-none" />
					<span>Прихожие</span>
				</label>
			</li>
		</ul>
		<button
			class="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors mt-2.5"
		>
			Показать ещё
			<ChevronDown size={16} />
		</button>
	</div>

	<hr class="border-t border-slate-200" />

	<!-- 2. Распродажа -->
	<div class="py-4">
		<label class="flex items-center justify-between cursor-pointer">
			<span class="text-sm text-gray-800">Распродажа</span>
			<div class="relative">
				<input type="checkbox" class="sr-only peer" />
				<div
					class="w-11 h-6 bg-slate-200 rounded-full peer-checked:bg-emerald-600 transition-colors duration-200"
				></div>
				<div
					class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm peer-checked:translate-x-5 transition-transform duration-200"
				></div>
			</div>
		</label>
	</div>

	<hr class="border-t border-slate-200" />

	<!-- 3. Цена -->
	<div class="py-4">
		<h3 class="text-sm font-semibold text-gray-800 mb-2.5">Цена</h3>
		<div class="flex items-center gap-2">
			<input
				type="number"
				placeholder="от 0"
				class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm placeholder:text-gray-500"
			/>
			<span class="text-gray-500">—</span>
			<input
				type="number"
				placeholder="до 100 000"
				class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm placeholder:text-gray-500"
			/>
		</div>
	</div>

	<hr class="border-t border-slate-200" />

	<!-- 4. Рейтинг -->
	<div class="py-4">
		<h3 class="text-sm font-semibold text-gray-800 mb-2.5">Рейтинг</h3>
		<div class="flex flex-col gap-2">
			<label class="flex items-center gap-2 cursor-pointer">
				<input type="checkbox" class="w-[18px] h-[18px] border border-gray-300 rounded checked:bg-emerald-600 checked:border-emerald-600 disabled:opacity-50 disabled:pointer-events-none" />
				<button class="flex items-center gap-1 text-sm text-gray-700 hover:text-emerald-600">
					<Star size={16} class="fill-gray-800 text-gray-800" />
					<Star size={16} class="fill-gray-800 text-gray-800" />
					<Star size={16} class="fill-gray-800 text-gray-800" />
					<Star size={16} class="fill-gray-800 text-gray-800" />
					<Star size={16} class="fill-gray-800 text-gray-800" />
				</button>
			</label>
			<label class="flex items-center gap-2 cursor-pointer">
				<input type="checkbox" class="w-[18px] h-[18px] border border-gray-300 rounded checked:bg-emerald-600 checked:border-emerald-600 disabled:opacity-50 disabled:pointer-events-none" />
				<button class="flex items-center gap-1 text-sm text-gray-700 hover:text-emerald-600">
					<Star size={16} class="fill-gray-800 text-gray-800" />
					<Star size={16} class="fill-gray-800 text-gray-800" />
					<Star size={16} class="fill-gray-800 text-gray-800" />
					<Star size={16} class="fill-gray-800 text-gray-800" />
					<Star size={16} class="text-gray-300" />
					<span>и выше</span>
				</button>
			</label>
			<label class="flex items-center gap-2 cursor-pointer">
				<input type="checkbox" class="w-[18px] h-[18px] border border-gray-300 rounded checked:bg-emerald-600 checked:border-emerald-600 disabled:opacity-50 disabled:pointer-events-none" />
				<button class="flex items-center gap-1 text-sm text-gray-700 hover:text-emerald-600">
					<Star size={16} class="fill-gray-800 text-gray-800" />
					<Star size={16} class="fill-gray-800 text-gray-800" />
					<Star size={16} class="fill-gray-800 text-gray-800" />
					<Star size={16} class="text-gray-300" />
					<Star size={16} class="text-gray-300" />
					<span>и выше</span>
				</button>
			</label>
			<label class="flex items-center gap-2 cursor-pointer">
				<input type="checkbox" class="w-[18px] h-[18px] border border-gray-300 rounded checked:bg-emerald-600 checked:border-emerald-600 disabled:opacity-50 disabled:pointer-events-none" />
				<button class="flex items-center gap-1 text-sm text-gray-700 hover:text-emerald-600">
					<Star size={16} class="fill-gray-800 text-gray-800" />
					<Star size={16} class="fill-gray-800 text-gray-800" />
					<Star size={16} class="text-gray-300" />
					<Star size={16} class="text-gray-300" />
					<Star size={16} class="text-gray-300" />
					<span>и выше</span>
				</button>
			</label>
			<label class="flex items-center gap-2 cursor-pointer">
				<input type="checkbox" class="w-[18px] h-[18px] border border-gray-300 rounded checked:bg-emerald-600 checked:border-emerald-600 disabled:opacity-50 disabled:pointer-events-none" />
				<button class="flex items-center gap-1 text-sm text-gray-700 hover:text-emerald-600">
					<Star size={16} class="fill-gray-800 text-gray-800" />
					<Star size={16} class="text-gray-300" />
					<Star size={16} class="text-gray-300" />
					<Star size={16} class="text-gray-300" />
					<Star size={16} class="text-gray-300" />
					<span>и выше</span>
				</button>
			</label>
		</div>
	</div>

	<hr class="border-t border-slate-200" />

	<!-- 5. Бренд -->
	<div class="py-4">
		<h3 class="text-sm font-semibold text-gray-800 mb-2.5">Бренд</h3>
		<div class="flex flex-col gap-2">
			<label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
				<input type="checkbox" class="w-[18px] h-[18px] border border-gray-300 rounded checked:bg-emerald-600 checked:border-emerald-600 disabled:opacity-50 disabled:pointer-events-none" />
				Askona
			</label>
			<label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
				<input type="checkbox" class="w-[18px] h-[18px] border border-gray-300 rounded checked:bg-emerald-600 checked:border-emerald-600 disabled:opacity-50 disabled:pointer-events-none" />
				Hoff
			</label>
			<label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
				<input type="checkbox" class="w-[18px] h-[18px] border border-gray-300 rounded checked:bg-emerald-600 checked:border-emerald-600 disabled:opacity-50 disabled:pointer-events-none" />
				Лазурит
			</label>
			<label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
				<input type="checkbox" class="w-[18px] h-[18px] border border-gray-300 rounded checked:bg-emerald-600 checked:border-emerald-600 disabled:opacity-50 disabled:pointer-events-none" />
				Шатура
			</label>
			<label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
				<input type="checkbox" class="w-[18px] h-[18px] border border-gray-300 rounded checked:bg-emerald-600 checked:border-emerald-600 disabled:opacity-50 disabled:pointer-events-none" />
				Орматек
			</label>
		</div>
	</div>

	<hr class="border-t border-slate-200" />

	<!-- 6. Цвет -->
	<div class="py-4">
		<h3 class="text-sm font-semibold text-gray-800 mb-2.5">Цвет</h3>
		<div class="flex flex-wrap gap-2">
			<button
				class="w-7 h-7 rounded-full border-2 border-slate-300 hover:border-emerald-600 cursor-pointer bg-white"
				aria-label="Белый"
			></button>
			<button
				class="w-7 h-7 rounded-full border-2 border-slate-200 hover:border-emerald-600 cursor-pointer"
				style="background-color: #1F2937"
				aria-label="Чёрный"
			></button>
			<button
				class="w-7 h-7 rounded-full border-2 border-slate-200 hover:border-emerald-600 cursor-pointer"
				style="background-color: #9CA3AF"
				aria-label="Серый"
			></button>
			<button
				class="w-7 h-7 rounded-full border-2 border-slate-200 hover:border-emerald-600 cursor-pointer"
				style="background-color: #D2B48C"
				aria-label="Бежевый"
			></button>
			<button
				class="w-7 h-7 rounded-full border-2 border-slate-200 hover:border-emerald-600 cursor-pointer"
				style="background-color: #8B4513"
				aria-label="Коричневый"
			></button>
			<button
				class="w-7 h-7 rounded-full border-2 border-slate-200 hover:border-emerald-600 cursor-pointer"
				style="background-color: #059669"
				aria-label="Зелёный"
			></button>
			<button
				class="w-7 h-7 rounded-full border-2 border-slate-200 hover:border-emerald-600 cursor-pointer"
				style="background-color: #3B82F6"
				aria-label="Синий"
			></button>
			<button
				class="w-7 h-7 rounded-full border-2 border-slate-200 hover:border-emerald-600 cursor-pointer"
				style="background-color: #EF4444"
				aria-label="Красный"
			></button>
		</div>
	</div>

	<hr class="border-t border-slate-200" />

	<!-- 7. Кнопки -->
	<div class="py-4 flex items-center gap-3">
		<button
			class="flex-1 border border-slate-200 text-gray-700 rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
		>
			Очистить
		</button>
		<button
			class="flex-1 bg-emerald-600 text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-emerald-700 transition-colors"
		>
			Показать
		</button>
	</div>
</aside>
