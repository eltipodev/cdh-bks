<template>
	<form
		class="form-user-signup--ctn"
		method="post"
		action="/signup"
		
	>
		<h1 class="page-title form-user-title">
			{{ pageTitle }}
		</h1>

		<label
			class="form-user-label"
			for="firstName"
		>Nombre:
		</label>

		<input
			id="firstNeam"
			v-model="userForm.firstName"
			type="text"
			name="firstName"
		>

		<label
			class="form-user-label"
			for="lastName"
		>Apellido:
		</label>

		<input
			id="lastName"
			v-model="userForm.lastName"
			type="text"
			name="lastName"
		>

		<label
			class="form-user-label"
			for="nameUser"
		>Usuario:
		</label>

		<input
			id="nameUser"
			v-model="userForm.user"
			type="text"
			name="user"
		>
		<label
			class="form-user-label"
			for="password"
		>🔑 Password: </label>

		<input
			id="password"
			v-model="userForm.password"
			type="password"
			name="password"
		>

		<label
			class="form-user-label"
			for="age"
		>Edad:
		</label>

		<input
			id="age"
			v-model="userForm.age"
			type="text"
			name="age"
		>

		<label
			class="form-user-label"
			for="email"
		>email:
		</label>

		<input
			id="email"
			v-model="userForm.email"
			type="text"
			name="email"
		>
		<button
			class="form-user-button"
			type="submit"
			value="Submit"
		>
			dddd
		</button>
	</form>

	<RouterLink
		class="form-user-signup-link"
		:to="{name:'login'}"
	>
		🙍‍♂️ Login
	</RouterLink>

	<!-- <input
		class="form-user-button"
		type="submit"
		value="Submit"
	> -->
</template>

<script setup>

import { ref } from "vue";

const userForm = ref({
	firstName:"",
	lastName:"",
	user:"",
	password:"",
	age:"",
	email:""
});

const onSubmit = async() => {
	console.log("==> userForm",userForm.value);
};

const pageTitle = "title";
</script>
