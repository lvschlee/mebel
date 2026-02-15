type CartItem = {
	id: string;
	name: string;
	price: number;
	image: string;
	quantity: number;
};

function createCart() {
	let items = $state<CartItem[]>([]);
	const totalItems = $derived(items.reduce((sum, item) => sum + item.quantity, 0));

	function addItem(product: Omit<CartItem, 'quantity'>, quantity = 1) {
		const existing = items.find((i) => i.id === product.id);
		if (existing) {
			existing.quantity += quantity;
		} else {
			items.push({ ...product, quantity });
		}
	}

	function removeItem(id: string) {
		items = items.filter((i) => i.id !== id);
	}

	function clear() {
		items = [];
	}

	return {
		get items() {
			return items;
		},
		get totalItems() {
			return totalItems;
		},
		addItem,
		removeItem,
		clear
	};
}

export const cart = createCart();
