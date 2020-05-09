<template>
    <component v-if="iconModules" :is="iconModules[iconName]" />
</template>

<script>
export default {
    props: {
        name: String,
        solid: Boolean,
        outline: Boolean
    },
    data() {
        return {
            iconModules: null
        }
    },
    computed: {
        iconName() {
            return _.capitalize(_.camelCase(this.name)) + 'Icon'
        }
    },
    mounted() {
        if (this.solid) this.iconModules = require('@vue-hero-icons/solid/lib/index.es.js');
        if (this.outline) this.iconModules = require('@vue-hero-icons/outline/lib/index.es.js');

    }
}
</script>

<style>

</style>