<template>
	<form
		class="form-user-signup--ctn"
		method="post"
		action="/login"
	>
		<h1 class="page-title form-user-title">
			{{ pageTitle }}
		</h1>

		<label
			class="form-user-label"
			for="user"
		>🙍‍♂️ Usuario: </label>

		<input
			id="user"
			type="text"
			name="user"
		>

		<label
			class="form-user-label"
			for="password"
		>🔑 Password: </label>

		<input
			id="password"
			type="password"
			name="password"
		>

		<input
			class="form-user-button"
			type="submit"
			value="Submit"
		>
	</form>

	<RouterLink
		class="form-user-signup-link"
		:to="{name:'signup'}"
	>
		✍ Signup
	</RouterLink>

	<button
		class="form-user-button--github"
		onclick="location.href='/auth/github'"
	>
		GitHub
	</button>

	<button
		class="form-user-button--google"
		onclick="location.href='/auth/google'"
	>
		Google
	</button>
</template>

<script setup>
const pageTitle = "title";

</script>

