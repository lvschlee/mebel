const cities = [
	'Екатеринбург',
	'Челябинск',
	'Тюмень',
	'Пермь',
	'Уфа',
	'Магнитогорск',
	'Нижний Тагил',
	'Курган',
	'Оренбург'
];

function createCityStore() {
	let selected = $state('Челябинск');

	return {
		get selected() {
			return selected;
		},
		set selected(value: string) {
			selected = value;
		},
		cities
	};
}

export const cityStore = createCityStore();
