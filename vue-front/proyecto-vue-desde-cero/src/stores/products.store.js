import servicesApi from "@/api/servicesApi";
import { defineStore } from "pinia";
import { ref, onMounted } from 'vue'

export const usesProductsStore = defineStore('products', () => {
	onMounted(async () => {
		try {
			const { data } = await servicesApi.all()
			console.log('==> data', data)
		} catch (error) {

		}
	})
	return {
	}
})