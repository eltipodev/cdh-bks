
export const getAllProducts = async (limit, page, sort, stock, catg) => {

	try {
		const response = await fetch(`/api/products?limit=${limit}&page=${page}&sort=${sort}&stock=${stock}&category=${catg}`);

		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Error al obtener datos:", error);
	}
};

