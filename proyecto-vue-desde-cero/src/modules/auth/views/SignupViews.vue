<!-- eslint-disable no-unused-vars -->
<script setup>

import authApi from "@/api/authApi";

const onSubmit = async({password_confirm,...data})=> {

	try {
		await authApi.register(data);
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
			id="firstName"
			type="text"
			name="firstName"
			label="FirstName"

			validation="required||length:3"
			placeholder="Jon"
		/>

		<FormKit
			id="lastName"
			type="text"
			name="lastName"
			label="lastName"

			validation="required||length:3"
			placeholder="“ Doe”"
		/>

		<FormKit
			id="age"
			type="number"
			name="age"
			label="Age"
			validation="required|length:2|min:18"
			placeholder="“22”"
		/>

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
			validation="required|?length:10"
		/>

		<FormKit
			type="password"
			label="Confirm password"
			name="password_confirm"
			validation="required|confirm"
		/>

		<FormKit
			id="email"
			type="email"
			name="email"
			label="Email"

			validation="required||length:4"
			placeholder="“JonDoe@gmail.com”"
		/>
	</FormKit>
</template>

<style>

</style>

