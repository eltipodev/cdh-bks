export const fetchPruebas = async () => {

	try {

		const response = await fetch("/api/carts/657a0feb147d0f9fdd2f304d", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			// body: JSON.stringify({ "quantity": 2 })
		});

		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Error al obtener datos:", error);
	}
};