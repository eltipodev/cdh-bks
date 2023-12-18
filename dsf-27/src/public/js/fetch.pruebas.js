export const fetchPruebas = async () => {

	try {

		const response = await fetch("/api/carts/657a0feb147d0f9fdd2f304d/products/6556a4c8488c5c5ef331c69d", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ "quantity": 2 })
		});

		const data = await response.json();
		console.log("==> data", data);
		return data;
	} catch (error) {
		console.error("Error al obtener datos:", error);
	}
};