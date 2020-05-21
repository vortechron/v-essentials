<template lang="pug">
<div>
	<img class="m-auto object-cover w-1/2" :src="value" alt="">
	<input type="hidden" :name="schema.inputName" v-model="value" v-if="schema.inputName">
</div>
</template>

<script>
import { abstractField } from "vue-form-generator";

export default {
	mixins: [abstractField],
};
</script>

<style lang="scss">
</style>
