type FavoriteItem = {
	id: string;
	name: string;
	price: number;
	image: string;
};

function createFavorites() {
	let items = $state<FavoriteItem[]>([]);
	const totalItems = $derived(items.length);

	function toggle(product: FavoriteItem) {
		const index = items.findIndex((i) => i.id === product.id);
		if (index >= 0) {
			items.splice(index, 1);
		} else {
			items.push(product);
		}
	}

	function has(id: string) {
		return items.some((i) => i.id === id);
	}

	function remove(id: string) {
		items = items.filter((i) => i.id !== id);
	}

	return {
		get items() {
			return items;
		},
		get totalItems() {
			return totalItems;
		},
		toggle,
		has,
		remove
	};
}

export const favorites = createFavorites();
