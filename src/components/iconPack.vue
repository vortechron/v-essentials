<template>
    <heroicon
    v-if="isHeroicon"
    outline
    :name="name"
    ></heroicon>
    <md-icon v-else :name="name"></md-icon>
</template>

<script>
export default {
    props: {
        isHeroicon: Boolean,
        name: String
    }
}
</script>

<style>

</style>