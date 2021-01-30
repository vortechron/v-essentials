<template>
    <heroicon v-if="isHeroicon" outline :name="name"></heroicon>
    <md-icon v-else :name="name"></md-icon>
</template>

<script>
import heroicon from './heroicon'
import mdIcon from './mdIcon'

export default {
    components: {heroicon, mdIcon},
    props: {
        isHeroicon: Boolean,
        name: String
    }
}
</script>

<style>

</style>