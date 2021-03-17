<template>
    <hero-icon v-if="isHeroicon" outline :name="name"></hero-icon>
    <md-icon v-else :name="name"></md-icon>
</template>

<script>
import heroIcon from './heroIcon'
import mdIcon from './mdIcon'

export default {
    components: {heroIcon, mdIcon},
    props: {
        isHeroicon: Boolean,
        name: String
    }
}
</script>

<style>

</style>