<script setup>
const onSubmit =({password_confirm,...data})=> {
	console.log('==> data',data)
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

</FormKit>
  </template>
