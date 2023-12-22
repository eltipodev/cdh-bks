
export const btnOrderPurchase = async (cid) => {

	const response = await fetch(`/api/carts/${cid}/purchase`);

	const order = await response.json();
	console.log("==> ", order);

	const isProductAvaibleCart = `Su pedido <strong>${order.orderPurchase.paymentStatusCompleted ? order.orderPurchase.paymentStatusCompleted._id : ""}</strong> se ha realizado con exito productos <strong></strong> total: <strong>${order.orderPurchase.totalAmount}</strong>`;

	const isProductUnavaibleCart = "No hay  <strong>productos para efectuar su compra</strong> se ha realizado con exito productos ";

	// eslint-disable-next-line no-undef
	Swal.fire({
		title: "Order",
		html: order.status ? isProductAvaibleCart : isProductUnavaibleCart,
		icon: order.status ? "success" : "warning",
		allowOutsideClick: false,
		confirmButtonText: "Ok"
	}).then((result) => {
		if (result.isConfirmed) {

			window.location.href = `/api/vista/carts/${cid}/purchase`;
		}
	});

	return order;

};

