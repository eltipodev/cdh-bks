
export const buttonAddProduct = (cid, pid) => {
	const cartCount = document.querySelector(".cart-count");

	if (cid) {
		fetch(`/api/carts/${cid}/products/${pid}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
		})
			.then(response => response.json())
			.then(data => {

				cartCount.textContent = data.cartTotalQuantity.quantity;

				// eslint-disable-next-line no-undef
				Swal.fire({
					title: data.pageTitle,
					text: data.message,
					icon: "success",
					allowOutsideClick: false,
					confirmButtonText: "Cool"
				});

			})
			.catch(error => {
				console.error("Error al obtener datos:", error);
			});
	}

};

