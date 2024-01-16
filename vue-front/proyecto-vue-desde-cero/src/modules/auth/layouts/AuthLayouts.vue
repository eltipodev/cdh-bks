
<script setup>

</script>
<template>
<section class="section-auth">
	<h1>auth</h1>
	<RouterView />
</section>
</template>

<style  >


[data-invalid] .formkit-inner {
  border-color: red;
  box-shadow: 0 0 0 1px red;
}

[data-complete] .formkit-inner {
  border-color: red;
  box-shadow: 0 0 0 1px green;
}
[data-complete] .formkit-inner::after {
  content: '✅';
  display: block;
  padding: 0.5em;
}

.formkit-form{
	/* background: linear-gradient(45deg, rgb(41 18 160),hsl(262deg 75% 40%),hsl(301deg 47% 49%),rgb(93 0 255),rgb(162 122 231)); */
	min-width:400px;
	padding:2em;

}

.formkit-label{

	color: rgb(255 255 255);
	font-weight: 600;


}

.formkit-input{

	width:100%;

}

.w-full{
	border-radius: 10px;
padding: 5px;
margin:3px 0 15px;
width: 100%;
}

button[type="submit"]	 {
	color:rgb(235, 228, 228);
	font-weight:600;
	background-color:rgb(35, 29, 199);
	width:100%;
	margin:15px 0 15px 0;
}

.formkit-messages{
	background:rgb(124, 27, 27);
	font-weight:500
}
.formkit-message{
	color:rgb(232, 232, 232);
	width:100%
}
.section-auth{
	display:flex;
	justify-content:center;
	align-items:center;

	flex-direction:column;

	height:100%
}
</style>