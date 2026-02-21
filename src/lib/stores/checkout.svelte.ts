type CheckoutData = {
	name: string;
	phone: string;
	email: string;
	street: string;
	city: string;
	region: string;
	postalCode: string;
	comment: string;
	deliveryMethod: 'courier' | 'post' | 'pickup';
	paymentMethod: 'card' | 'cash' | 'transfer';
};

function createCheckout() {
	let data = $state<CheckoutData>({
		name: '',
		phone: '',
		email: '',
		street: '',
		city: '',
		region: '',
		postalCode: '',
		comment: '',
		deliveryMethod: 'courier',
		paymentMethod: 'card'
	});

	return {
		get name() { return data.name; },
		set name(v) { data.name = v; },
		get phone() { return data.phone; },
		set phone(v) { data.phone = v; },
		get email() { return data.email; },
		set email(v) { data.email = v; },
		get street() { return data.street; },
		set street(v) { data.street = v; },
		get city() { return data.city; },
		set city(v) { data.city = v; },
		get region() { return data.region; },
		set region(v) { data.region = v; },
		get postalCode() { return data.postalCode; },
		set postalCode(v) { data.postalCode = v; },
		get comment() { return data.comment; },
		set comment(v) { data.comment = v; },
		get deliveryMethod() { return data.deliveryMethod; },
		set deliveryMethod(v) { data.deliveryMethod = v; },
		get paymentMethod() { return data.paymentMethod; },
		set paymentMethod(v) { data.paymentMethod = v; }
	};
}

export const checkout = createCheckout();
