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
            let name = _.camelCase(this.name) + 'Icon'

            return name.charAt(0).toUpperCase() + name.slice(1)
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