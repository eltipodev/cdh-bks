<script setup>

import authApi from '@/api/authApi';

const onSubmit = async({password_confirm,...data})=> {
	try {
		await authApi.register(data)
	} catch (error) {
console.log('==> error',error)
	}
}
</script>


<template>

<FormKit
type="form"
:action="false"
@submit="onSubmit"

>


<FormKit
type="text"
name="firstName"
id="firstName"
label="FirstName"

validation="required||length:3"
placeholder="Jon"
/>

<FormKit
type="text"
name="lasttName"
id="lasttName"
label="LasttName"

validation="required||length:3"
placeholder="“ Doe”"
/>

<FormKit
type="number"
name="age"
id="age"
label="Age"
validation="required|length:2|min:18"
placeholder="“22”"
/>


<FormKit
type="text"
name="userName"
id="userName"
label="UsertName"

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
	type="email"
	name="email"
	id="email"
	label="Email"

	validation="required||length:4"
	placeholder="“JonDoe@gmail.com”"
	/>
</FormKit>
  </template>

<style>


</style>

