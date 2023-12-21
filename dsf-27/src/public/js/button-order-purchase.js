
export const btnOrderPurchase = async (cid) => {

	const response = await fetch(`/api/carts/${cid}/purchase`);
	const order = await response.json();

	console.log("==> order", order);

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
		html: `Su pedido <strong>${order.orderPurchase.paymentStatusCompleted ? order.orderPurchase.paymentStatusCompleted._id : ""}</strong> se ha realizado con exito productos <strong>${purchase.quantity}</strong> total: <strong>${purchase.totalPrice}</strong>`,
		icon: "success",
		allowOutsideClick: false,
		confirmButtonText: "Cool"
	}).then((result) => {
		if (result.isConfirmed) {

			window.location.href = "/api/vista/carts/657a0feb147d0f9fdd2f304d/purchase";
		}
	});

	return purchase;

};

