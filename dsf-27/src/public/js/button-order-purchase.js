
export const btnOrderPurchase = async (cid) => {

	const response = await fetch(`/api/carts/${cid}/purchase`);
	const order = await response.json();

	const orderAvailable = order.payload.products.filter(e => e.stockAvailable === true);

	const purchase = orderAvailable.reduce((totals, product) => {
		if (product.product && product.quantity && product.product.price) {
			totals.quantity += product.quantity;
			totals.totalPrice += product.quantity * product.product.price;
		}

		return totals;

	}, { quantity: 0, totalPrice: 0 });

	purchase.totalPrice = Number(purchase.totalPrice.toFixed(2));

	// eslint-disable-next-line no-undef
	Swal.fire({
		title: "Order",
		text: `Su pedido se ha realizado con exito productos ${purchase.quantity} total: ${purchase.totalPrice}`,
		icon: "success",
		confirmButtonText: "Cool"
	});

	return purchase;

};

