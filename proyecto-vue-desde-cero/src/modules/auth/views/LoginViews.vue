<script setup>
import authApi from "@/api/authApi";

// eslint-disable-next-line no-unused-vars
const onSubmit = async(data)=> {

	try {
		await authApi.login(data);

	} catch (error) {
		console.log("==> error",error);
	}
};

</script>

<template>
	<FormKit
		type="form"
		:action="false"
		@submit="onSubmit"
	>
		<FormKit
			id="user"
			type="text"
			name="user"
			label="User"
			validation="required||length:3"
			placeholder="“Batman”"
		/>

		<FormKit
			type="password"
			name="password"
			label="Password"
			validation="required"
		/>
	</FormKit>
</template>
