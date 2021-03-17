<template>
    <btn :color="schema.options.color || 'gray'" theme="secondary" @click="callToAction">{{ schema.label }}</btn>
</template>

<script>
import { abstractField } from "vue-form-generator";
import btn from './../components/btn';

export default {
    components: {btn},
    mixins: [abstractField],
    inject: ['fieldButtonState'],
    methods: {
        callToAction() {
            this.schema.options.action.call(this)
        }
    }
};
</script>

<style>

</style>